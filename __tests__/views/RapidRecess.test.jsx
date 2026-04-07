import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...filterProps(props)}>{children}</div>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Filter out framer-motion-specific props
function filterProps(props) {
  const {
    initial, animate, exit, variants, whileInView, viewport,
    custom, whileHover, whileTap, transition, layout, ...rest
  } = props;
  return rest;
}

// Mock LeadCaptureForm
vi.mock('@/components/LeadCaptureForm', () => ({
  default: ({ source }) => <div data-testid="lead-form" data-source={source} />,
}));

import RapidRecess from '@/views/RapidRecess';

describe('RapidRecess', () => {
  it('renders without crashing', () => {
    render(<RapidRecess />);
    expect(screen.getByText(/Barrier-Free Showers/)).toBeInTheDocument();
  });

  it('renders all 9 section headings', () => {
    render(<RapidRecess />);

    // Hero
    expect(screen.getByText('Our Shower Technology Partner')).toBeInTheDocument();
    // Why RR
    expect(screen.getByText('Why Rapid Recess')).toBeInTheDocument();
    // Specs
    expect(screen.getByText('Technical Specifications')).toBeInTheDocument();
    // Video
    expect(screen.getByText('Installation Process')).toBeInTheDocument();
    // Gallery
    expect(screen.getByText(/Before & After/)).toBeInTheDocument();
    // Benefits
    expect(screen.getByText('What This Means for You')).toBeInTheDocument();
    // CTA
    expect(screen.getByText('Ready to Transform Your Bathroom?')).toBeInTheDocument();
  });

  it('renders LeadCaptureForm with correct source', () => {
    render(<RapidRecess />);
    const form = screen.getByTestId('lead-form');
    expect(form).toHaveAttribute('data-source', 'partner-rapid-recess');
  });

  it('renders credential badges', () => {
    render(<RapidRecess />);
    expect(screen.getByText('30+ Years Experience')).toBeInTheDocument();
    expect(screen.getByText('ICC Code Compliant')).toBeInTheDocument();
    expect(screen.getByText('ADA Compliant')).toBeInTheDocument();
    expect(screen.getByText('Made in USA')).toBeInTheDocument();
  });

  it('renders benefits list', () => {
    render(<RapidRecess />);
    expect(screen.getByText(/No step-over threshold/)).toBeInTheDocument();
    expect(screen.getByText(/Installs without structural demolition/)).toBeInTheDocument();
    expect(screen.getByText(/ADA-compliant and code-approved/)).toBeInTheDocument();
  });
});
