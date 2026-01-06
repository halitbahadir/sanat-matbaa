/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone mode kaldırıldı - custom server.js kullanıyoruz
  // output: 'standalone', // Custom server.js ile uyumsuz
  
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
  
  // Static dosyalar için optimizasyon
  trailingSlash: false,
};

module.exports = nextConfig;
