import path from 'path';
import fs from 'fs/promises';

const BLOG_FILE = path.resolve(process.cwd(), 'data/blog.json');

export async function getAllPosts({ publishedOnly = true } = {}) {
  const raw = await fs.readFile(BLOG_FILE, 'utf8');
  const posts = JSON.parse(raw);
  const filtered = publishedOnly ? posts.filter((p) => p.published) : posts;
  return filtered.sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );
}

export async function getPostBySlug(slug) {
  const posts = await getAllPosts({ publishedOnly: false });
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function createPost(data) {
  const posts = await getAllPosts({ publishedOnly: false });
  const slug = data.slug || slugify(data.title);

  if (posts.find((p) => p.slug === slug)) {
    throw new Error(`Post with slug "${slug}" already exists`);
  }

  const now = new Date().toISOString();
  const post = {
    id: `post-${Date.now()}`,
    slug,
    title: data.title,
    excerpt: data.excerpt || '',
    content: data.content,
    category: data.category || 'company-news',
    tags: data.tags || [],
    author: data.author || 'Outlive Homes',
    coverImage: data.coverImage || null,
    published: data.published !== false,
    publishedAt: data.publishedAt || now,
    updatedAt: now,
    seo: data.seo || null,
  };

  posts.push(post);
  await fs.writeFile(BLOG_FILE, JSON.stringify(posts, null, 2));
  return post;
}

export async function updatePost(slug, data) {
  const posts = await getAllPosts({ publishedOnly: false });
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  posts[index] = {
    ...posts[index],
    ...data,
    slug: posts[index].slug,
    id: posts[index].id,
    updatedAt: new Date().toISOString(),
  };

  await fs.writeFile(BLOG_FILE, JSON.stringify(posts, null, 2));
  return posts[index];
}

export async function deletePost(slug) {
  const posts = await getAllPosts({ publishedOnly: false });
  const next = posts.filter((p) => p.slug !== slug);
  if (next.length === posts.length) return false;
  await fs.writeFile(BLOG_FILE, JSON.stringify(next, null, 2));
  return true;
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
