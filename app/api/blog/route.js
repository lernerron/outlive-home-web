import { revalidateTag } from 'next/cache';
import { getAllPosts, createPost } from '@/lib/blog';

function corsHeaders(origin = '*') {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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

export async function GET() {
  const headers = corsHeaders();
  try {
    const posts = await getAllPosts();
    return new Response(JSON.stringify(posts), { status: 200, headers });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to load posts', details: error?.message }),
      { status: 500, headers }
    );
  }
}

export async function POST(request) {
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

  if (!body?.title || !body?.content) {
    return new Response(
      JSON.stringify({ error: 'title and content are required' }),
      { status: 400, headers }
    );
  }

  try {
    const post = await createPost(body);
    revalidateTag('blog');
    return new Response(JSON.stringify(post), { status: 201, headers });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 409, headers }
    );
  }
}
