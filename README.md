# Outlive Homes Website

Marketing website for [Outlive Homes](https://outlivehome.com) — aging-in-place home remodeling. Converts visitors into estimate requests.

**Stack:** Next.js 15 (App Router) · React 18 · Tailwind CSS · shadcn/ui · Vercel

## Local Development

```bash
npm install
npm run dev          # localhost:3000
npm run build        # Production build
npm run lint         # ESLint
npm test             # Vitest
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
# Required for blog (auto-injected on Vercel)
DATABASE_URL=                # Vercel Postgres / Neon

# Lead capture
LEADS_WEBHOOK_URL=           # Google Apps Script webhook
LEADS_WEBHOOK_SECRET=        # Shared secret (header-only)
LEADS_STORE_LOCAL=true       # Also save to local JSON (dev only)

# Blog API auth
BLOG_WRITE_SECRET=           # Auth for blog write operations

# Optional
NEXT_PUBLIC_TURNSTILE_SITE_KEY=  # Cloudflare Turnstile (client)
TURNSTILE_SECRET_KEY=            # Cloudflare Turnstile (server)
NEXT_PUBLIC_SITE_URL=            # Production URL
SITE_PASSWORD=                   # Password gate for preview protection
```

## Site Structure

| Route | Purpose |
|-------|---------|
| `/` | Homepage — bathroom safety focus, lead capture |
| `/services/bathroom-safety` | Service landing page with pricing tiers |
| `/partners` | Healthcare referral partner recruitment |
| `/blog` | Blog index (Postgres-backed via Neon) |
| `/blog/[slug]` | Individual blog post |
| `/privacypolicy` | Privacy policy |

## Lead Capture Flow

1. Visitor fills form (modal CTA or inline form)
2. Frontend POSTs to `/api/leads`
3. API validates fields (allowlisted), optionally verifies Turnstile CAPTCHA
4. Forwards to Google Sheets via webhook (header-only secret)
5. Optionally persists to local JSON (dev mode)

## Blog API

REST API for programmatic content publishing. See [`docs/blog-api.md`](docs/blog-api.md) for full documentation.

- `GET /api/blog` — list all posts
- `GET /api/blog/:slug` — single post
- `POST /api/blog` — create post (requires `X-Blog-Secret`)
- `PUT /api/blog/:slug` — update post
- `DELETE /api/blog/:slug` — delete post

## Deployment

- **Production:** Push to `main` → Vercel auto-deploys to [outlivehome.com](https://outlivehome.com)
- **Preview:** Push to feature branch → Vercel creates preview deployment

## Design System

Brand identity defined in `DESIGN.md` — color tokens, typography (Playfair Display + DM Sans), component patterns, spacing, motion, and accessibility requirements. All colors use Tailwind brand tokens configured in `tailwind.config.cjs`.

## Testing

Vitest + @testing-library/react. Tests live in `__tests__/`.

```bash
npm test             # Single run
npm run test:watch   # Watch mode
```
