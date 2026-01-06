-- Supabase'de kategorileri eklemek için SQL script
-- Bu script'i Supabase SQL Editor'de çalıştırın

-- Önce mevcut kategorileri kontrol edin (opsiyonel - eğer varsa silmek için)
-- DELETE FROM "Category" WHERE slug IN (
--   'firsat-urunleri',
--   'kisiye-ozel-hediyeler',
--   'kisiye-ozel-kalemler',
--   'matbaa-urunleri',
--   'ozel-gunler',
--   'promosyon-toptan-alim',
--   'isme-ozel-ofis-hediyeleri',
--   'teknoloji-urunleri',
--   'dugun-davetiyeleri'
-- );

-- Yeni kategorileri ekle
INSERT INTO "Category" (id, name, slug, description, "createdAt", "updatedAt")
VALUES
  (
    gen_random_uuid()::text,
    'Fırsat Ürünleri',
    'firsat-urunleri',
    'En uygun fiyatlı fırsat ürünlerimizi keşfedin.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid()::text,
    'Kişiye Özel Hediyeler',
    'kisiye-ozel-hediyeler',
    'Sevdikleriniz için özel tasarım hediyeler.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid()::text,
    'Kişiye Özel Kalemler',
    'kisiye-ozel-kalemler',
    'Kişiye özel baskılı kalemler ve yazı gereçleri.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid()::text,
    'Matbaa Ürünleri',
    'matbaa-urunleri',
    'Profesyonel matbaa ürünleri ve hizmetleri.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid()::text,
    'Özel Günler',
    'ozel-gunler',
    'Doğum günü, yıldönümü ve özel günler için ürünler.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid()::text,
    'Promosyon Toptan Alım',
    'promosyon-toptan-alim',
    'Toplu alımlar için özel fiyatlar ve kampanyalar.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid()::text,
    'İsme Özel Ofis Hediyeleri',
    'isme-ozel-ofis-hediyeleri',
    'Ofis ortamı için özel tasarım hediyeler.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid()::text,
    'Teknoloji Ürünleri',
    'teknoloji-urunleri',
    'Teknoloji odaklı promosyon ürünleri.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid()::text,
    'Düğün Davetiyeleri',
    'dugun-davetiyeleri',
    'Özel tasarım düğün davetiyeleri ve aksesuarları.',
    NOW(),
    NOW()
  )
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  "updatedAt" = NOW();

-- Kategorileri kontrol et
SELECT id, name, slug, description FROM "Category" ORDER BY name;

