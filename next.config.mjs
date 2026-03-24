/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All images served from /assets (local) — no remote patterns needed
    // Add specific hostnames here if you start using a CDN or external images
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: '/testing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/demo',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
