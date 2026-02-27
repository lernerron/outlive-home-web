import { revalidateTag } from 'next/cache';
import { getPostBySlug, updatePost, deletePost } from '@/lib/blog';

function corsHeaders(origin = '*') {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Blog-Secret',
  };
}

function isAuthorized(request) {
  const secret = process.env.BLOG_WRITE_SECRET?.trim();
  if (!secret) return false;
  return request.headers.get('X-Blog-Secret') === secret;
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const headers = corsHeaders();
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { status: 404, headers }
    );
  }

  return new Response(JSON.stringify(post), { status: 200, headers });
}

export async function PUT(request, { params }) {
  const headers = corsHeaders();

  if (!isAuthorized(request)) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON body' }),
      { status: 400, headers }
    );
  }

  const { slug } = await params;
  const post = await updatePost(slug, body);
  if (!post) {
    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { status: 404, headers }
    );
  }

  revalidateTag('blog');
  return new Response(JSON.stringify(post), { status: 200, headers });
}

export async function DELETE(request, { params }) {
  const headers = corsHeaders();

  if (!isAuthorized(request)) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers }
    );
  }

  const { slug } = await params;
  const deleted = await deletePost(slug);
  if (!deleted) {
    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { status: 404, headers }
    );
  }

  revalidateTag('blog');
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
}
