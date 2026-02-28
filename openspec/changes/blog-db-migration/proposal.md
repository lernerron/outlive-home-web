## Why

The blog API (`POST /api/blog`) fails on Vercel with `EROFS: read-only file system` because `src/lib/blog.js` uses `fs/promises` to read/write `data/blog.json`. This blocks the Content OS from auto-publishing blog posts. Beyond the immediate fix, the blog's data layer mixes storage, business logic, and schema definition into one file with no input validation — a fragile foundation for the upcoming admin CMS and image upload features.

## What Changes

- **Replace flat-file storage with Vercel Postgres (Neon)** — `data/blog.json` → SQL database. Resolves Vercel read-only filesystem error.
- **Introduce layered architecture** — Separate concerns into schema validation (Zod), repository (SQL), and API helpers (CORS/auth/responses). Each layer has one job.
- **Add input validation at API boundary** — Zod schemas validate all POST/PUT payloads before they reach the database. Structured error messages replace silent corruption.
- **Make publish idempotent** — `createPost` uses SQL `ON CONFLICT ... DO UPDATE` (upsert by slug). Content OS can safely retry failed publishes without 409 conflicts.
- **Extract shared middleware** — CORS headers and auth checks currently copy-pasted 4× across route files → extracted to one shared module.
- **Migrate existing data** — Seed script reads 3 existing posts from `data/blog.json` and inserts them into Postgres.

## Capabilities

### New Capabilities
- `blog-data-layer`: Postgres-backed blog data access via repository pattern. Covers CRUD operations, schema validation, data mapping (DB snake_case ↔ API camelCase), and idempotent upsert. Foundation for future image upload and admin CMS features.

### Modified Capabilities
<!-- No existing specs are changing at the requirement level. The blog API contract (endpoints, payloads, responses) stays identical — only the storage backend changes. -->

## Impact

- **Code**: `src/lib/blog.js` (rewritten), `app/api/blog/route.js` and `app/api/blog/[slug]/route.js` (simplified), 3 new modules created
- **Dependencies**: `@vercel/postgres` added to `package.json`
- **Infrastructure**: Vercel Postgres database must be provisioned via Vercel Dashboard (manual step)
- **Data**: 3 existing blog posts migrated from JSON to Postgres via seed script
- **API contract**: Unchanged — same endpoints, same payloads, same responses. Consumers (Content OS) require zero changes.
- **Frontend**: Unchanged — pages import from `src/lib/blog.js` which re-exports from the new repository
