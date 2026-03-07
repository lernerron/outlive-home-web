## ADDED Requirements

### Requirement: Blog posts are persisted in Postgres
The system SHALL store all blog post data in a Vercel Postgres (Neon) database instead of the filesystem. The `posts` table SHALL contain columns for id, slug, title, excerpt, content, category, tags, author, cover_image, published, published_at, updated_at, seo_meta_title, and seo_meta_description.

#### Scenario: Application reads posts from database
- **WHEN** any blog function (getAllPosts, getPostBySlug) is called
- **THEN** the system SHALL query the `posts` table in Postgres
- **AND** SHALL NOT read from `data/blog.json`

#### Scenario: Application writes posts to database
- **WHEN** any write function (createPost, updatePost, deletePost) is called
- **THEN** the system SHALL execute SQL statements against the `posts` table
- **AND** SHALL NOT write to the filesystem

### Requirement: API inputs are validated with Zod schemas
The system SHALL validate all POST and PUT request bodies against Zod schemas before processing. Invalid payloads SHALL be rejected with structured error messages.

#### Scenario: Valid POST body
- **WHEN** a POST request to `/api/blog` contains `title` and `content` fields
- **THEN** the system SHALL accept the request and create the post
- **AND** SHALL apply defaults for omitted optional fields (category: "company-news", author: "Outlive Homes", published: true)

#### Scenario: Invalid POST body missing required fields
- **WHEN** a POST request to `/api/blog` is missing `title` or `content`
- **THEN** the system SHALL return HTTP 400
- **AND** the response body SHALL contain `{ error: "<validation message>" }`

#### Scenario: Valid PUT body with partial update
- **WHEN** a PUT request to `/api/blog/[slug]` contains any subset of post fields
- **THEN** the system SHALL update only the provided fields and preserve all others

### Requirement: Post creation is idempotent via upsert
The system SHALL use SQL `ON CONFLICT (slug) DO UPDATE` when creating posts, making the operation idempotent. Duplicate slug submissions SHALL update the existing post rather than failing.

#### Scenario: First POST with a new slug
- **WHEN** a POST request creates a post with slug "my-new-post" that does not exist
- **THEN** the system SHALL insert a new row and return HTTP 201

#### Scenario: Retry POST with an existing slug
- **WHEN** a POST request creates a post with slug "my-new-post" that already exists
- **THEN** the system SHALL update the existing post's content fields
- **AND** SHALL return HTTP 201 with the updated post data
- **AND** SHALL NOT return HTTP 409

### Requirement: Database rows map to API-compatible post objects
The system SHALL transform database rows (snake_case columns) to camelCase JSON objects matching the existing API contract. The `seo_meta_title` and `seo_meta_description` columns SHALL be mapped to a nested `seo: { metaTitle, metaDescription }` object.

#### Scenario: Post retrieved from database
- **WHEN** a post row is read from the database
- **THEN** the returned object SHALL have camelCase keys: `coverImage`, `publishedAt`, `updatedAt`
- **AND** SHALL nest SEO fields as `seo: { metaTitle, metaDescription }`

### Requirement: CORS and auth middleware is shared
The system SHALL use a single shared module for CORS headers, authorization checks, and standardized response formatting. Route files SHALL NOT duplicate these functions.

#### Scenario: Unauthenticated write request
- **WHEN** a POST, PUT, or DELETE request lacks a valid `X-Blog-Secret` header
- **THEN** the system SHALL return HTTP 401 with `{ error: "Unauthorized" }`

#### Scenario: CORS preflight request
- **WHEN** an OPTIONS request is received on any blog API endpoint
- **THEN** the system SHALL return HTTP 204 with appropriate CORS headers

### Requirement: Existing data is migrated via seed script
The system SHALL provide a one-time seed script that reads `data/blog.json` and inserts all posts into the Postgres `posts` table. The script SHALL create the table if it does not exist.

#### Scenario: Seed script run on empty database
- **WHEN** `node scripts/seed-db.js` is executed against an empty database
- **THEN** the script SHALL create the `posts` table with indexes
- **AND** SHALL insert all posts from `data/blog.json`
- **AND** SHALL report the number of posts migrated

#### Scenario: Seed script run on populated database
- **WHEN** `node scripts/seed-db.js` is executed against a database with existing posts
- **THEN** the script SHALL upsert posts (update if slug exists, insert if new)
- **AND** SHALL NOT create duplicate rows

### Requirement: Frontend import paths remain stable
The system SHALL maintain `src/lib/blog.js` as the public import path. The module SHALL re-export all functions from the repository module so that existing imports (`import { getAllPosts } from '@/lib/blog'`) continue to work without modification.

#### Scenario: Frontend page imports blog functions
- **WHEN** `app/blog/page.jsx` imports `getAllPosts` from `@/lib/blog`
- **THEN** the import SHALL resolve to the Postgres-backed repository implementation
- **AND** the function signature SHALL remain `getAllPosts({ publishedOnly } = {})`
