import { revalidateTag } from 'next/cache';
import { getAllPosts, createPost } from '@/lib/blog';
import { CreatePostSchema } from '@/lib/blog-schema';
import {
  corsHeaders,
  isAuthorized,
  jsonResponse,
  errorResponse,
} from '@/lib/api-helpers';

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function GET() {
  try {
    const posts = await getAllPosts();
    return jsonResponse(posts);
  } catch (error) {
    return errorResponse(`Failed to load posts: ${error?.message}`, 500);
  }
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return errorResponse('Unauthorized', 401);
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return errorResponse('Invalid JSON body', 400);
  }

  const result = CreatePostSchema.safeParse(body);
  if (!result.success) {
    return errorResponse(result.error.issues[0].message, 400);
  }

  try {
    const post = await createPost(result.data);
    revalidateTag('blog');
    return jsonResponse(post, 201);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}
