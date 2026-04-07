import { checkPartnerAuth } from '@/lib/partner-auth';
import RapidRecessContent from './rapid-recess-content';
import PartnerGate from '@/components/PartnerGate';

export function generateMetadata() {
  return {
    title: 'Our Shower Technology | Rapid Recess Partnership | Outlive Homes',
    description:
      'Outlive Homes partners with Rapid Recess for barrier-free curbless shower installations. 30+ years of expertise, ICC code compliant, ADA compliant, Made in USA.',
    robots: { index: false, follow: false },
  };
}

export default async function RapidRecessPage() {
  const { requiresAuth } = await checkPartnerAuth('rapid-recess');

  if (requiresAuth) {
    return <PartnerGate slug="rapid-recess" />;
  }

  return <RapidRecessContent />;
}
