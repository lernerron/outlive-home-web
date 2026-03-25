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
- **Production Domain:** outlivehome.com
- **Dev URL:** localhost:3000

## Session Start — ALWAYS DO THIS

1. Verify OpenSpec is available: run `openspec --version`. If not found, tell the user to install it with `npm install -g @fission-ai/openspec@latest` then run `openspec init` before proceeding.
2. Run `openspec list` to check for active changes — resume where we left off
3. Check `openspec/specs/` for specs related to today's work
4. Review `tasks/lessons.md` for relevant patterns and past corrections
5. Check `package.json` scripts before running any commands — don't assume what exists
6. Activate governance — identify mode (Full Sprint, Execution, or Direct Fix) per `.claude/rules/governance.md`

## OpenSpec Integration

All non-trivial work uses the OpenSpec spec-driven workflow. See `~/.claude/rules/openspec-workflow.md` for the full propose → apply → archive lifecycle and rules on when to use vs. skip.

Development workflow follows the GStack governance framework. See @.claude/rules/governance.md for modes, stage gates, and skill routing.

### GStack Protocol Summary

**Mode Selection:**
- New feature or big change → Full Sprint
- Existing plan or OpenSpec change → Execution Mode
- Bug fix or trivial change → Direct Fix

**Full Sprint Sequence:**
1. **Think** — `/office-hours` or `/plan-ceo-review` → user approves direction
2. **Plan** — `/plan-eng-review` (required) + `/plan-design-review` (if UI) → user approves plan
3. **Build** — Implement per plan, one concern per commit
4. **Review** — `/review` → issues resolved
5. **QA** — `/qa` → all passing
6. **Ship** — `/ship` → push + PR, then `/document-release`

**Skill Routing (which reviews to run):**
| Step involves | Required | Optional |
|---|---|---|
| Backend / data / API | `/plan-eng-review`, `/review`, `/qa` | — |
| Frontend / UI | `/plan-eng-review`, `/plan-design-review`, `/review`, `/qa` | `/browse` |
| Config / infra | `/plan-eng-review`, `/review` | `/qa` |
| Copy / content only | `/review` | `/plan-design-review` |

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
- **Blog** — API-driven, Postgres-backed (Neon via Vercel). Layered: `blog-schema.js` (Zod validation) → `blog-repository.js` (SQL) → `blog.js` (re-export shim). CRUD API at `/api/blog`

## Brand System

Brand identity (colors, typography, hard rules, accessibility contrast) is defined in `~/.claude/rules/brand.md`. Component patterns, spacing, motion, buttons, forms, and implementation details are in `DESIGN.md` at the project root. Both files are source of truth — brand.md for identity, DESIGN.md for implementation.

Brand tokens are configured in `tailwind.config.cjs` under `theme.extend.colors`. Never hardcode hex values — always use Tailwind token names.

## Architecture

- **Routes:** `/` (home), `/services/bathroom-safety`, `/partners`, `/blog`, `/blog/[slug]`, `/privacypolicy`, `/admin/leads-queue`, `/gate`
- **APIs:** `/api/leads` (POST), `/api/blog` (GET/POST), `/api/blog/[slug]` (GET/PUT/DELETE), `/api/gate` (POST)
- **Views:** `src/views/` — HomePremium, BathroomSafety, Partners, BlogIndex, BlogPost, PrivacyPolicy, AdminLeadsQueue
- **Components:** `src/components/` — Layout, LeadCaptureForm, InlineLeadForm, StickyCtaBanner, Logo, Analytics, ui/ (shadcn)
- **Data:** Vercel Postgres / Neon (`posts` table), `data/leads.json` (local lead backup, gitignored), `data/services.json` (service pricing tiers), `data/blog.json` (seed data, no longer read at runtime)
- **Designs:** `docs/designs/` — gstack design docs from `/office-hours` sessions; `docs/wireframes/` — wireframe HTML files

## Key Integrations

- **Lead Capture:** Forms → `/api/leads` → Google Sheets via Apps Script webhook
- **Blog API:** REST API for AI content agent (Content OS) publishing. Auth via `X-Blog-Secret` header. Idempotent upsert by slug. Zod-validated inputs
- **Analytics:** Not yet configured (Plausible or GA planned)
- **Anti-spam:** Turnstile CAPTCHA integrated in modal lead form (enabled when `TURNSTILE_SECRET_KEY` is set)

## Environment Variables

```
# .env.local (gitignored — never commit)
DATABASE_URL=                # Vercel Postgres / Neon (auto-injected by Vercel)
BLOG_WRITE_SECRET=           # Auth for blog API write operations
SITE_PASSWORD=               # Password gate for preview protection

LEADS_WEBHOOK_URL=           # Google Apps Script webhook URL
LEADS_WEBHOOK_SECRET=        # Shared secret for webhook auth
LEADS_STORE_LOCAL=true       # Also save leads to local JSON
LEADS_LOCAL_PATH=./data/leads.json

# Available but not yet configured
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_SITE_URL=
```

## Testing

- **Framework:** Vitest + @testing-library/react + jsdom
- **Run tests:** `npm test` (single run) or `npm run test:watch` (watch mode)
- **Config:** `vitest.config.js` with `@` alias for `src/`
- **Test directory:** `__tests__/`
- **Conventions:** Colocate tests next to source or in `__tests__/`, use `.test.js` suffix
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
npm test             # Run tests (vitest)
npm run test:watch   # Run tests in watch mode
```

## Site Goals

- Convert visitors into leads (estimate requests)
- Publish blog content via API for SEO and content marketing
- Communicate with AI agents and other applications via API
