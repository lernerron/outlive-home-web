import { NextResponse } from 'next/server';

/**
 * Password gate middleware — protects the site while in staging.
 * Set SITE_PASSWORD env var to enable. Remove this file to go live.
 *
 * API routes are excluded so external agents can still call /api/*.
 */
export function middleware(request) {
  const password = process.env.SITE_PASSWORD;

  // If no password is set, allow all traffic (disabled)
  if (!password) return NextResponse.next();

  // Skip API routes — agents need unauthenticated access
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Skip the password page itself and static assets
  if (
    request.nextUrl.pathname === '/gate' ||
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.startsWith('/assets/') ||
    request.nextUrl.pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Check for valid auth cookie
  const authCookie = request.cookies.get('site-auth')?.value;
  if (authCookie === password) {
    return NextResponse.next();
  }

  // Redirect to password page
  const url = request.nextUrl.clone();
  url.pathname = '/gate';
  url.searchParams.set('redirect', request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
