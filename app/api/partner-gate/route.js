import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  const { slug, password } = body;

  if (!slug || !password) {
    return NextResponse.json({ error: 'Missing slug or password' }, { status: 400 });
  }

  const envKey = `PARTNER_PW_${slug.toUpperCase().replace(/-/g, '_')}`;
  const expectedPassword = process.env[envKey];

  if (!expectedPassword || password !== expectedPassword) {
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
