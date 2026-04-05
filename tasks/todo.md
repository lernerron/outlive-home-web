# Project TODO

## Pending

- [ ] **Update bathroom-safety page before re-enabling** — The `/services/bathroom-safety` page is temporarily disabled (302 redirect to `/`, nav links removed, removed from sitemap). Page files are intact in the codebase. To re-enable: remove the redirect from `next.config.mjs`, re-add nav links in `Layout.jsx`, re-add to `app/sitemap.js`, and update homepage/thank-you CTAs.

---

## Home Page Copy Updates

Single file: `src/views/HomePremium.jsx`

### Changes
- [x] **1. Remove hero eyebrow** — Deleted "Home Accessibility Experts" and its `<motion.div>` wrapper
- [x] **2. Update hero description** — New copy applied
- [x] **3. Update Bathroom Solutions section description** — "clinical expertise" → "universal design expertise", added "functional"
- [x] **4. Replace bullet points** — Swapped 4 bullets with 3 new ones

### Verification
- [x] `npm run build` passes
- [x] Visual check with gstack browse — all text verified on live page
