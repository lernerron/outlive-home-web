import { unstable_cache } from 'next/cache';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import PostContent from './post-content';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seo?.metaTitle || `${post.title} | Outlive Homes`,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: post.coverImage ? [post.coverImage] : [],
      publishedTime: post.publishedAt,
    },
  };
}

const getCachedPost = (slug) =>
  unstable_cache(
    () => getPostBySlug(slug),
    [`blog-post-${slug}`],
    { tags: ['blog'], revalidate: 3600 }
  )();

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getCachedPost(slug);
  if (!post || !post.published) notFound();
  return <PostContent post={post} />;
}
