/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'hostizzy.com', '*.vercel.app'],
    },
  },
  async redirects() {
    return [
      { source: '/our-story', destination: '/about', permanent: true },
      { source: '/our-story/', destination: '/about', permanent: true },
      { source: '/plans-pricing', destination: '/services', permanent: true },
      { source: '/plans-pricing/', destination: '/services', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/contact-us/', destination: '/contact', permanent: true },
      { source: '/host-academy', destination: '/training', permanent: true },
      { source: '/host-academy/', destination: '/training', permanent: true },
    ];
  },
}

export default nextConfig
