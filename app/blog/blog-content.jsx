"use client";

import Layout from '@/components/Layout';
import BlogIndex from '@/views/BlogIndex';

export default function BlogContent({ posts }) {
  return (
    <Layout>
      <BlogIndex posts={posts} />
    </Layout>
  );
}
