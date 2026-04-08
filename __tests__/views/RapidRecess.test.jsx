import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...filterProps(props)}>{children}</div>,
  },
  AnimatePresence: ({ children }) => children,
  useInView: () => true,
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

import RapidRecess from '@/views/RapidRecess';

describe('RapidRecess', () => {
  it('renders without crashing', () => {
    render(<RapidRecess />);
    expect(screen.getByText(/Barrier-Free Showers/)).toBeInTheDocument();
  });

  it('renders key section headings', () => {
    render(<RapidRecess />);

    expect(screen.getByText('Our Shower Technology Partner')).toBeInTheDocument();
    expect(screen.getByText('Why Rapid Recess')).toBeInTheDocument();
    expect(screen.getByText('Slip Resistance That Sets the Standard')).toBeInTheDocument();
    expect(screen.getByText('Product Features')).toBeInTheDocument();
    expect(screen.getByText('Trusted by the Best')).toBeInTheDocument();
    expect(screen.getByText('Installation Process')).toBeInTheDocument();
    expect(screen.getByText(/Before & After/)).toBeInTheDocument();
    expect(screen.getByText('What This Means for You')).toBeInTheDocument();
    expect(screen.getByText('Ready to Transform Your Bathroom?')).toBeInTheDocument();
  });

  it('renders LeadCaptureForm with correct source', () => {
    render(<RapidRecess />);
    const form = screen.getByTestId('lead-form');
    expect(form).toHaveAttribute('data-source', 'partner-rapid-recess');
  });

  it('renders updated credential badges', () => {
    render(<RapidRecess />);
    expect(screen.getByText('30+ Years Experience')).toBeInTheDocument();
    expect(screen.getByText('Hilton Preferred Vendor')).toBeInTheDocument();
    expect(screen.getByText('250,000+ Showers Installed')).toBeInTheDocument();
    expect(screen.getByText('Made in USA')).toBeInTheDocument();
  });

  it('renders real Josef quote', () => {
    render(<RapidRecess />);
    expect(screen.getByText(/grandma's house/)).toBeInTheDocument();
    expect(screen.getByText(/Josef Erlebach, Co-Founder/)).toBeInTheDocument();
  });

  it('renders safety section with DCOF data', () => {
    render(<RapidRecess />);
    expect(screen.getByText('Rapid Recess')).toBeInTheDocument();
    expect(screen.getByText('Industry Minimum')).toBeInTheDocument();
    expect(screen.getByText(/Nearly double the industry standard/)).toBeInTheDocument();
  });

  it('renders updated benefits', () => {
    render(<RapidRecess />);
    expect(screen.getByText(/Slip resistance nearly double/)).toBeInTheDocument();
    expect(screen.getByText(/Safety grab bars built into/)).toBeInTheDocument();
    expect(screen.getByText(/Antimicrobial surface/)).toBeInTheDocument();
  });

  it('renders trust proof stats', () => {
    render(<RapidRecess />);
    expect(screen.getByText('Hilton')).toBeInTheDocument();
    expect(screen.getByText('250K+')).toBeInTheDocument();
    expect(screen.getByText('2008')).toBeInTheDocument();
  });

  it('renders origin story content', () => {
    render(<RapidRecess />);
    expect(screen.getByText(/Barbara broke her leg/)).toBeInTheDocument();
    expect(screen.getByText(/first linear drain/)).toBeInTheDocument();
  });
});
