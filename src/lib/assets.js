const DEFAULT_ASSET_BASE_URL = "/assets";
const LEGACY_ASSET_BASE_URL =
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public";

const configuredAssetBaseUrl = import.meta.env.VITE_ASSET_BASE_URL?.trim();

export const ASSET_BASE_URL = (
  configuredAssetBaseUrl || DEFAULT_ASSET_BASE_URL || LEGACY_ASSET_BASE_URL
).replace(/\/+$/, "");

const buildAssetUrl = (path) => `${ASSET_BASE_URL}/${path.replace(/^\/+/, "")}`;

export const ASSET_URLS = {
  brand: {
    logo: buildAssetUrl("688302222532cfd3939198b2/0f33cbc97_BlueMountainLogo.jpg"),
  },
  home: {
    bathroomSafety: buildAssetUrl("317fd6_AccessibleBathroom.jpg"),
    homeElevators: buildAssetUrl("9b3d8c_StiltzLift.png"),
    stairLifts: buildAssetUrl("f49588477_Bruno-Elan-SRE-3050-Stairlift-Bottom-Of-Stairs-2.png"),
    ramps: buildAssetUrl("673f08be2_Ramps.jpg"),
    grabBarsHandrails: buildAssetUrl("10bde6_Handrails2.jpg"),
    wheelchairLifts: buildAssetUrl("4239901fe_WheelchairLift-harmar-highlanderii-l-bap-lpr.jpg"),
  },
  bathroomSafety: {
    hero: buildAssetUrl("152233e36_kohlrChoreograph2.png"),
    benefits: buildAssetUrl("317fd6_AccessibleBathroom.jpg"),
    walkInTub: buildAssetUrl("523f79347_KohlerWalk-inTub1.jpg"),
    wetRoom: buildAssetUrl("4cffb52aa_Wet-Roombyhttps-motionspotcouk.jpg"),
    safetyUpdates: buildAssetUrl("531adeaa4_SafteyAccessibilityUpdatesCredit-LameBlackLamb.jpg"),
  },
  homelifts: {
    hero: buildAssetUrl("f75325b4e_Homeliftherosectionphoto1.png"),
    generic: buildAssetUrl("9b3d8c_StiltzLift.png"),
    brochurePdf: buildAssetUrl("81a88eabb_Stiltz-US-Duo-Trio-Alta-Brochure-11-01-23-WEB.pdf"),
    features: {
      quickInstallation: buildAssetUrl("8126875ed_quick-installation-feature.png"),
      shaftlessRail: buildAssetUrl("113a19b8d_Theinvisibleelevator.png"),
      easyToOperate: buildAssetUrl("68aa89b09_Smallfootprint.png"),
      smoothRide: buildAssetUrl("dce936dd7_smooth-and-quiet-ride-feature.png"),
      safetyFeatures: buildAssetUrl("8b4dc3927_built-in-safety-feature.png"),
      wheelchairFriendly: buildAssetUrl("31d7d12e7_Wheelchairfriendlyoption2.png"),
    },
    models: {
      duoAlta: {
        logo: buildAssetUrl("9a12b85ce_duo-alta-logo.png"),
        product: buildAssetUrl("9b4f43dec_DuoAltaPhoto.png"),
      },
      trioAlta: {
        logo: buildAssetUrl("20a8f01ea_trio-alta-logo.png"),
        product: buildAssetUrl("c08f4c98f_TrioAltaPhoto.png"),
      },
    },
  },
  ramps: {
    modular: buildAssetUrl("673f08be2_Ramps.jpg"),
  },
  stairLifts: {
    hero: buildAssetUrl("2914844b0_BrunoWebsitePhoto.jpg"),
  },
};
