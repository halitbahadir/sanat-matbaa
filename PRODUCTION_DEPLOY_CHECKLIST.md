# 🚀 Production Deploy Checklist - Hostinger

## ✅ Mevcut Durum Analizi

### ✅ Hazır Olanlar

1. **Server.js** ✅
   - Production için hazır (`hostname: 0.0.0.0`)
   - Static dosya serving var
   - Error handling var

2. **Package.json** ✅
   - `start: "node server.js"` ✅
   - `build: "next build"` ✅
   - `postinstall: "prisma generate"` ✅
   - Node.js 18+ gereksinimi var ✅

3. **Prisma Client** ✅
   - Client-side kontrolü var
   - Server-side'da çalışıyor
   - Fallback mekanizması var

4. **API Routes** ✅
   - `force-dynamic` ile fresh data
   - Error handling var

5. **Fallback Mekanizması** ✅
   - Database bağlantısı olmasa bile site çalışır
   - Kategoriler fallback'ten gelir

### ⚠️ Hostinger'da Yapılması Gerekenler

## 📋 Hostinger Deployment Checklist

### 1. Environment Variables (KRİTİK!)

Hostinger Panel → **Environment Variables** bölümüne ekleyin:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://postgres.vvhpzepcitbbwffvruos:[PASSWORD]@aws-1-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true
```

**ÖNEMLİ:** 
- `[PASSWORD]` yerine gerçek Supabase password'unuzu yazın
- `.env.local` dosyasındaki aynı connection string'i kullanın

### 2. Build & Start Commands

Hostinger Panel → **Node.js Application Settings**:

- **Build Command:** `npm run build`
- **Start Command:** `node server.js`
- **Node Version:** `18.x` veya `20.x`
- **Working Directory:** `/` (boş bırakın)

### 3. Git Repository (Önerilen)

Eğer GitHub'dan deploy ediyorsanız:
- Repository URL: `https://github.com/halitbahadir/sanat-matbaa.git`
- Branch: `main`
- Auto Deploy: Aktif edin (opsiyonel)

### 4. İlk Deploy Sonrası Kontroller

#### A. Runtime Logs Kontrolü
Hostinger Panel → **Runtime Logs**:
```
> Next.js app prepared successfully
> Build ID: [build-id]
> ✓ .next/static directory exists
> Ready on http://0.0.0.0:3000
```

#### B. Database Bağlantısı Testi
1. Siteyi açın
2. Sidebar'da kategoriler görünmeli
3. Console'da hata olmamalı

#### C. Static Dosyalar Kontrolü
1. Browser DevTools → Network
2. `/_next/static/` dosyaları 200 OK olmalı
3. 404 hatası olmamalı

## 🔍 Potansiyel Sorunlar ve Çözümleri

### Sorun 1: DATABASE_URL Eksik
**Belirtiler:**
- Kategoriler görünmüyor
- Console'da "DATABASE_URL not set" hatası

**Çözüm:**
- Hostinger Panel → Environment Variables → `DATABASE_URL` ekleyin
- Connection string'i `.env.local`'deki ile aynı yapın

### Sorun 2: Static Dosyalar 404
**Belirtiler:**
- CSS/JS dosyaları yüklenmiyor
- ChunkLoadError

**Çözüm:**
- `server.js` zaten static dosyaları serve ediyor ✅
- Build'in başarılı olduğundan emin olun
- Runtime Logs'da `.next/static` kontrol edin

### Sorun 3: Build Hatası
**Belirtiler:**
- Deploy başarısız
- Build logs'da hata

**Çözüm:**
```bash
# Local'de test edin
npm run build
# Hata varsa düzeltin
```

### Sorun 4: Port Hatası
**Belirtiler:**
- Site açılmıyor
- Connection refused

**Çözüm:**
- Hostinger genellikle port 3000 kullanır
- `PORT=3000` environment variable'ı ekleyin
- Runtime Logs'da port numarasını kontrol edin

## ✅ Deployment Sonrası Test

1. **Ana Sayfa:** `https://yourdomain.com`
   - Sidebar'da kategoriler görünmeli ✅
   - Hero section çalışmalı ✅

2. **Kategori Sayfası:** `https://yourdomain.com/kategori/firsat-urunleri`
   - Kategori bilgileri görünmeli ✅
   - Ürünler listelenmeli ✅

3. **Admin Panel:** `https://yourdomain.com/admin/kategoriler`
   - Kategori listesi görünmeli ✅
   - Yeni kategori eklenebilmeli ✅

4. **API Test:** `https://yourdomain.com/api/categories`
   - JSON response dönmeli ✅
   - Kategoriler listelenmeli ✅

## 🎯 Özet

### ✅ Hazır Olanlar
- Server.js production için hazır
- Prisma client-side sorunu düzeltildi
- Fallback mekanizması var
- Static dosya serving var

### ⚠️ Yapılması Gerekenler
1. **DATABASE_URL** Hostinger panelinde ayarlanmalı (KRİTİK!)
2. Build & Start commands doğru olmalı
3. Node.js versiyonu 18+ olmalı

### 🚀 Sonuç
**Evet, bu haliyle sorunsuz çalışır!** Sadece Hostinger panelinde `DATABASE_URL` environment variable'ını ayarlamanız yeterli.

