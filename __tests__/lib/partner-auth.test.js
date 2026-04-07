import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock next/headers
vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

import { checkPartnerAuth } from '@/lib/partner-auth';
import { cookies } from 'next/headers';

describe('checkPartnerAuth', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    // Clear env vars
    delete process.env.PARTNER_PW_RAPID_RECESS;
    delete process.env.PARTNER_PW_KOHLER;
  });

  it('returns requiresAuth: false when no env var exists for slug', async () => {
    const result = await checkPartnerAuth('rapid-recess');
    expect(result).toEqual({ requiresAuth: false });
    // cookies() should NOT be called (fast-path)
    expect(cookies).not.toHaveBeenCalled();
  });

  it('returns requiresAuth: true when password exists but no cookie', async () => {
    process.env.PARTNER_PW_RAPID_RECESS = 'secret123';
    cookies.mockResolvedValue({
      get: vi.fn().mockReturnValue(undefined),
    });

    const result = await checkPartnerAuth('rapid-recess');
    expect(result).toEqual({ requiresAuth: true });
  });

  it('returns requiresAuth: true when cookie value does not match password', async () => {
    process.env.PARTNER_PW_RAPID_RECESS = 'secret123';
    cookies.mockResolvedValue({
      get: vi.fn().mockReturnValue({ value: 'wrong-password' }),
    });

    const result = await checkPartnerAuth('rapid-recess');
    expect(result).toEqual({ requiresAuth: true });
  });

  it('returns requiresAuth: false when cookie value matches password', async () => {
    process.env.PARTNER_PW_RAPID_RECESS = 'secret123';
    cookies.mockResolvedValue({
      get: vi.fn().mockReturnValue({ value: 'secret123' }),
    });

    const result = await checkPartnerAuth('rapid-recess');
    expect(result).toEqual({ requiresAuth: false });
  });

  it('converts slug with hyphens to uppercase env var name', async () => {
    process.env.PARTNER_PW_RAPID_RECESS = 'pw';
    cookies.mockResolvedValue({
      get: vi.fn().mockReturnValue({ value: 'pw' }),
    });

    const result = await checkPartnerAuth('rapid-recess');
    expect(result).toEqual({ requiresAuth: false });
  });

  it('handles different partner slugs independently', async () => {
    process.env.PARTNER_PW_KOHLER = 'kohler-pw';
    cookies.mockResolvedValue({
      get: vi.fn().mockReturnValue(undefined),
    });

    const result = await checkPartnerAuth('kohler');
    expect(result).toEqual({ requiresAuth: true });

    // rapid-recess has no password set, should be public
    const rrResult = await checkPartnerAuth('rapid-recess');
    expect(rrResult).toEqual({ requiresAuth: false });
  });
});
