// Re-export from the Postgres-backed repository.
// This file exists to preserve import paths — frontend pages and API routes
// import from '@/lib/blog'. The actual implementation lives in blog-repository.js.
export {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  slugify,
} from './blog-repository';
