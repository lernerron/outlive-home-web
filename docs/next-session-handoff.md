# Next Session Handoff

## Repo + Branch
- Repo: `outlive-partners/blue-mountain-public`
- Active migration branch: `migration-auth-supabase`
- Base integration branch: `migration-remove-base44`

## Current Status (as of this handoff)
- Base44 SDK + Vite plugin removed from runtime usage.
- Build currently passes.
- Lint currently passes with warnings only.
- CI workflow added (`.github/workflows/ci.yml`) for build + lint.
- Lead capture no longer depends on Base44 entity imports.
- Serverless endpoint added at `api/leads.js`.
- Admin queue page added at `/admin/leads-queue`.

## What Was Implemented
1. Auth decoupling from Base44
- Removed Base44 auth runtime calls from app shell.
- Introduced env-based auth behavior in `src/lib/AuthContext.jsx`.
- `PageNotFound` now uses local auth context.

2. Lead flow decoupling
- Replaced `@/entities/Lead` usage with `src/api/leads.js`.
- Frontend defaults to posting leads to `/api/leads`.
- Network failure fallback queues leads in localStorage key `pending_leads`.

3. Backend endpoint
- `api/leads.js` validates required fields (`name`, `zipCode`, `phone`, `email`).
- Forwards to configured destination using env vars.
- Supports optional webhook secret + auth header/token + payload mode.

4. Queue admin page
- Route: `/admin/leads-queue` (wired in `src/App.jsx`).
- Features: refresh, retry send, export JSON, export CSV, clear queue.

5. Cleanup and branding
- Removed legacy files:
  - `src/api/base44Client.js`
  - `src/api/entities.js`
  - `src/api/integrations.js`
  - `src/lib/app-params.js`
- Updated package name + index title + README base name.

## Remaining Risks / Not Fully Independent Yet
- Hardcoded media URLs still reference `.../storage/.../base44-prod/...` bucket paths.
- If those assets are not in infrastructure you fully control, production may break after Base44 cancellation.

## Priority Next Steps (ordered)
1. Asset ownership migration
- Inventory all hardcoded asset URLs.
- Move assets to your own storage bucket/domain.
- Replace URLs via centralized constants/map.

2. Wire real lead destination
- Set deployment env vars for webhook destination.
- Verify lead delivery end-to-end from form + admin queue retry.

3. Add anti-spam + analytics
- Add Turnstile/hCaptcha to lead form.
- Track lead submit conversion events.

4. SEO/production hardening
- Metadata, OG tags, sitemap/robots, error monitoring.

## Env Vars to Configure
Frontend:
- `VITE_AUTH_REQUIRED`
- `VITE_AUTH_LOGIN_URL`
- `VITE_LEADS_API_URL` (optional; defaults to `/api/leads`)

Server (Vercel function envs):
- `LEADS_WEBHOOK_URL`
- `LEADS_WEBHOOK_SECRET` (optional)
- `LEADS_WEBHOOK_AUTH_HEADER` (default `Authorization`)
- `LEADS_WEBHOOK_AUTH_TOKEN` (optional)
- `LEADS_WEBHOOK_PAYLOAD_MODE` (`raw` or `event`)
- `LEADS_CORS_ORIGIN` (optional)

## Useful Local Commands
```bash
npm install
npm run dev
npm run lint
npm run build
```

## Quick Resume Prompt for Tomorrow
Use this message in next session:

"Continue from `docs/next-session-handoff.md`. Start with Step 1: migrate hardcoded `base44-prod` asset URLs into a centralized asset map and prepare replacement-ready paths."
