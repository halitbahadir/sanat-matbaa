/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Hostinger için optimize edilmiş build
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Production optimizasyonları
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

module.exports = nextConfig;
