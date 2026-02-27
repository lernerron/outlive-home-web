"use client";

import ReactMarkdown from 'react-markdown';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CATEGORY_LABELS = {
  'home-accessibility-tips': 'Accessibility Tips',
  'project-showcases': 'Project Showcase',
  'company-news': 'Company News',
};

export default function BlogPost({ post }) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="mb-8 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Blog
          </Button>
        </Link>

        <div className="flex items-center gap-2 flex-wrap mb-4">
          <Badge variant="secondary">
            {CATEGORY_LABELS[post.category] || post.category}
          </Badge>
          {post.tags?.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          {post.title}
        </h1>

        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
          <span>{post.author}</span>
          <span>&middot;</span>
          <span>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>
        </div>

        {post.coverImage && (
          <div className="mt-8 aspect-video overflow-hidden rounded-xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="mt-10 prose prose-lg prose-blue max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </motion.article>
  );
}
