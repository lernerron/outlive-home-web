## 1. Infrastructure Setup

- [x] 1.1 Provision Vercel Postgres database via Vercel Dashboard — Neon integration `neon-erin-school`
- [x] 1.2 Pull env vars locally with `vercel env pull .env.local`
- [x] 1.3 Install `@neondatabase/serverless` dependency (switched from deprecated @vercel/postgres)

## 2. New Modules

- [x] 2.1 Create `src/lib/blog-schema.js` — Zod schemas (CreatePostSchema, UpdatePostSchema) with defaults
- [x] 2.2 Create `src/lib/api-helpers.js` — corsHeaders, isAuthorized, jsonResponse, errorResponse
- [x] 2.3 Create `src/lib/blog-repository.js` — SQL-backed CRUD (getAllPosts, getPostBySlug, createPost with upsert, updatePost, deletePost, slugify) with rowToPost mapper

## 3. Integration

- [x] 3.1 Update `src/lib/blog.js` — replace fs implementation with re-exports from blog-repository.js
- [x] 3.2 Refactor `app/api/blog/route.js` — use blog-schema validation + api-helpers + blog-repository
- [x] 3.3 Refactor `app/api/blog/[slug]/route.js` — same pattern (schema + helpers + repository)

## 4. Data Migration

- [x] 4.1 Create `scripts/seed-db.js` — reads blog.json, creates table + indexes, upserts all posts
- [x] 4.2 Run seed script against Vercel Postgres (migrated 3 existing posts)

## 5. Verification

- [x] 5.1 Test GET /api/blog returns migrated posts from Postgres
- [x] 5.2 Test POST /api/blog creates a new post (no EROFS error)
- [x] 5.3 Test POST /api/blog with same slug upserts (idempotent, no 409)
- [x] 5.4 Test POST /api/blog with invalid body returns Zod validation error
- [x] 5.5 Test PUT /api/blog/[slug] updates a post
- [x] 5.6 Test DELETE /api/blog/[slug] removes a post
- [x] 5.7 Verify blog frontend pages render correctly (307 redirect = password gate working)
- [ ] 5.8 Test Content OS end-to-end: approve blog item → post appears on website (requires deploy)
