-- Tek bir kategori eklemek için SQL
-- Supabase SQL Editor'de çalıştırın

INSERT INTO "Category" (id, name, slug, description, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,  -- Otomatik UUID oluştur
  'Kategori Adı',           -- Kategori adını buraya yazın
  'kategori-slug',          -- URL slug'ını buraya yazın (küçük harf, tire ile)
  'Kategori açıklaması',    -- Açıklama
  NOW(),                    -- Oluşturulma tarihi (otomatik)
  NOW()                     -- Güncellenme tarihi (otomatik)
);

-- Örnek:
-- INSERT INTO "Category" (id, name, slug, description, "createdAt", "updatedAt")
-- VALUES (
--   gen_random_uuid()::text,
--   'Yeni Kategori',
--   'yeni-kategori',
--   'Bu yeni bir kategoridir.',
--   NOW(),
--   NOW()
-- );

