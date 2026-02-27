import { unstable_cache } from 'next/cache';
import { getAllPosts } from '@/lib/blog';
import BlogContent from './blog-content';

const getCachedPosts = unstable_cache(
  () => getAllPosts(),
  ['blog-posts'],
  { tags: ['blog'], revalidate: 3600 }
);

export const metadata = {
  title: 'Blog | Outlive Homes',
  description:
    'Home accessibility tips, project showcases, and company news from Outlive Homes.',
};

export default async function BlogPage() {
  const posts = await getCachedPosts();
  return <BlogContent posts={posts} />;
}
