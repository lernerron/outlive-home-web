/**
 * One-time migration: reads data/blog.json and inserts posts into Vercel Postgres.
 *
 * Usage: node scripts/seed-db.js
 * Requires: DATABASE_URL env var (set in .env.local via `vercel env pull`)
 *
 * Safe to re-run — uses upsert (ON CONFLICT DO UPDATE) so duplicates are updated.
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { neon } from '@neondatabase/serverless';

// Run with: node --env-file=.env.local scripts/seed-db.js
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('Missing DATABASE_URL. Run: vercel env pull .env.local');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function seed() {
  // Create table + indexes
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id                   TEXT PRIMARY KEY,
      slug                 TEXT UNIQUE NOT NULL,
      title                TEXT NOT NULL,
      excerpt              TEXT DEFAULT '',
      content              TEXT DEFAULT '',
      category             TEXT DEFAULT 'company-news',
      tags                 TEXT[] DEFAULT '{}',
      author               TEXT DEFAULT 'Outlive Homes',
      cover_image          TEXT,
      published            BOOLEAN DEFAULT true,
      published_at         TIMESTAMPTZ DEFAULT NOW(),
      updated_at           TIMESTAMPTZ DEFAULT NOW(),
      seo_meta_title       TEXT,
      seo_meta_description TEXT
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published, published_at DESC)`;

  console.log('Table and indexes created.');

  // Read existing blog data
  const blogFile = resolve(process.cwd(), 'data/blog.json');
  const posts = JSON.parse(readFileSync(blogFile, 'utf8'));

  let count = 0;
  for (const post of posts) {
    const tags = post.tags || [];

    await sql`
      INSERT INTO posts (
        id, slug, title, excerpt, content, category, tags, author,
        cover_image, published, published_at, updated_at,
        seo_meta_title, seo_meta_description
      ) VALUES (
        ${post.id}, ${post.slug}, ${post.title}, ${post.excerpt || ''},
        ${post.content || ''}, ${post.category || 'company-news'},
        ${tags}, ${post.author || 'Outlive Homes'},
        ${post.coverImage || null}, ${post.published !== false},
        ${post.publishedAt || new Date().toISOString()},
        ${post.updatedAt || new Date().toISOString()},
        ${post.seo?.metaTitle || null}, ${post.seo?.metaDescription || null}
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
    `;
    count++;
    console.log(`  Upserted: ${post.slug}`);
  }

  console.log(`\nDone! ${count} posts migrated to Postgres.`);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
