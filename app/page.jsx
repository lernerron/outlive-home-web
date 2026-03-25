import HomeContent from './home-content';

export const metadata = {
  title: 'Outlive Homes | Bathroom Safety Solutions for Aging in Place',
  description:
    'Barrier-free shower conversions installed in days, not months. Get a free in-home assessment for safe, elegant, independent living. Licensed, insured, CAPS certified.',
  openGraph: {
    title: 'Outlive Homes | Bathroom Safety Solutions for Aging in Place',
    description:
      'Barrier-free shower conversions installed in days, not months. Free in-home assessment for adults 65+.',
    type: 'website',
  },
};

export default function HomePage() {
  return <HomeContent />;
}
