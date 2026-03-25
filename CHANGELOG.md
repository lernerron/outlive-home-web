# Changelog

All notable changes to the Outlive Homes website will be documented in this file.

## [1.0.6.0] - 2026-03-25 — Resilient Webhook

### Fixed

- **Webhook failure no longer blocks lead submission** — if the Google Sheets webhook is temporarily unavailable, the user still sees success. The lead is already persisted locally before the webhook fires, so no data is lost. Errors are logged server-side for debugging.

## [1.0.5.0] - 2026-03-25 — UTM Tracking & Lead Attribution

### Added

- **UTM parameter capture** — automatically reads `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` from ad URLs and persists them in sessionStorage across page navigation
- **Lead attribution** — every lead form submission now includes UTM data + landing page + page URL, forwarded to Google Sheets webhook for cost-per-lead tracking by channel
- **Thank you page** (`/thank-you`) — post-submission page with next steps. Useful as a GTM conversion trigger (pageview = confirmed lead).

### Changed

- **Lead API** — added UTM and attribution fields to the allowlist (utmSource, utmMedium, utmCampaign, utmContent, utmTerm, landingPage, pageUrl)
- **submitLead()** — auto-injects UTM data at the shared submission layer, so all 3 form types (modal, inline, sticky) get attribution automatically with zero form-level changes

## [1.0.4.0] - 2026-03-25 — Analytics (GTM)

### Added

- **Google Tag Manager** (GTM-NXD2RKXX) — all tracking pixels (GA4, Google Ads, Meta Pixel, etc.) now managed from GTM web dashboard without code changes
- **CTA click tracking** — header "Get Your Free Assessment" button fires `cta_click` event to dataLayer
- **dataLayer integration** — all `trackEvent()` calls push to GTM's dataLayer for unified event consumption

### Changed

- **Analytics architecture** — GA4 no longer loaded directly in code; managed through GTM instead. Plausible support retained (optional, env var gated).

## [1.0.3.0] - 2026-03-25 — SEO Infrastructure

### Added

- **Dynamic sitemap** — auto-generated from all pages + blog posts via Next.js Metadata API, with graceful fallback when database is unavailable
- **OG image** — social share preview image (1200x630) from hero bathroom photo — links on social media, Slack, and messaging apps now show a visual preview
- **manifest.json** — PWA web app manifest (was referenced but missing, causing 404s)
- **JSON-LD structured data** — Organization, Service, FAQPage, and BlogPosting schemas for Google rich snippets and local SEO
- **Homepage custom metadata** — conversion-optimized title and description for search results

### Changed

- **Sitemap upgraded** — replaced static 3-page XML with dynamic generation covering all 8+ pages including blog posts
- **CLAUDE.md** — removed stale "not yet live" note (domain has been live since Sprint 2)

### Removed

- **Static sitemap.xml** — replaced by dynamic `app/sitemap.js`

## [1.0.2.0] - 2026-03-24 — Bathroom Gallery

### Added

- **Image carousel in bathroom showcase** — 5 rotating bathroom photos with smooth crossfade transitions (0.8s, every 5 seconds). Pauses on hover, stops when scrolled out of view, and shows a static image for users who prefer reduced motion.

### Changed

- **DESIGN.md anti-pattern clarified** — "no auto-playing carousels" refined to distinguish sliding carousels (still banned) from subtle crossfade galleries with accessibility controls (acceptable).

## [1.0.1.0] - 2026-03-24 — Focused & Multi-Market

### Changed

- **Homepage focused on bathroom safety** — removed "Coming Soon" cards for Home Elevators and Stair Lifts, merged "Our Expertise" and "Simple Solutions" into a single bathroom showcase section (image + benefits + CTA)
- **Multi-market positioning** — added Los Angeles as second service area, removed all Florida-specific copy from hero, FAQ, and SEO metadata
- **Hero cosmetics** — neutral black gradient overlay (no more blue tint), white eyebrow text with text-shadow for readability, all-white headline on bathroom safety page
- **Solid header variant** — blog and privacy policy pages now use a white header with dark text (previously invisible transparent header on light backgrounds)
- **Blog brand tokens** — replaced generic Tailwind grays with brand token colors

### Added

- **Test framework** — Vitest + @testing-library/react bootstrapped with lead validation tests
- **README rewrite** — updated from legacy Vite/Blue Mountain docs to current Next.js project

### Fixed

- **Header invisible on light pages** — added `headerVariant="solid"` prop to Layout component

## [1.0.0.0] - 2026-03-24 — Launch-Ready Landing Machine

### Added

- **Premium homepage redesign** — Navy hero with cinematic background, 5-star social proof bar, "Our Expertise" service cards, "Simple Solutions" showcase, "How It Works" horizontal process cards, "Why Customers Choose Us" feature section, and inline lead capture form
- **Bathroom Safety service page** (`/services/bathroom-safety`) — Deep landing page with 3 pricing tiers (Barrier-Free Shower $15K, Roll-In Shower $20K, Complete Accessible Bathroom $25K), FAQ accordion, lead capture form, financing callout
- **Partners page** (`/partners`) — Healthcare referral recruitment with benefits cards, partner timeline, OutliveHome.org cross-link, and partner inquiry form
- **Lead form qualification fields** — serviceType, urgency, and relationship dropdowns on all lead forms
- **Turnstile CAPTCHA integration** — Cloudflare Turnstile on modal lead form (optional, enabled via env vars)
- **Email suggestions** — Domain typo detection on lead form email field
- **Dark mode support** for inline lead forms on navy backgrounds
- **Sticky CTA banner** with configurable presets and inline mini-form
- **Playfair Display + DM Sans** typography via next/font
- **Design system** (DESIGN.md) — Component patterns, spacing, motion, buttons, forms, cards
- **VERSION and CHANGELOG** files for release tracking

### Changed

- **Homepage routing** — Premium design promoted from `/testing` to production `/`
- **Lead API** — Field allowlisting (no raw body spread), dual consumer/partner validation, CORS restricted to outlivehome.com
- **Layout** — Brand token colors in nav/footer (replaced generic Tailwind grays), anchor scroll offset for sticky header
- **Consent text** — WCAG-compliant sizing (12px/70% opacity), hidden on mobile, shortened copy

### Fixed

- **Webhook secret leak** — Removed secret from URL query string (header-only now)
- **PII logging** — Removed lead payload from console.log
- **Image proxy SSRF** — Removed wildcard hostname from Next.js image config
- **Dead geolocation code** — Removed unused browser permission prompt from modal form
- **"Seniors" in copy** — Replaced with inclusive language ("adults 65+", "customers", "people")
- **Invalid CSS class** — `md:rows-4` → `md:h-32` on Partners textarea
- **Scroll behavior warning** — Added `data-scroll-behavior` to html element

### Removed

- `/demo` and `/testing` routes (redirected to `/`)
- Legacy `Home.jsx` and `Demo.jsx` views (archived as `.legacy.jsx`)
