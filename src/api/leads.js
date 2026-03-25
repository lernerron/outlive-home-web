const LEADS_API_URL = process.env.NEXT_PUBLIC_LEADS_API_URL || '/api/leads';
export const LOCAL_QUEUE_KEY = 'pending_leads';

export const getPendingLeads = () => {
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_QUEUE_KEY) || '[]');
  } catch {
    return [];
  }
};

export const clearPendingLeads = () => {
  window.localStorage.removeItem(LOCAL_QUEUE_KEY);
};

const setPendingLeads = (leads) => {
  window.localStorage.setItem(LOCAL_QUEUE_KEY, JSON.stringify(leads));
};

export const queueLeadLocally = (payload) => {
  try {
    const current = getPendingLeads();
    const { turnstileToken: _turnstileToken, ...sanitizedPayload } = payload || {};
    current.push({
      ...sanitizedPayload,
      queuedAt: new Date().toISOString()
    });
    setPendingLeads(current);
  } catch (error) {
    console.error('Failed to queue lead locally:', error);
  }
};

const sendLeadToEndpoint = async (payload) => {
  return fetch(LEADS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
};

export const retryPendingLeads = async () => {
  const pending = getPendingLeads();
  if (!pending.length) return { sent: 0, remaining: 0 };

  const remaining = [];
  let sent = 0;

  for (const lead of pending) {
    try {
      const response = await sendLeadToEndpoint(lead);
      if (!response.ok) {
        remaining.push(lead);
        continue;
      }
      sent += 1;
    } catch {
      remaining.push(lead);
    }
  }

  if (remaining.length) {
    setPendingLeads(remaining);
  } else {
    clearPendingLeads();
  }

  return { sent, remaining: remaining.length };
};

export async function submitLead(payload) {
  // Auto-inject UTM attribution + page URL into every submission
  let enrichedPayload = { ...payload };
  try {
    const { getUtmData } = await import('@/lib/utm');
    const utmData = getUtmData();
    if (utmData.utm_source) enrichedPayload.utmSource = utmData.utm_source;
    if (utmData.utm_medium) enrichedPayload.utmMedium = utmData.utm_medium;
    if (utmData.utm_campaign) enrichedPayload.utmCampaign = utmData.utm_campaign;
    if (utmData.utm_content) enrichedPayload.utmContent = utmData.utm_content;
    if (utmData.utm_term) enrichedPayload.utmTerm = utmData.utm_term;
    if (utmData.landing_page) enrichedPayload.landingPage = utmData.landing_page;
    enrichedPayload.pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  } catch {
    // UTM capture is best-effort — never block lead submission
  }

  await retryPendingLeads();
  let response;
  try {
    response = await sendLeadToEndpoint(enrichedPayload);
  } catch (error) {
    // If the endpoint is unavailable (e.g. local dev without API), queue locally.
    queueLeadLocally(enrichedPayload);
    return {
      queued: true,
      reason: 'network_error',
      message: error?.message || 'Lead endpoint unavailable'
    };
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Lead submission failed (${response.status}): ${text || 'Unknown error'}`);
  }

  try {
    return await response.json();
  } catch {
    return { ok: true };
  }
}
