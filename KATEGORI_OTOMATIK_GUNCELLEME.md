# Kategori Otomatik Güncelleme - Nasıl Çalışır?

## ✅ Mevcut Durum

### Supabase'de Kategori Eklediğinizde:

1. **Sayfa Yenilendiğinde:** ✅ **Otomatik görünür**
   - `export const dynamic = 'force-dynamic'` sayesinde
   - Her sayfa yüklemesinde Supabase'den fresh data çekilir
   - Cache yok, her zaman güncel veri

2. **Sayfa Açıkken:** ⚠️ **Sayfa yenilenmesi gerekir**
   - `SidebarCategories` component'i sadece mount olduğunda kategorileri çekiyor
   - Sayfa açıkken Supabase'de kategori eklerseniz, sayfayı yenilemeniz gerekir

## 🔄 Nasıl Çalışıyor?

### 1. API Route (`/api/categories`)
```typescript
export const dynamic = 'force-dynamic'; // ✅ Her zaman fresh data
```

### 2. Category Page (`/kategori/[slug]`)
```typescript
export const dynamic = 'force-dynamic'; // ✅ Her zaman fresh data
```

### 3. SidebarCategories Component
- Sayfa yüklendiğinde `/api/categories` endpoint'inden kategorileri çeker
- Supabase'den güncel veri gelir

## 📝 Kategori Ekleme Yöntemleri

### Yöntem 1: Supabase SQL Editor
1. Supabase Dashboard → SQL Editor
2. INSERT query çalıştır
3. Sayfayı yenile → Kategori görünür ✅

### Yöntem 2: Admin Panel
1. `/admin/kategoriler/yeni` sayfasına git
2. Yeni kategori ekle
3. Sayfayı yenile → Kategori görünür ✅

### Yöntem 3: Supabase Dashboard (Table Editor)
1. Supabase Dashboard → Table Editor → Category tablosu
2. Yeni satır ekle
3. Sayfayı yenile → Kategori görünür ✅

## 🚀 İsteğe Bağlı: Otomatik Refresh

Eğer sayfa açıkken otomatik refresh istiyorsanız, `SidebarCategories` component'ine polling ekleyebiliriz:

```typescript
// Her 30 saniyede bir kategorileri yeniden çek
useEffect(() => {
  const interval = setInterval(() => {
    fetchCategories();
  }, 30000); // 30 saniye
  
  return () => clearInterval(interval);
}, []);
```

## ✅ Özet

- ✅ **Supabase'de kategori eklediğinizde sayfa yenilendiğinde otomatik görünür**
- ✅ **Her zaman fresh data çekilir (cache yok)**
- ⚠️ **Sayfa açıkken otomatik refresh yok (isteğe bağlı eklenebilir)**


