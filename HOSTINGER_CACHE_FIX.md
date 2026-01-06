# Hostinger Cache ve Chunk ID Sorunu - Çözüm

## 🔍 Sorun Analizi

### Problem
- Her build'de farklı chunk ID'ler oluşuyor
- Browser eski chunk ID'li dosyaları arıyor
- 404 hatası ve ChunkLoadError oluşuyor

### Neden Oluyor?
1. **Build ID Değişimi:** Her build'de farklı BUILD_ID oluşuyor
2. **Chunk ID Değişimi:** Webpack her build'de farklı chunk ID'leri oluşturuyor
3. **Browser Cache:** Browser eski chunk ID'lerini hatırlıyor

## ✅ Yapılan Düzeltmeler

### 1. Build ID Sabitlendi
```javascript
generateBuildId: async () => {
  return process.env.NODE_ENV === 'production' 
    ? 'production-build-v1' 
    : null;
}
```

### 2. Chunk ID'leri Deterministic Yapıldı
```javascript
webpack: (config, { isServer, dev }) => {
  if (!isServer && !dev) {
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      chunkIds: 'deterministic',
    };
  }
  return config;
}
```

## 🚀 Hostinger'da Yapılacaklar

### ADIM 1: Redeploy
1. GitHub'a push edildi, otomatik deploy olacak
2. Veya manuel: Hostinger Panel → Deployments → Deploy Now

### ADIM 2: Browser Cache Temizleme
**Kullanıcılar için:**
1. Hard Refresh: `Ctrl + Shift + R` (Windows) veya `Cmd + Shift + R` (Mac)
2. Veya: Browser DevTools → Network → "Disable cache" aktif et

**Hostinger CDN Cache (Eğer varsa):**
1. Hostinger Panel → CDN Settings
2. Cache'i temizle veya disable et (test için)

### ADIM 3: Build Kontrolü
Hostinger Panel → **Build Logs**:
- Build başarılı olmalı
- Hata olmamalı

### ADIM 4: Runtime Logs Kontrolü
Hostinger Panel → **Runtime Logs**:
```
> Next.js app prepared successfully
> Build ID: production-build-v1
> ✓ .next/static directory exists
> Ready on http://0.0.0.0:3000
```

**ÖNEMLİ:** Build ID artık `production-build-v1` olmalı (sabit)

### ADIM 5: Test
1. Siteyi açın
2. Hard refresh yapın (`Ctrl + Shift + R`)
3. Browser DevTools → Network
4. `/_next/static/` dosyaları 200 OK olmalı
5. ChunkLoadError olmamalı

## 🔄 Sonraki Build'lerde

Artık her build'de:
- ✅ Build ID aynı kalacak (`production-build-v1`)
- ✅ Chunk ID'leri aynı kalacak
- ✅ Browser cache sorunları olmayacak

**Not:** Eğer chunk ID'lerini değiştirmek isterseniz, `generateBuildId`'deki versiyonu değiştirin:
```javascript
return 'production-build-v2'; // Yeni versiyon
```

## 🆘 Sorun Devam Ederse

### 1. Browser Cache Temizle
- Hard refresh yapın
- Browser cache'i temizleyin
- Incognito/Private mode'da test edin

### 2. Hostinger CDN Cache
- CDN cache'i temizleyin
- Veya geçici olarak disable edin

### 3. Build Kontrolü
- Build Logs'da hata var mı kontrol edin
- `.next/static` klasörü oluştu mu kontrol edin

### 4. Runtime Logs
- Static file isteklerini kontrol edin
- "Static file NOT found" mesajları varsa build'i kontrol edin

