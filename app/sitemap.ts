import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sanmatmatbaasi.com';
  
  const categories = [
    'firsat-urunleri',
    'kisiye-ozel-hediyeler',
    'kisiye-ozel-kalemler',
    'matbaa-urunleri',
    'ozel-gunler',
    'promosyon-toptan-alim',
    'isme-ozel-ofis-hediyeleri',
    'teknoloji-urunleri',
    'dugun-davetiyeleri',
  ];

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...categories.map((category) => ({
      url: `${baseUrl}/kategori/${category}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];

  return routes;
}

