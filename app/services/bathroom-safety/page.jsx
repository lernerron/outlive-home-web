import BathroomSafetyContent from './bathroom-safety-content';

export const metadata = {
  title: 'Bathroom Safety Solutions | Barrier-Free Showers | Outlive Homes',
  description:
    'A safer shower, installed this week. Barrier-free shower conversions, roll-in showers, and complete accessible bathrooms for adults 65+. Licensed, insured, CAPS certified.',
  openGraph: {
    title: 'Bathroom Safety Solutions | Outlive Homes',
    description:
      'Barrier-free shower conversions installed in days, not months. Free in-home assessment for adults 65+.',
    type: 'website',
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Bathroom Safety Solutions',
  description: 'Barrier-free shower conversions, roll-in showers, and complete accessible bathrooms for adults 65+. Installed in days, not months.',
  provider: {
    '@type': 'HomeAndConstructionBusiness',
    name: 'Outlive Homes',
    url: 'https://outlivehome.com',
    areaServed: [
      { '@type': 'State', name: 'Florida' },
      { '@type': 'City', name: 'Los Angeles' },
    ],
  },
  serviceType: 'Bathroom Accessibility Modification',
  offers: {
    '@type': 'Offer',
    price: '15000',
    priceCurrency: 'USD',
    description: 'Barrier-free shower conversions starting at $15,000',
  },
};

export default function BathroomSafetyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <BathroomSafetyContent />
    </>
  );
}
