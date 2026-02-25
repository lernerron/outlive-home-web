export const trackEvent = (name, props = {}) => {
  if (typeof window === 'undefined') return;

  if (typeof window.plausible === 'function') {
    window.plausible(name, { props });
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, props);
  }
};
