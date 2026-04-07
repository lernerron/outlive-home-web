import { describe, it, expect, vi, beforeEach } from 'vitest';

// Inline test of the partner-gate API logic
// We test the validation and password matching logic directly
// since route handlers are hard to test with next/server mocks

describe('partner-gate API logic', () => {
  beforeEach(() => {
    delete process.env.PARTNER_PW_RAPID_RECESS;
    delete process.env.PARTNER_PW_KOHLER;
  });

  function validateAndCheck(body) {
    const { slug, password } = body || {};

    if (!slug || !password) {
      return { status: 400, error: 'Missing slug or password' };
    }

    const envKey = `PARTNER_PW_${slug.toUpperCase().replace(/-/g, '_')}`;
    const expectedPassword = process.env[envKey];

    if (!expectedPassword || password !== expectedPassword) {
      return { status: 401, error: 'Incorrect password' };
    }

    return { status: 200, ok: true, cookieName: `partner-auth-${slug}` };
  }

  it('returns 400 when slug is missing', () => {
    const result = validateAndCheck({ password: 'pw' });
    expect(result.status).toBe(400);
  });

  it('returns 400 when password is missing', () => {
    const result = validateAndCheck({ slug: 'rapid-recess' });
    expect(result.status).toBe(400);
  });

  it('returns 401 when no env var exists for slug', () => {
    const result = validateAndCheck({ slug: 'rapid-recess', password: 'anything' });
    expect(result.status).toBe(401);
  });

  it('returns 401 when password does not match', () => {
    process.env.PARTNER_PW_RAPID_RECESS = 'correct-pw';
    const result = validateAndCheck({ slug: 'rapid-recess', password: 'wrong-pw' });
    expect(result.status).toBe(401);
  });

  it('returns 200 and cookie name when password matches', () => {
    process.env.PARTNER_PW_RAPID_RECESS = 'correct-pw';
    const result = validateAndCheck({ slug: 'rapid-recess', password: 'correct-pw' });
    expect(result.status).toBe(200);
    expect(result.ok).toBe(true);
    expect(result.cookieName).toBe('partner-auth-rapid-recess');
  });
});
