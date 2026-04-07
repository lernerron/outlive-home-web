"use client";

import Layout from '@/components/Layout';
import AIPR from '@/views/AIPR';

export default function AIPRContent() {
  return (
    <Layout headerVariant="solid" bannerPreset={false}>
      <AIPR />
    </Layout>
  );
}
