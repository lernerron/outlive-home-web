const requiredFields = ['name', 'zipCode', 'phone', 'email'];

const json = (res, status, payload, origin = '*') => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Webhook-Secret');
  res.end(JSON.stringify(payload));
};

const validateLead = (lead) => {
  if (!lead || typeof lead !== 'object') {
    return 'Request body must be a JSON object.';
  }
  for (const field of requiredFields) {
    if (!lead[field] || typeof lead[field] !== 'string' || !lead[field].trim()) {
      return `Missing required field: ${field}`;
    }
  }
  return null;
};

const buildWebhookHeaders = (webhookSecret) => {
  const authHeaderName = process.env.LEADS_WEBHOOK_AUTH_HEADER || 'Authorization';
  const authToken = process.env.LEADS_WEBHOOK_AUTH_TOKEN || '';
  const hasAuthToken = Boolean(authToken.trim());

  return {
    'Content-Type': 'application/json',
    ...(webhookSecret ? { 'X-Webhook-Secret': webhookSecret } : {}),
    ...(hasAuthToken ? { [authHeaderName]: authToken } : {})
  };
};

const transformWebhookPayload = (leadPayload) => {
  const mode = (process.env.LEADS_WEBHOOK_PAYLOAD_MODE || 'raw').toLowerCase();
  if (mode === 'event') {
    return {
      event: 'lead.created',
      data: leadPayload
    };
  }
  return leadPayload;
};

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || '';
};

const verifyTurnstile = async (token, remoteip) => {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return { ok: true };
  }

  const body = new URLSearchParams({
    secret,
    response: token || ''
  });

  if (remoteip) {
    body.set('remoteip', remoteip);
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    });

    if (!response.ok) {
      return { ok: false, details: `turnstile_http_${response.status}` };
    }

    const data = await response.json();
    if (!data?.success) {
      const errorCodes = Array.isArray(data['error-codes']) ? data['error-codes'].join(',') : 'turnstile_failed';
      return { ok: false, details: errorCodes };
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, details: error?.message || 'turnstile_network_error' };
  }
};

const persistLeadLocally = async (leadPayload) => {
  const shouldStore = (process.env.LEADS_STORE_LOCAL || '').toLowerCase() === 'true';
  if (!shouldStore) return;

  const { default: path } = await import('path');
  const fs = await import('fs/promises');
  const filePath = process.env.LEADS_LOCAL_PATH || './data/leads.json';

  const resolvedPath = path.resolve(process.cwd(), filePath);
  const dir = path.dirname(resolvedPath);
  await fs.mkdir(dir, { recursive: true });

  let existing = [];
  try {
    const contents = await fs.readFile(resolvedPath, 'utf8');
    existing = JSON.parse(contents);
    if (!Array.isArray(existing)) {
      existing = [];
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      console.error('Failed reading local leads file:', error);
    }
    existing = [];
  }

  existing.push(leadPayload);
  await fs.writeFile(resolvedPath, JSON.stringify(existing, null, 2));
};

export default async function handler(req, res) {
  const corsOrigin = process.env.LEADS_CORS_ORIGIN || '*';

  if (req.method === 'OPTIONS') {
    return json(res, 204, {}, corsOrigin);
  }

  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' }, corsOrigin);
  }

  const validationError = validateLead(req.body);
  if (validationError) {
    return json(res, 400, { error: validationError }, corsOrigin);
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (turnstileSecret) {
    const turnstileToken = req.body?.turnstileToken;
    if (!turnstileToken || typeof turnstileToken !== 'string') {
      return json(res, 400, { error: 'Missing Turnstile token' }, corsOrigin);
    }

    const verification = await verifyTurnstile(turnstileToken, getClientIp(req));
    if (!verification.ok) {
      return json(res, 400, { error: 'Turnstile verification failed', details: verification.details }, corsOrigin);
    }
  }

  const { turnstileToken: _turnstileToken, ...leadData } = req.body || {};
  const leadPayload = {
    ...leadData,
    receivedAt: new Date().toISOString()
  };

  try {
    await persistLeadLocally(leadPayload);
  } catch (error) {
    console.error('Failed to persist lead locally:', error);
  }

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  const webhookSecret = process.env.LEADS_WEBHOOK_SECRET;

  if (webhookUrl) {
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: buildWebhookHeaders(webhookSecret),
        body: JSON.stringify(transformWebhookPayload(leadPayload))
      });

      if (!webhookResponse.ok) {
        const details = await webhookResponse.text();
        return json(res, 502, {
          error: 'Upstream lead destination failed',
          details: details || webhookResponse.statusText
        }, corsOrigin);
      }
    } catch (error) {
      return json(res, 502, {
        error: 'Unable to reach upstream lead destination',
        details: error?.message || 'Unknown network error'
      }, corsOrigin);
    }
  } else {
    // Temporary fallback behavior until a durable destination is configured.
    console.log('Lead received without LEADS_WEBHOOK_URL configured', leadPayload);
  }

  return json(res, 200, { ok: true }, corsOrigin);
}
