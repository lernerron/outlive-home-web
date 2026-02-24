# Blue Mountain Public

## Local Development

```bash
npm install
npm run dev
```

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
