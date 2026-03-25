"use client";

import Script from 'next/script';

// GA4 is now managed through GTM (configured in app/layout.jsx).
// This component handles Plausible only (optional, env var gated).
export default function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();

  if (!plausibleDomain) return null;

  return (
    <Script
      src="https://plausible.io/js/script.js"
      data-domain={plausibleDomain}
      strategy="afterInteractive"
    />
  );
}
