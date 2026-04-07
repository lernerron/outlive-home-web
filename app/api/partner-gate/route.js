import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  const { slug, password } = body;

  if (!slug || !password) {
    return NextResponse.json({ error: 'Missing slug or password' }, { status: 400 });
  }

  if (!SLUG_PATTERN.test(slug)) {
    return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 });
  }

  const envKey = `PARTNER_PW_${slug.toUpperCase().replace(/-/g, '_')}`;
  const expectedPassword = process.env[envKey];

  if (!expectedPassword) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const a = Buffer.from(password);
  const b = Buffer.from(expectedPassword);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(`partner-auth-${slug}`, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: `/partners/${slug}`,
  });

  return response;
}
