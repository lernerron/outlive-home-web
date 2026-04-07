import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: vi.fn(),
    push: vi.fn(),
  }),
}));

import PartnerGate from '@/components/PartnerGate';

describe('PartnerGate', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn();
  });

  it('renders the branded gate form', () => {
    render(<PartnerGate slug="rapid-recess" />);

    expect(screen.getByText('Partner Preview')).toBeInTheDocument();
    expect(screen.getByText('Enter your access code to view this page.')).toBeInTheDocument();
    expect(screen.getByLabelText('Access Code')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
  });

  it('shows error message on incorrect password', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 401 });

    render(<PartnerGate slug="rapid-recess" />);

    const input = screen.getByLabelText('Access Code');
    const button = screen.getByRole('button', { name: 'Continue' });

    fireEvent.change(input, { target: { value: 'wrong' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Incorrect password')).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    // Never resolve to keep loading state
    global.fetch.mockReturnValue(new Promise(() => {}));

    render(<PartnerGate slug="rapid-recess" />);

    const input = screen.getByLabelText('Access Code');
    const button = screen.getByRole('button', { name: 'Continue' });

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Checking...')).toBeInTheDocument();
    });
  });
});
