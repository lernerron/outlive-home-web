# CLAUDE.md — Outlive Homes Website

## Project Context

**Outlive Homes** is an aging-in-place home remodeling company launching in South Florida. This is the primary marketing website — its job is to convert visitors into estimate requests.

- **Repo:** github.com/lernerron/outlive-home-web (upstream: outlive-partners/outlive-home-web)
- **Branch:** `main` (production)
- **Framework:** Next.js 15 (App Router) + React 18
- **Language:** JavaScript (JSX) — not TypeScript
- **Styling:** Tailwind CSS v3 + shadcn/ui (New York style) + `@tailwindcss/typography`
- **Package Manager:** npm
- **Deployment:** Vercel (push-to-deploy from main) — connected
- **Production Domain:** outlivehome.com (not yet live)
- **Dev URL:** localhost:3000

## Session Start — ALWAYS DO THIS

1. Verify OpenSpec is available: run `openspec --version`. If not found, tell the user to install it with `npm install -g @fission-ai/openspec@latest` then run `openspec init` before proceeding.
2. Run `openspec list` to check for active changes — resume where we left off
3. Check `openspec/specs/` for specs related to today's work
4. Review `tasks/lessons.md` for relevant patterns and past corrections
5. Check `package.json` scripts before running any commands — don't assume what exists

## OpenSpec Integration

All non-trivial work uses the OpenSpec spec-driven workflow. See `~/.claude/rules/openspec-workflow.md` for the full propose → apply → archive lifecycle and rules on when to use vs. skip.

## Tech Stack Conventions

- **Server Components by default** — use Client Components only when the component needs interactivity, hooks, or browser APIs
- **Page/Content split pattern** — `page.jsx` (server, SEO metadata) + `*-content.jsx` ("use client", wraps view in Layout)
- **Views** live in `src/views/` — presentational components for each page
- **SEO is critical** — every page needs a `generateMetadata` export; this is a local business that depends on search ranking
- **Images** — use `next/image` for all images, never raw `<img>` tags
- **Links** — use `next/link` for all internal navigation; anchor links use `/#section` for cross-page support
- **Forms** — submit to `/api/leads` route which forwards to Google Sheets via Apps Script webhook
- **Accessibility** — WCAG AA minimum, AAA where feasible; our audience includes aging users with reduced visual acuity
- **Assets** — served from `public/assets/`, configured via `src/lib/assets.js`
- **Blog** — API-driven, data in `data/blog.json`, CRUD API at `/api/blog`. See `docs/blog-api.md`

## Brand System

Brand colors, typography, usage rules, and accessibility contrast requirements are defined in `~/.claude/rules/brand.md`. That file is the single source of truth.

In this project, brand tokens are configured in `tailwind.config.js` under `theme.extend.colors`. Never hardcode hex values — always use the Tailwind token names.

## Architecture

- **Routes:** `/` (home), `/blog`, `/blog/[slug]`, `/privacypolicy`, `/admin/leads-queue`
- **APIs:** `/api/leads` (POST), `/api/blog` (GET/POST), `/api/blog/[slug]` (GET/PUT/DELETE)
- **Views:** `src/views/` — Home, BlogIndex, BlogPost, PrivacyPolicy, AdminLeadsQueue
- **Components:** `src/components/` — Layout, ui/ (shadcn)
- **Data:** `data/blog.json` (blog posts), `data/leads.json` (local lead backup, gitignored)

## Key Integrations

- **Lead Capture:** Forms → `/api/leads` → Google Sheets via Apps Script webhook
- **Blog API:** REST API for AI content agent publishing. Auth via `X-Blog-Secret` header. Docs in `docs/blog-api.md`
- **Analytics:** Not yet configured (Plausible or GA planned)
- **Anti-spam:** Turnstile env vars available but not yet enabled

## Environment Variables

```
# .env.local (gitignored — never commit)
LEADS_WEBHOOK_URL=           # Google Apps Script webhook URL
LEADS_WEBHOOK_SECRET=        # Shared secret for webhook auth
LEADS_STORE_LOCAL=true       # Also save leads to local JSON
LEADS_LOCAL_PATH=./data/leads.json
BLOG_WRITE_SECRET=           # Auth for blog API write operations

# Available but not yet configured
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_SITE_URL=
```

## Testing

- No test framework configured yet — flag to user before skipping tests
- Build verification: `npm run build` must pass with 0 errors
- API verification: test with curl (see `docs/blog-api.md`)

## Deployment

- Push to `main` → Vercel auto-deploys to production
- Push to feature branch → Vercel creates preview deployment
- Always verify preview deployment before merging to main

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check
```

## Site Goals

- Convert visitors into leads (estimate requests)
- Publish blog content via API for SEO and content marketing
- Communicate with AI agents and other applications via API
