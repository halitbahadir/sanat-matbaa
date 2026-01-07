/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note:
  // - Vercel deploy'larında custom server.js kullanılmaz (Next.js native).
  // - Hostinger'da yaşanan cache/chunk problemlerini azaltmak için eklenen "fixed build id"
  //   Vercel CDN'de ters etki yapabilir (aynı path altında eski chunk cache'leri kalabilir).
  
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
