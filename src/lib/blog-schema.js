import { z } from 'zod';

// API contract — what callers (Content OS, admin UI) can send
export const CreatePostSchema = z.object({
  title: z.string().min(1, 'title is required'),
  content: z.string().min(1, 'content is required'),
  excerpt: z.string().optional().default(''),
  slug: z.string().optional(),
  category: z.string().optional().default('company-news'),
  tags: z.array(z.string()).optional().default([]),
  author: z.string().optional().default('Outlive Homes'),
  coverImage: z.string().nullable().optional().default(null),
  published: z.boolean().optional().default(true),
  publishedAt: z.string().optional(),
  seo: z
    .object({
      metaTitle: z.string().nullable().optional(),
      metaDescription: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
});

export const UpdatePostSchema = CreatePostSchema.partial();
