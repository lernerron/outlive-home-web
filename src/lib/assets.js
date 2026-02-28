const DEFAULT_ASSET_BASE_URL = "/assets";

const configuredAssetBaseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL?.trim();

export const ASSET_BASE_URL = (
  configuredAssetBaseUrl || DEFAULT_ASSET_BASE_URL
).replace(/\/+$/, "");

const buildAssetUrl = (path) => `${ASSET_BASE_URL}/${path.replace(/^\/+/, "")}`;

export const ASSET_URLS = {
  brand: {
    heroBackground: buildAssetUrl("hero-bathroom.png"),
    showerGlassEnclosure: buildAssetUrl("shower-glass-enclosure.jpg"),
  },
  home: {
    bathroomSafety: buildAssetUrl("bathroom-accessible.jpg"),
    homeElevators: buildAssetUrl("homelift-stiltz.png"),
    stairLifts: buildAssetUrl("stairlift-bruno-elan.png"),
    ramps: buildAssetUrl("ramp-modular.jpg"),
    grabBarsHandrails: buildAssetUrl("grab-bars-handrails.jpg"),
    wheelchairLifts: buildAssetUrl("wheelchair-lift-harmar.jpg"),
  },
  bathroomSafety: {
    hero: buildAssetUrl("bathroom-kohler-choreograph.png"),
    benefits: buildAssetUrl("bathroom-accessible.jpg"),
    walkInTub: buildAssetUrl("bathroom-walk-in-tub.jpg"),
    wetRoom: buildAssetUrl("bathroom-wet-room.jpg"),
    safetyUpdates: buildAssetUrl("bathroom-safety-updates.jpg"),
  },
  homelifts: {
    hero: buildAssetUrl("homelift-hero.png"),
    generic: buildAssetUrl("homelift-stiltz.png"),
    brochurePdf: buildAssetUrl("stiltz-brochure.pdf"),
    features: {
      quickInstallation: buildAssetUrl("homelift-feature-quick-install.png"),
      shaftlessRail: buildAssetUrl("homelift-feature-shaftless-rail.png"),
      easyToOperate: buildAssetUrl("homelift-feature-small-footprint.png"),
      smoothRide: buildAssetUrl("homelift-feature-smooth-ride.png"),
      safetyFeatures: buildAssetUrl("homelift-feature-safety.png"),
      wheelchairFriendly: buildAssetUrl("homelift-feature-wheelchair.png"),
    },
    models: {
      duoAlta: {
        logo: buildAssetUrl("stiltz-duo-alta-logo.png"),
        product: buildAssetUrl("stiltz-duo-alta-product.png"),
      },
      trioAlta: {
        logo: buildAssetUrl("stiltz-trio-alta-logo.png"),
        product: buildAssetUrl("stiltz-trio-alta-product.png"),
      },
    },
  },
  ramps: {
    modular: buildAssetUrl("ramp-modular.jpg"),
  },
  stairLifts: {
    hero: buildAssetUrl("stairlift-bruno-hero.jpg"),
  },
  whyUs: {
    universalDesign: buildAssetUrl("home-universal-design.jpg"),
    craftsmanship: buildAssetUrl("why-us-craftsmanship.jpg"),
    customerService: buildAssetUrl("why-us-customer-service.jpg"),
  },
};
