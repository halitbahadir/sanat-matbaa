# Hostinger Static File 404 Fix

## 🔧 Yapılan Düzeltmeler

### 1. next.config.js Güncellendi
- `output: 'standalone'` kaldırıldı
- Custom `server.js` ile uyumsuzdu
- Normal build kullanılıyor artık

### 2. server.js İyileştirildi
- Daha detaylı logging eklendi
- Static dosya bulunamadığında debug bilgisi veriyor
- Build ID kontrolü iyileştirildi

## 🚀 Hostinger'da Yapılacaklar

### ADIM 1: Redeploy
1. Hostinger Panel → **Deployments**
2. **Deploy Now** butonuna tıklayın
3. Veya GitHub'a push yaptıysanız otomatik deploy olacak

### ADIM 2: Build Command Kontrolü
Hostinger Panel → **Build Command**:
```
npm run build
```

### ADIM 3: Start Command Kontrolü
Hostinger Panel → **Start Command**:
```
node server.js
```

### ADIM 4: Runtime Logs Kontrolü
Deploy sonrası **Runtime Logs**'da şunları görmelisiniz:
```
> Next.js app prepared successfully
> Build ID: [build-id]
> ✓ .next/static directory exists
> Ready on http://0.0.0.0:3000
```

Static dosya isteklerinde:
```
> Serving static file: /_next/static/... -> /path/to/file
```

### ADIM 5: Test
1. Siteyi açın
2. Browser DevTools → Network
3. `/_next/static/` dosyaları 200 OK olmalı
4. 404 hatası olmamalı

## ⚠️ Önemli Notlar

1. **Standalone Mode:** Artık kullanılmıyor, normal build kullanılıyor
2. **Static Files:** `server.js` tarafından doğrudan serve ediliyor
3. **Build ID:** Her build'de değişebilir, bu normal

## 🆘 Sorun Devam Ederse

### Runtime Logs Kontrolü
1. Hostinger Panel → **Runtime Logs**
2. Static file isteklerini kontrol edin
3. "Static file NOT found" mesajları varsa build'i kontrol edin

### Build Logs Kontrolü
1. Hostinger Panel → **Build Logs**
2. Build başarılı mı kontrol edin
3. `.next/static` klasörü oluştu mu kontrol edin

### Manuel Kontrol
Eğer hala sorun varsa:
1. Hostinger'da SSH ile bağlanın
2. `.next/static` klasörünün var olduğunu kontrol edin
3. Dosya izinlerini kontrol edin

