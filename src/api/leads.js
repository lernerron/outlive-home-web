const LEADS_API_URL = import.meta.env.VITE_LEADS_API_URL || '/api/leads';
const LOCAL_QUEUE_KEY = 'pending_leads';

const queueLeadLocally = (payload) => {
  try {
    const current = JSON.parse(window.localStorage.getItem(LOCAL_QUEUE_KEY) || '[]');
    current.push({
      ...payload,
      queuedAt: new Date().toISOString()
    });
    window.localStorage.setItem(LOCAL_QUEUE_KEY, JSON.stringify(current));
  } catch (error) {
    console.error('Failed to queue lead locally:', error);
  }
};

export async function submitLead(payload) {
  let response;
  try {
    response = await fetch(LEADS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    // If the endpoint is unavailable (e.g. local dev without API), queue locally.
    queueLeadLocally(payload);
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
