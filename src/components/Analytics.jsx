import { useEffect } from 'react';

const loadScript = (src, attrs = {}) => {
  if (document.querySelector(`script[src="${src}"]`)) return null;
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  Object.entries(attrs).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });
  document.head.appendChild(script);
  return script;
};

const injectInlineScript = (content) => {
  const script = document.createElement('script');
  script.text = content;
  document.head.appendChild(script);
  return script;
};

export default function Analytics() {
  const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN?.trim();
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

  useEffect(() => {
    const scripts = [];

    if (plausibleDomain) {
      const plausibleScript = loadScript('https://plausible.io/js/script.js', {
        'data-domain': plausibleDomain
      });
      if (plausibleScript) scripts.push(plausibleScript);
    }

    if (gaMeasurementId) {
      const gaScript = loadScript(`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`);
      if (gaScript) scripts.push(gaScript);

      const inline = injectInlineScript(`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaMeasurementId}');
      `);
      scripts.push(inline);
    }

    return () => {
      scripts.forEach((script) => script?.parentNode?.removeChild(script));
    };
  }, [plausibleDomain, gaMeasurementId]);

  return null;
}
