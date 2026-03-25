const STORAGE_KEY = 'outlive_utm_data';
const LANDING_KEY = 'outlive_landing_page';

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

/**
 * Capture UTM parameters from URL and persist in sessionStorage.
 * Call on every page load. Only overwrites if new UTM params are present.
 */
export function captureUtm() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const utmData = {};
  let hasUtm = false;

  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    if (value) {
      utmData[key] = value;
      hasUtm = true;
    }
  }

  if (hasUtm) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utmData));
  }

  // Store landing page on first visit only
  if (!sessionStorage.getItem(LANDING_KEY)) {
    sessionStorage.setItem(LANDING_KEY, window.location.href);
  }
}

/**
 * Get stored UTM data + landing page. Returns empty object if none captured.
 */
export function getUtmData() {
  if (typeof window === 'undefined') return {};

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    const utmData = stored ? JSON.parse(stored) : {};
    const landingPage = sessionStorage.getItem(LANDING_KEY) || '';
    return { ...utmData, landing_page: landingPage };
  } catch {
    return {};
  }
}
