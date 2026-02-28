import { neon } from '@neondatabase/serverless';

function getDb() {
  const sql = neon(process.env.DATABASE_URL);
  return sql;
}

// DB snake_case → API camelCase
function rowToPost(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    tags: row.tags || [],
    author: row.author,
    coverImage: row.cover_image,
    published: row.published,
    publishedAt: row.published_at
      ? new Date(row.published_at).toISOString()
      : null,
    updatedAt: row.updated_at
      ? new Date(row.updated_at).toISOString()
      : null,
    seo: {
      metaTitle: row.seo_meta_title || null,
      metaDescription: row.seo_meta_description || null,
    },
  };
}

export async function getAllPosts({ publishedOnly = true } = {}) {
  const sql = getDb();
  const rows = publishedOnly
    ? await sql`SELECT * FROM posts WHERE published = true ORDER BY published_at DESC`
    : await sql`SELECT * FROM posts ORDER BY published_at DESC`;
  return rows.map(rowToPost);
}

export async function getPostBySlug(slug) {
  const sql = getDb();
  const rows = await sql`SELECT * FROM posts WHERE slug = ${slug} LIMIT 1`;
  return rows[0] ? rowToPost(rows[0]) : null;
}

export async function createPost(data) {
  const sql = getDb();
  const id = `post-${Date.now()}`;
  const slug = data.slug || slugify(data.title);
  const now = new Date().toISOString();
  const tags = data.tags || [];

  const rows = await sql`
    INSERT INTO posts (
      id, slug, title, excerpt, content, category, tags, author,
      cover_image, published, published_at, updated_at,
      seo_meta_title, seo_meta_description
    ) VALUES (
      ${id}, ${slug}, ${data.title}, ${data.excerpt || ''},
      ${data.content || ''}, ${data.category || 'company-news'},
      ${tags}, ${data.author || 'Outlive Homes'},
      ${data.coverImage || null}, ${data.published !== false},
      ${data.publishedAt || now}, ${now},
      ${data.seo?.metaTitle || null}, ${data.seo?.metaDescription || null}
    )
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      content = EXCLUDED.content,
      excerpt = EXCLUDED.excerpt,
      category = EXCLUDED.category,
      tags = EXCLUDED.tags,
      author = EXCLUDED.author,
      cover_image = EXCLUDED.cover_image,
      published = EXCLUDED.published,
      updated_at = EXCLUDED.updated_at,
      seo_meta_title = EXCLUDED.seo_meta_title,
      seo_meta_description = EXCLUDED.seo_meta_description
    RETURNING *
  `;

  return rowToPost(rows[0]);
}

export async function updatePost(slug, data) {
  const sql = getDb();

  // Fetch current post to merge
  const existing = await sql`SELECT * FROM posts WHERE slug = ${slug} LIMIT 1`;
  if (!existing[0]) return null;

  const now = new Date().toISOString();
  const merged = {
    title: data.title ?? existing[0].title,
    excerpt: data.excerpt ?? existing[0].excerpt,
    content: data.content ?? existing[0].content,
    category: data.category ?? existing[0].category,
    tags: data.tags ?? existing[0].tags,
    author: data.author ?? existing[0].author,
    cover_image: data.coverImage ?? existing[0].cover_image,
    published: data.published ?? existing[0].published,
    seo_meta_title: data.seo?.metaTitle ?? existing[0].seo_meta_title,
    seo_meta_description:
      data.seo?.metaDescription ?? existing[0].seo_meta_description,
  };

  const rows = await sql`
    UPDATE posts SET
      title = ${merged.title},
      excerpt = ${merged.excerpt},
      content = ${merged.content},
      category = ${merged.category},
      tags = ${merged.tags},
      author = ${merged.author},
      cover_image = ${merged.cover_image},
      published = ${merged.published},
      seo_meta_title = ${merged.seo_meta_title},
      seo_meta_description = ${merged.seo_meta_description},
      updated_at = ${now}
    WHERE slug = ${slug}
    RETURNING *
  `;

  return rows[0] ? rowToPost(rows[0]) : null;
}

export async function deletePost(slug) {
  const sql = getDb();
  const rows = await sql`DELETE FROM posts WHERE slug = ${slug} RETURNING id`;
  return rows.length > 0;
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
