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

  const leadPayload = {
    ...req.body,
    receivedAt: new Date().toISOString()
  };

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  const webhookSecret = process.env.LEADS_WEBHOOK_SECRET;

  if (webhookUrl) {
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(webhookSecret ? { 'X-Webhook-Secret': webhookSecret } : {})
        },
        body: JSON.stringify(leadPayload)
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
