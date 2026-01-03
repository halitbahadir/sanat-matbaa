import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/giris', '/odeme'],
    },
    sitemap: 'https://www.sanmatmatbaasi.com/sitemap.xml',
  };
}

