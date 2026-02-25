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
- Static `base44-prod` asset URLs are centralized in `src/lib/assets.js`.
- Asset source is now overrideable via `VITE_ASSET_BASE_URL`.
- Local asset staging added in `public/assets` with a download script.
- Turnstile + optional analytics hooks added (env-gated).
- Local lead persistence option added for dev (`LEADS_STORE_LOCAL`).
- Basic SEO metadata + `robots.txt` + `sitemap.xml` added.

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
- Local assets are not yet present in `public/assets` in this environment (download requires network).
- `sitemap.xml`/`robots.txt` are set to `http://localhost:5173` and need update for production domain.

## Priority Next Steps (ordered)
1. Asset ownership migration (local)
- Run `./scripts/download-assets.sh` with network access or manually place assets in `public/assets`.
- Validate every page renders assets correctly from `/assets`.

2. Wire real lead destination (when ready)
- Set deployment env vars for webhook destination.
- Verify lead delivery end-to-end from form + admin queue retry.

3. Analytics + anti-spam (configured)
- Set Turnstile keys to enforce verification.
- Configure Plausible or Google Analytics IDs to enable tracking.

4. SEO/production hardening (defaults added)
- Update `sitemap.xml` + `robots.txt` URLs for the production domain.

## Env Vars to Configure
Frontend:
- `VITE_AUTH_REQUIRED`
- `VITE_AUTH_LOGIN_URL`
- `VITE_LEADS_API_URL` (optional; defaults to `/api/leads`)
- `VITE_ASSET_BASE_URL` (defaults to `/assets`)
- `VITE_TURNSTILE_SITE_KEY` (optional)
- `VITE_PLAUSIBLE_DOMAIN` (optional)
- `VITE_GA_MEASUREMENT_ID` (optional)

Server (Vercel function envs):
- `LEADS_WEBHOOK_URL`
- `LEADS_WEBHOOK_SECRET` (optional)
- `LEADS_WEBHOOK_AUTH_HEADER` (default `Authorization`)
- `LEADS_WEBHOOK_AUTH_TOKEN` (optional)
- `LEADS_WEBHOOK_PAYLOAD_MODE` (`raw` or `event`)
- `LEADS_CORS_ORIGIN` (optional)
- `LEADS_STORE_LOCAL` (optional; dev only)
- `LEADS_LOCAL_PATH` (optional; dev only)
- `TURNSTILE_SECRET_KEY` (optional)

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
