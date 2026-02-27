"use client";

import Layout from '@/components/Layout';
import BlogPost from '@/views/BlogPost';

export default function PostContent({ post }) {
  return (
    <Layout>
      <BlogPost post={post} />
    </Layout>
  );
}
