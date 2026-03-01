import { revalidateTag } from 'next/cache';
import { getPostBySlug, updatePost, deletePost } from '@/lib/blog';
import { UpdatePostSchema } from '@/lib/blog-schema';
import {
  corsHeaders,
  isAuthorized,
  jsonResponse,
  errorResponse,
} from '@/lib/api-helpers';

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    return errorResponse('Not found', 404);
  }

  return jsonResponse(post);
}

export async function PUT(request, { params }) {
  if (!isAuthorized(request)) {
    return errorResponse('Unauthorized', 401);
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return errorResponse('Invalid JSON body', 400);
  }

  const result = UpdatePostSchema.safeParse(body);
  if (!result.success) {
    return errorResponse(result.error.issues[0].message, 400);
  }

  const { slug } = await params;
  const post = await updatePost(slug, result.data);
  if (!post) {
    return errorResponse('Not found', 404);
  }

  revalidateTag('blog');
  return jsonResponse(post);
}

export async function DELETE(request, { params }) {
  if (!isAuthorized(request)) {
    return errorResponse('Unauthorized', 401);
  }

  const { slug } = await params;
  const deleted = await deletePost(slug);
  if (!deleted) {
    return errorResponse('Not found', 404);
  }

  revalidateTag('blog');
  return jsonResponse({ ok: true });
}
