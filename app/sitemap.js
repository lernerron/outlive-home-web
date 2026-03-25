import { getAllPosts } from '@/lib/blog';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://outlivehome.com';

const staticRoutes = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/services/bathroom-safety', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/partners', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/privacypolicy', changeFrequency: 'yearly', priority: 0.3 },
];

export default async function sitemap() {
  const entries = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Fetch blog post slugs — graceful fallback if DB unavailable
  try {
    const posts = await getAllPosts();
    for (const post of posts) {
      entries.push({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  } catch {
    // DATABASE_URL not set (CI, local dev) — return static routes only
  }

  return entries;
}
