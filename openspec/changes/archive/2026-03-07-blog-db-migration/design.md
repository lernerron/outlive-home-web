## Context

The blog website stores posts in `data/blog.json` via `fs/promises`. All 5 CRUD functions live in `src/lib/blog.js` — the single data access module. API routes (`app/api/blog/route.js` and `app/api/blog/[slug]/route.js`) and frontend pages both import from this module.

On Vercel's serverless runtime, `fs.writeFile` fails with `EROFS: read-only file system`. GET operations work (reading is allowed), but POST/PUT/DELETE are broken. This blocks the Content OS auto-publishing pipeline.

**Constraints:**
- Website is JavaScript (not TypeScript) — maintain JSX conventions
- Must work on Vercel serverless (connection pooling required)
- API contract (endpoints, payloads, responses) must not change — Content OS (`server/publishers/blog.ts`) already sends correctly formatted requests
- 3 existing posts must be migrated without data loss
- Frontend pages import from `src/lib/blog.js` — import paths must stay stable

## Goals / Non-Goals

**Goals:**
- Fix `POST /api/blog` on Vercel (resolve EROFS)
- Establish layered architecture (schema → repository → routes) for future admin CMS and image upload features
- Add input validation at API boundary using Zod
- Make `createPost` idempotent (upsert by slug)
- DRY shared middleware (CORS, auth, responses)
- Migrate 3 existing posts to Postgres

**Non-Goals:**
- Admin UI (Phase 3 — separate OpenSpec)
- Image upload endpoint (Phase 2 — separate OpenSpec)
- API versioning (single consumer, unnecessary complexity)
- TypeScript migration (project uses JavaScript)
- Changing the API contract

## Decisions

### 1. Vercel Postgres (Neon) over alternatives

**Chosen:** `@vercel/postgres` — Neon serverless driver with automatic connection pooling.

**Alternatives considered:**
- **Supabase** — `.env.example` has placeholder vars, but adds external account + dependency. Vercel Postgres is native, one-click provisioning.
- **Vercel Blob** — Would preserve the "load entire file" antipattern. Not a real fix.
- **PlanetScale** — MySQL-based, overkill for a blog with simple CRUD.

**Rationale:** Vercel Postgres auto-injects connection strings, handles serverless cold starts via Neon's driver, free tier (256 MB) covers thousands of posts. Zero new accounts needed.

### 2. Layered architecture over monolith rewrite

**Chosen:** Three new modules (`blog-schema.js`, `blog-repository.js`, `api-helpers.js`) with `blog.js` as a re-export shim.

**Alternative:** Rewrite `blog.js` in-place with SQL queries (minimal change).

**Rationale:** The in-place rewrite solves today's problem but doesn't set up for Phase 2 (image upload) or Phase 3 (admin CMS). Separating schema, repository, and helpers means each future feature adds to an existing pattern rather than growing a god file.

### 3. Upsert over error-on-duplicate

**Chosen:** `ON CONFLICT (slug) DO UPDATE` — idempotent create.

**Alternative:** Keep current `throw new Error("Post with slug already exists")`.

**Rationale:** Content OS may retry on network failure. An upsert means retries succeed rather than returning 409. This is standard microservices resilience — make operations idempotent wherever possible.

### 4. Flattened SEO columns over JSON column

**Chosen:** `seo_meta_title TEXT, seo_meta_description TEXT` as separate columns.

**Alternative:** `seo JSONB` column.

**Rationale:** Only two fields. Separate columns are queryable, indexable, and don't require JSON operators. The `rowToPost()` mapper reconstructs the nested `{ seo: { metaTitle, metaDescription } }` shape for API responses.

### 5. `blog.js` as re-export shim

**Chosen:** `blog.js` re-exports all functions from `blog-repository.js`.

**Alternative:** Update all import paths across the codebase.

**Rationale:** Frontend pages (`app/blog/page.jsx`, `app/blog/[slug]/page.jsx`) import from `@/lib/blog`. Changing these imports adds risk for zero benefit. The re-export shim preserves stability.

## Risks / Trade-offs

- **Vercel Postgres cold starts** → Neon serverless driver handles this with connection pooling. First query after cold start may take ~200ms longer. Acceptable for a blog with low traffic.

- **Seed script is one-time** → If seed runs twice, upsert prevents duplicates. Safe to re-run.

- **`data/blog.json` becomes dead code** → Keep the file as a backup but it's no longer read by the application. Document this in comments.

- **Zod validation may reject previously accepted payloads** → Current API accepts any JSON with `title` and `content`. Zod schema is permissive (most fields optional with defaults) so existing Content OS payloads will pass. Test with actual Content OS payload to confirm.

## Migration Plan

1. **Provision database** — Vercel Dashboard → Storage → Create Postgres
2. **Pull env vars** — `vercel env pull .env.local` (gets `POSTGRES_URL` etc.)
3. **Install dependency** — `npm install @vercel/postgres`
4. **Create new modules** — blog-schema.js, blog-repository.js, api-helpers.js
5. **Update blog.js** — re-export from repository
6. **Simplify routes** — use schema + helpers
7. **Run seed** — `node scripts/seed-db.js` creates table + inserts 3 posts
8. **Test locally** — verify all CRUD operations
9. **Deploy** — push to branch → Vercel preview deployment → test API
10. **Verify Content OS** — approve a blog item → confirm post appears

**Rollback:** Revert `blog.js` to read from `data/blog.json` (file still exists). Remove `@vercel/postgres` from package.json. No database teardown needed.
