# Blog API Documentation

Base URL: `https://your-domain.com/api/blog` (or `http://localhost:3000/api/blog` in development)

## Authentication

All write operations (POST, PUT, DELETE) require the `X-Blog-Secret` header.

```
X-Blog-Secret: <your-secret>
```

The secret is configured via the `BLOG_WRITE_SECRET` environment variable. Requests without a valid secret receive `401 Unauthorized`.

Read operations (GET) are public — no authentication required.

---

## Endpoints

### List All Posts

```
GET /api/blog
```

Returns all published posts, sorted by date (newest first).

**Response:** `200 OK`
```json
[
  {
    "id": "post-1730462400000",
    "slug": "bathroom-grab-bars-placement-guide",
    "title": "Where to Install Grab Bars: A Room-by-Room Guide",
    "excerpt": "Grab bars are the single highest-ROI accessibility upgrade...",
    "content": "## Why Grab Bars Matter\n\n...",
    "category": "home-accessibility-tips",
    "tags": ["grab-bars", "bathroom-safety"],
    "author": "Outlive Homes",
    "coverImage": "/assets/grab-bars-handrails.jpg",
    "published": true,
    "publishedAt": "2025-11-01T12:00:00.000Z",
    "updatedAt": "2025-11-01T12:00:00.000Z",
    "seo": {
      "metaTitle": "Grab Bar Placement Guide | Outlive Homes",
      "metaDescription": "Learn exactly where to install grab bars..."
    }
  }
]
```

---

### Get a Single Post

```
GET /api/blog/:slug
```

Returns a single published post by its URL slug.

**Response:** `200 OK` — post object (same shape as above)
**Response:** `404 Not Found` — `{ "error": "Not found" }`

---

### Create a Post

```
POST /api/blog
X-Blog-Secret: <secret>
Content-Type: application/json
```

**Required fields:**
| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Post title |
| `content` | string | Post body in Markdown format |

**Optional fields:**
| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `slug` | string | auto-generated from title | URL slug (lowercase, hyphens) |
| `excerpt` | string | `""` | Short summary for cards and SEO |
| `category` | string | `"company-news"` | One of: `home-accessibility-tips`, `project-showcases`, `company-news` |
| `tags` | string[] | `[]` | Array of tag strings |
| `author` | string | `"Outlive Homes"` | Author name |
| `coverImage` | string | `null` | Path to cover image (e.g., `/assets/image.jpg`) |
| `published` | boolean | `true` | Set to `false` to create a draft |
| `publishedAt` | string | current time | ISO 8601 date string |
| `seo` | object | `null` | `{ "metaTitle": "...", "metaDescription": "..." }` |

**Example request:**
```bash
curl -X POST https://your-domain.com/api/blog \
  -H "Content-Type: application/json" \
  -H "X-Blog-Secret: your-secret" \
  -d '{
    "title": "5 Bathroom Safety Upgrades Under $500",
    "content": "## Introduction\n\nYou don'\''t need a full remodel to make your bathroom safer...",
    "excerpt": "Budget-friendly bathroom safety improvements that make a real difference.",
    "category": "home-accessibility-tips",
    "tags": ["bathroom", "budget", "safety"],
    "coverImage": "/assets/bathroom-accessible.jpg",
    "seo": {
      "metaTitle": "5 Bathroom Safety Upgrades Under $500 | Outlive Homes",
      "metaDescription": "Budget-friendly bathroom safety improvements for aging in place."
    }
  }'
```

**Response:** `201 Created` — full post object with generated `id`, `slug`, `publishedAt`, `updatedAt`
**Response:** `400 Bad Request` — `{ "error": "title and content are required" }`
**Response:** `401 Unauthorized` — `{ "error": "Unauthorized" }`
**Response:** `409 Conflict` — `{ "error": "Post with slug \"...\" already exists" }`

---

### Update a Post

```
PUT /api/blog/:slug
X-Blog-Secret: <secret>
Content-Type: application/json
```

Send only the fields you want to update. The `slug` and `id` cannot be changed.

**Example — update title and content:**
```bash
curl -X PUT https://your-domain.com/api/blog/bathroom-grab-bars-placement-guide \
  -H "Content-Type: application/json" \
  -H "X-Blog-Secret: your-secret" \
  -d '{
    "title": "Updated: Where to Install Grab Bars",
    "content": "## Updated content here..."
  }'
```

**Response:** `200 OK` — updated post object
**Response:** `401 Unauthorized` — `{ "error": "Unauthorized" }`
**Response:** `404 Not Found` — `{ "error": "Not found" }`

---

### Delete a Post

```
DELETE /api/blog/:slug
X-Blog-Secret: <secret>
```

**Example:**
```bash
curl -X DELETE https://your-domain.com/api/blog/some-post-slug \
  -H "X-Blog-Secret: your-secret"
```

**Response:** `200 OK` — `{ "ok": true }`
**Response:** `401 Unauthorized` — `{ "error": "Unauthorized" }`
**Response:** `404 Not Found` — `{ "error": "Not found" }`

---

## Content Format

Blog post content uses **Markdown** (rendered by `react-markdown`). Supported syntax:

- Headings: `## H2`, `### H3`, etc.
- Bold: `**text**`
- Italic: `*text*`
- Links: `[text](url)`
- Lists: `- item` or `1. item`
- Images: `![alt](url)` (use paths like `/assets/image.jpg`)
- Code blocks: triple backticks

---

## Categories

| Value | Display Label |
|-------|---------------|
| `home-accessibility-tips` | Accessibility Tips |
| `project-showcases` | Project Showcase |
| `company-news` | Company News |

---

## Caching and Revalidation

- Blog pages are cached with a 1-hour revalidation window
- All write operations (POST, PUT, DELETE) trigger immediate cache invalidation
- New posts appear on the site within seconds of API creation

---

## CORS

All endpoints include CORS headers allowing cross-origin requests. This means external agents and applications can call the API directly.

---

## Error Responses

All errors return JSON:
```json
{
  "error": "Human-readable error message"
}
```

| Status | Meaning |
|--------|---------|
| `400` | Bad request (invalid JSON, missing required fields) |
| `401` | Unauthorized (missing or wrong `X-Blog-Secret`) |
| `404` | Post not found |
| `409` | Conflict (duplicate slug) |
| `500` | Server error |
