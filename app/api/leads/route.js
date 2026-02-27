const requiredFields = ['name', 'zipCode', 'phone', 'email'];

function corsHeaders(origin = '*') {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Webhook-Secret',
  };
}

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
    ...(hasAuthToken ? { [authHeaderName]: authToken } : {}),
  };
};

const transformWebhookPayload = (leadPayload) => {
  const mode = (process.env.LEADS_WEBHOOK_PAYLOAD_MODE || 'raw').toLowerCase();
  if (mode === 'event') {
    return {
      event: 'lead.created',
      data: leadPayload,
    };
  }
  return leadPayload;
};

const verifyTurnstile = async (token, remoteip) => {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return { ok: true };
  }

  const body = new URLSearchParams({
    secret,
    response: token || '',
  });

  if (remoteip) {
    body.set('remoteip', remoteip);
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      }
    );

    if (!response.ok) {
      return { ok: false, details: `turnstile_http_${response.status}` };
    }

    const data = await response.json();
    if (!data?.success) {
      const errorCodes = Array.isArray(data['error-codes'])
        ? data['error-codes'].join(',')
        : 'turnstile_failed';
      return { ok: false, details: errorCodes };
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, details: error?.message || 'turnstile_network_error' };
  }
};

const persistLeadLocally = async (leadPayload) => {
  const shouldStore =
    (process.env.LEADS_STORE_LOCAL || '').toLowerCase() === 'true';
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

export async function OPTIONS() {
  const corsOrigin = process.env.LEADS_CORS_ORIGIN || '*';
  return new Response(null, {
    status: 204,
    headers: corsHeaders(corsOrigin),
  });
}

export async function POST(request) {
  const corsOrigin = process.env.LEADS_CORS_ORIGIN || '*';
  const headers = corsHeaders(corsOrigin);

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON body' }),
      { status: 400, headers }
    );
  }

  const validationError = validateLead(body);
  if (validationError) {
    return new Response(
      JSON.stringify({ error: validationError }),
      { status: 400, headers }
    );
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (turnstileSecret) {
    const turnstileToken = body?.turnstileToken;
    if (!turnstileToken || typeof turnstileToken !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Missing Turnstile token' }),
        { status: 400, headers }
      );
    }

    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
    const verification = await verifyTurnstile(turnstileToken, clientIp);
    if (!verification.ok) {
      return new Response(
        JSON.stringify({
          error: 'Turnstile verification failed',
          details: verification.details,
        }),
        { status: 400, headers }
      );
    }
  }

  const { turnstileToken: _turnstileToken, ...leadData } = body || {};
  const leadPayload = {
    ...leadData,
    receivedAt: new Date().toISOString(),
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
      const url = new URL(webhookUrl);
      if (webhookSecret) url.searchParams.set('secret', webhookSecret);
      const webhookResponse = await fetch(url.toString(), {
        method: 'POST',
        headers: buildWebhookHeaders(webhookSecret),
        body: JSON.stringify(transformWebhookPayload(leadPayload)),
      });

      if (!webhookResponse.ok) {
        const details = await webhookResponse.text();
        return new Response(
          JSON.stringify({
            error: 'Upstream lead destination failed',
            details: details || webhookResponse.statusText,
          }),
          { status: 502, headers }
        );
      }
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: 'Unable to reach upstream lead destination',
          details: error?.message || 'Unknown network error',
        }),
        { status: 502, headers }
      );
    }
  } else {
    console.log(
      'Lead received without LEADS_WEBHOOK_URL configured',
      leadPayload
    );
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
}
