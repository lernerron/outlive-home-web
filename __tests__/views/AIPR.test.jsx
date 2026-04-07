import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...filterProps(props)}>{children}</div>,
  },
  AnimatePresence: ({ children }) => children,
}));

function filterProps(props) {
  const {
    initial, animate, exit, variants, whileInView, viewport,
    custom, whileHover, whileTap, transition, layout, ...rest
  } = props;
  return rest;
}

vi.mock('@/components/LeadCaptureForm', () => ({
  default: ({ source }) => <div data-testid="lead-form" data-source={source} />,
}));

import AIPR from '@/views/AIPR';

describe('AIPR', () => {
  it('renders without crashing', () => {
    render(<AIPR />);
    expect(screen.getByText(/30 Years of Expertise/)).toBeInTheDocument();
  });

  it('renders all section headings', () => {
    render(<AIPR />);

    expect(screen.getByText('Our Los Angeles Founding Partner')).toBeInTheDocument();
    expect(screen.getByText('Tyler Owen')).toBeInTheDocument();
    expect(screen.getByText('Services in Los Angeles')).toBeInTheDocument();
    expect(screen.getByText('Home Elevators, Without the Shaft')).toBeInTheDocument();
    expect(screen.getByText(/Built in Partnership/)).toBeInTheDocument();
    expect(screen.getByText('Project Gallery')).toBeInTheDocument();
    expect(screen.getByText('Serving the Los Angeles Metro Area')).toBeInTheDocument();
    expect(screen.getByText('The Outlive + AIPR Difference')).toBeInTheDocument();
    expect(screen.getByText('Ready to Make Your LA Home Accessible?')).toBeInTheDocument();
  });

  it('renders LeadCaptureForm with correct source', () => {
    render(<AIPR />);
    const form = screen.getByTestId('lead-form');
    expect(form).toHaveAttribute('data-source', 'partner-aipr');
  });

  it('renders credential badges', () => {
    render(<AIPR />);
    expect(screen.getByText('CSLB #807715')).toBeInTheDocument();
    expect(screen.getByText('30 Years Experience')).toBeInTheDocument();
    expect(screen.getByText('CAPS Certified (NAHB)')).toBeInTheDocument();
    expect(screen.getByText('#1 Stiltz Dealer')).toBeInTheDocument();
  });

  it('renders all 8 services', () => {
    render(<AIPR />);
    expect(screen.getByText('Accessible Showers & Bathrooms')).toBeInTheDocument();
    expect(screen.getByText('Platform Lifts & Elevators')).toBeInTheDocument();
    expect(screen.getByText('Ramps')).toBeInTheDocument();
    expect(screen.getByText('Grab Bars & Handrails')).toBeInTheDocument();
    expect(screen.getByText('Stair Lifts')).toBeInTheDocument();
    expect(screen.getByText('Door Modifications')).toBeInTheDocument();
    expect(screen.getByText('Ceiling Lifts')).toBeInTheDocument();
    expect(screen.getByText('Walk-in Bathtubs')).toBeInTheDocument();
  });

  it('renders benefits list', () => {
    render(<AIPR />);
    expect(screen.getByText(/One team handles everything/)).toBeInTheDocument();
    expect(screen.getByText(/30 years of aging-in-place expertise/)).toBeInTheDocument();
    expect(screen.getByText(/Licensed, insured, and award-winning/)).toBeInTheDocument();
  });

  it('renders AIPR referral link', () => {
    render(<AIPR />);
    const link = screen.getByRole('link', { name: /Aging-in-Place Remodeling/i });
    expect(link).toHaveAttribute('href', 'https://www.aipremodeling.com');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
