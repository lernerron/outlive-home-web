export const BANNER_PRESETS = {
  default: {
    promo: "$1,000 Off Your Shower, Plus Low Monthly Payments!*",
    desktopLabel: "Get a Free Estimate:",
    submitText: "Get Free Quote",
    mobileCta: "Ready to transform your home?",
    mobileButtonText: "Get Free Estimate",
    successMessage: "Thank you! We'll contact you within 24 hours.",
    leadSource: "sticky-banner",
    scrollThreshold: 0.85,
  },
  // Future presets:
  // stairlift: {
  //   promo: "Free Stairlift Consultation — Limited Time!",
  //   desktopLabel: "Book a Free Consultation:",
  //   submitText: "Book Consultation",
  //   mobileCta: "Need a stairlift solution?",
  //   mobileButtonText: "Get Free Consultation",
  //   successMessage: "Thank you! We'll contact you within 24 hours.",
  //   leadSource: "sticky-banner-stairlift",
  //   scrollThreshold: 0.85,
  // },
};

export function getBannerConfig(preset = 'default') {
  return BANNER_PRESETS[preset] || BANNER_PRESETS.default;
}
