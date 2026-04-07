# TODOS

## Partner Page Go-Live Checklist

### Add navigation links for Rapid Recess partner page
**What:** Add "Our Technology" link to header nav, mobile nav, and footer Quick Links pointing to `/partners/rapid-recess`.
**Why:** Page is only accessible via direct URL while password-protected. Once partnership is confirmed, it needs to be discoverable.
**Context:** The Rapid Recess page was built as a mockup for partner approval. Nav links were intentionally deferred. When adding, update the `navigation` array in `src/components/Layout.jsx` and the footer Quick Links section in the same file.
**Depends on:** Partnership confirmation + password removal (remove `PARTNER_PW_RAPID_RECESS` from Vercel env vars).

### Enable SEO for Rapid Recess partner page
**What:** Add `/partners/rapid-recess` to `app/sitemap.js` (priority 0.7, monthly). Change `robots` in `app/partners/rapid-recess/page.jsx` metadata from `{ index: false, follow: false }` to `{ index: true, follow: true }`.
**Why:** Page is noindexed while in mockup/review state. Needs to be indexable for search traffic once live.
**Context:** Both changes are one-liners. Do them together with the nav link addition above.
**Depends on:** Nav links added (above) + password removed.

### Replace Rapid Recess placeholder content with real assets
**What:** Swap placeholder boxes for real before/after photos (4 images, 4:3 aspect ratio), add actual installation video URL (replace dashed placeholder with iframe embed), add real partner quote from Rapid Recess team (replace placeholder text in quote section).
**Why:** Mockup uses dashed-border placeholder boxes. Real assets are needed for production.
**Context:** Images go in `public/assets/partners/rapid-recess/`. Use `next/image` with proper width/height. Video section has a conditional: when URL is provided, swap placeholder for `<iframe>`. Quote section has placeholder attribution "— Rapid Recess".
**Depends on:** Rapid Recess CEO approval + asset delivery from their team.

### Re-enable sticky CTA banner on Rapid Recess page
**What:** Remove `bannerPreset` suppression from the Rapid Recess partner page content wrapper so the sticky CTA banner appears.
**Why:** Banner is suppressed during mockup/CEO review stage. Should be active once the page is public to drive conversions.
**Context:** The content wrapper (`rapid-recess-content.jsx`) passes a bannerPreset prop to Layout that suppresses the banner. Remove this prop or set it to the default when going live.
**Depends on:** Partnership confirmation + all other go-live items completed.
