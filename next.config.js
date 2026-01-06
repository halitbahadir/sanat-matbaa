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
  
  // Build ID'yi sabit tut (cache sorunlarını önlemek için)
  generateBuildId: async () => {
    // Production'da sabit build ID kullan
    // Bu sayede chunk ID'leri değişmez ve cache sorunları olmaz
    return process.env.NODE_ENV === 'production' 
      ? 'production-build-v1' 
      : null; // Development'ta Next.js otomatik oluştursun
  },
  
  // Webpack yapılandırması - chunk ID'lerini sabit tut
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      // Production client-side'da chunk ID'lerini deterministic yap
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
      };
    }
    return config;
  },
};

module.exports = nextConfig;
