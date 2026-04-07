import { checkPartnerAuth } from '@/lib/partner-auth';
import AIPRContent from './aipr-content';
import PartnerGate from '@/components/PartnerGate';

export function generateMetadata() {
  return {
    title: 'Los Angeles Operations | AIPR Partnership | Outlive Homes',
    description:
      'Aging-in-Place Remodeling is Outlive Homes\' founding partner in Los Angeles. 30 years of experience, CAPS certified, CSLB licensed, NAHB award winner.',
    robots: { index: false, follow: false },
  };
}

export default async function AIPRPage() {
  const { requiresAuth } = await checkPartnerAuth('aipr');

  if (requiresAuth) {
    return <PartnerGate slug="aipr" />;
  }

  return <AIPRContent />;
}
