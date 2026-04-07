"use client";

import Layout from '@/components/Layout';
import RapidRecess from '@/views/RapidRecess';

export default function RapidRecessContent() {
  return (
    <Layout headerVariant="solid" bannerPreset={false}>
      <RapidRecess />
    </Layout>
  );
}
