export const trackEvent = (name, props = {}) => {
  if (typeof window === 'undefined') return;

  // GTM dataLayer — picked up by all GTM tags (GA4, Google Ads, etc.)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...props });

  // Plausible (optional, if configured)
  if (typeof window.plausible === 'function') {
    window.plausible(name, { props });
  }
};
