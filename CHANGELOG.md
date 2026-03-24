# Changelog

All notable changes to the Outlive Homes website will be documented in this file.

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
