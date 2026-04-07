import { cookies } from 'next/headers';

/**
 * Check if a partner page requires authentication.
 * Uses individual env vars per partner: PARTNER_PW_RAPID_RECESS, PARTNER_PW_KOHLER, etc.
 * Fast-path: if no env var exists for the slug, skips cookies() call entirely
 * so the page can be statically generated.
 */
export async function checkPartnerAuth(slug) {
  const envKey = `PARTNER_PW_${slug.toUpperCase().replace(/-/g, '_')}`;
  const password = process.env[envKey];

  // Fast-path: no password configured, page is public
  if (!password) {
    return { requiresAuth: false };
  }

  // Password exists, check cookie (forces dynamic rendering)
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(`partner-auth-${slug}`);

  if (authCookie && authCookie.value === password) {
    return { requiresAuth: false };
  }

  return { requiresAuth: true };
}
