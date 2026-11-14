/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Only the hosts the site actually serves images from. A '**' wildcard let
    // the optimiser fetch any URL on the internet at our cost.
    remotePatterns: [
      { protocol: 'https', hostname: 'ik.imagekit.io' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.hostizzy.com' },
    ],
    unoptimized: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'hostizzy.com', 'www.hostizzy.com', '*.vercel.app'],
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
      // HostOS was renamed HostSuite (Nov 2026). The product domain stays hostos.hostizzy.com.
      { source: '/products/hostos', destination: '/products/hostsuite', permanent: true },
      // The admin panel is gone: leads are worked in HostSuite now.
      { source: '/admin', destination: 'https://hostos.hostizzy.com', permanent: false },
      { source: '/admin/:path*', destination: 'https://hostos.hostizzy.com', permanent: false },
      { source: '/products/hostos/', destination: '/products/hostsuite', permanent: true },
    ];
  },
}

export default nextConfig
