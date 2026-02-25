# Blue Mountain Public

## Local Development

```bash
npm install
npm run dev
```

## Static Asset Base URL

- Static marketing assets are centralized in `src/lib/assets.js`.
- Local default is `/assets` served from `public/assets`.
- Set `VITE_ASSET_BASE_URL` to point assets to your own bucket/domain when ready.
- Use `./scripts/download-assets.sh` to pull the legacy assets into `public/assets`.

## Local Lead Storage (Dev)

- Set `LEADS_STORE_LOCAL=true` to persist leads to a local JSON file.
- Default path is `./data/leads.json` and is only recommended for local dev.

## Turnstile (Anti-spam)

- Set `VITE_TURNSTILE_SITE_KEY` (client) and `TURNSTILE_SECRET_KEY` (server).
- If set, form submissions require Turnstile verification.

## Analytics (Optional)

- Plausible: set `VITE_PLAUSIBLE_DOMAIN`.
- Google Analytics: set `VITE_GA_MEASUREMENT_ID`.

## SEO Defaults

- `public/robots.txt` and `public/sitemap.xml` are set to `http://localhost:5173`.
- Update those URLs before production deployment.

## Lead Submission Flow

- Frontend posts to `VITE_LEADS_API_URL` when set.
- If unset, frontend defaults to `/api/leads`.
- If the endpoint is unreachable, lead data is queued in browser `localStorage` under `pending_leads`.

## Serverless Leads Endpoint

This repo includes a Vercel function at `api/leads.js`.

- Accepts `POST /api/leads` JSON payloads.
- Validates required fields: `name`, `zipCode`, `phone`, `email`.
- If `LEADS_WEBHOOK_URL` is configured, forwards lead payloads there.
- If no webhook is configured, logs payload server-side and returns success.

### Admin Queue Page

- Open `/admin/leads-queue` to inspect local queued leads.
- Actions available: refresh, retry-send, export JSON, export CSV, clear queue.
- Queue source is browser `localStorage` key `pending_leads`.

### Wiring `LEADS_WEBHOOK_URL` to a Real Destination

Use Vercel project env vars:

- `LEADS_WEBHOOK_URL`: destination endpoint URL.
- `LEADS_WEBHOOK_SECRET`: optional shared secret sent as `X-Webhook-Secret`.
- `LEADS_WEBHOOK_AUTH_HEADER`: header name for token auth (default `Authorization`).
- `LEADS_WEBHOOK_AUTH_TOKEN`: token value (for example `Bearer <token>`).
- `LEADS_WEBHOOK_PAYLOAD_MODE`:
  - `raw`: sends lead object directly (default).
  - `event`: sends `{ event: "lead.created", data: <lead> }`.
