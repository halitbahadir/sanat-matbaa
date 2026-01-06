# Kategori Güncelleme Rehberi

## ✅ Tamamlanan İşlemler

### 1. Supabase SQL Script Hazırlandı
- **Dosya**: `supabase-insert-categories.sql`
- **İçerik**: 9 yeni kategori için INSERT script'i
- **Kullanım**: Supabase SQL Editor'de çalıştırın

### 2. API Route'lar Oluşturuldu
- **GET `/api/categories`**: Tüm kategorileri listeler
- **GET `/api/categories/[slug]`**: Slug'a göre kategori getirir
- **POST `/api/categories`**: Yeni kategori ekler (admin only)

### 3. Frontend Güncellemeleri
- **SidebarCategories**: Artık Supabase'den kategorileri çekiyor
- **Category Page**: Supabase'den kategori bilgilerini çekiyor
- **Category Icons**: Her kategori için icon mapping eklendi

### 4. Admin Panel Güncellemeleri
- **Kategori Listesi**: `/admin/kategoriler`
- **Yeni Kategori Ekleme**: `/admin/kategoriler/yeni`
- **Admin Sidebar**: Kategoriler menüsü eklendi

## 📋 Yeni Kategoriler

1. **Fırsat Ürünleri** (`firsat-urunleri`)
2. **Kişiye Özel Hediyeler** (`kisiye-ozel-hediyeler`)
3. **Kişiye Özel Kalemler** (`kisiye-ozel-kalemler`)
4. **Matbaa Ürünleri** (`matbaa-urunleri`)
5. **Özel Günler** (`ozel-gunler`)
6. **Promosyon Toptan Alım** (`promosyon-toptan-alim`)
7. **İsme Özel Ofis Hediyeleri** (`isme-ozel-ofis-hediyeleri`)
8. **Teknoloji Ürünleri** (`teknoloji-urunleri`)
9. **Düğün Davetiyeleri** (`dugun-davetiyeleri`)

## 🚀 Adım Adım Kurulum

### ADIM 1: Supabase'de Kategorileri Ekle

1. Supabase Dashboard'a giriş yapın
2. SQL Editor'ü açın
3. `supabase-insert-categories.sql` dosyasının içeriğini kopyalayın
4. SQL Editor'de çalıştırın
5. Kategorilerin eklendiğini kontrol edin

### ADIM 2: Projeyi Test Edin

```bash
# Development modunda çalıştır
npm run dev

# Tarayıcıda kontrol et:
# - http://localhost:3000 (Sidebar'da kategoriler görünmeli)
# - http://localhost:3000/kategori/firsat-urunleri (Kategori sayfası)
# - http://localhost:3000/admin/kategoriler (Admin paneli)
```

### ADIM 3: Production'a Deploy

```bash
# Build al
npm run build

# Commit ve push
git add .
git commit -m "feat: Kategori sistemi Supabase entegrasyonu"
git push origin main
```

## 📁 Oluşturulan/Güncellenen Dosyalar

### Yeni Dosyalar
- `supabase-insert-categories.sql` - SQL script
- `app/api/categories/route.ts` - Kategori API
- `app/api/categories/[slug]/route.ts` - Slug'a göre kategori API
- `lib/categories.ts` - Kategori utility fonksiyonları
- `app/admin/kategoriler/page.tsx` - Kategori listesi
- `app/admin/kategoriler/yeni/page.tsx` - Yeni kategori ekleme

### Güncellenen Dosyalar
- `components/SidebarCategories.tsx` - Supabase entegrasyonu
- `app/kategori/[slug]/page.tsx` - Supabase entegrasyonu
- `components/admin/AdminSidebar.tsx` - Kategoriler menüsü eklendi
- `lib/prisma.ts` - Category model desteği eklendi

## ⚠️ Önemli Notlar

1. **Supabase Bağlantısı**: `DATABASE_URL` environment variable'ının doğru olduğundan emin olun
2. **Prisma Client**: Değişikliklerden sonra `npx prisma generate` çalıştırın (gerekirse)
3. **Admin Yetkisi**: Kategori ekleme/düzenleme için admin yetkisi gereklidir
4. **Slug Formatı**: Slug'lar otomatik olarak Türkçe karakterlerden temizlenir

## 🔄 Sonraki Adımlar (Opsiyonel)

- [ ] Kategori düzenleme sayfası (`/admin/kategoriler/[id]`)
- [ ] Kategori silme fonksiyonu
- [ ] Kategori sıralama (order field)
- [ ] Kategori görseli (image field)
- [ ] Alt kategoriler desteği

## 🐛 Sorun Giderme

### Kategoriler görünmüyor
- Supabase'de kategorilerin eklendiğini kontrol edin
- `DATABASE_URL` environment variable'ını kontrol edin
- Browser console'da hata var mı kontrol edin

### API 404 hatası
- `/api/categories` route'unun doğru çalıştığını kontrol edin
- Prisma client'ın doğru initialize edildiğini kontrol edin

### Admin paneli erişim hatası
- Kullanıcının `role: "admin"` olduğundan emin olun
- Session'ın doğru çalıştığını kontrol edin

