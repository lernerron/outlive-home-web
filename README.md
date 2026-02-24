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
