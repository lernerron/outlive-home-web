"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const CATEGORY_LABELS = {
  'home-accessibility-tips': 'Accessibility Tips',
  'project-showcases': 'Project Showcase',
  'company-news': 'Company News',
};

export default function BlogIndex({ posts }) {
  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Blog
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Home accessibility tips, project showcases, and news from Outlive
            Homes.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="mt-12 text-gray-500">No posts yet. Check back soon.</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                    {post.coverImage && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary">
                          {CATEGORY_LABELS[post.category] || post.category}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900 mt-2 leading-snug">
                        {post.title}
                      </h2>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
