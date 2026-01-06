# 🚀 Hostinger Otomatik Deploy - Kurulum Rehberi

## ✅ GitHub'a Push Tamamlandı!

Kodunuz başarıyla GitHub'a push edildi:
- Repository: `https://github.com/halitbahadir/sanat-matbaa.git`
- Branch: `main`
- Commit: `81173f9`

## 🔄 Hostinger'da Otomatik Deploy Kurulumu

### ADIM 1: Hostinger Panel'e Giriş

1. Hostinger panel'e giriş yapın
2. **Websites** → **Node.js Applications** bölümüne gidin
3. Projenizi seçin veya yeni oluşturun

### ADIM 2: GitHub Bağlantısı (Eğer Yapılmadıysa)

1. **Settings** → **GitHub Integration**
2. **Connect GitHub** butonuna tıklayın
3. GitHub hesabınızı bağlayın
4. Repository seçin: `halitbahadir/sanat-matbaa`
5. Branch: `main` seçin

### ADIM 3: Build & Deploy Ayarları

Hostinger Panel → **Deployment Settings**:

- **Repository:** `halitbahadir/sanat-matbaa`
- **Branch:** `main`
- **Build Command:** `npm run build`
- **Start Command:** `node server.js`
- **Node Version:** `18.x` veya `20.x`
- **Working Directory:** `/` (boş bırakın)

### ADIM 4: Auto Deploy Aktif Et

1. **Settings** → **Auto Deploy**
2. **Enable Auto Deploy** toggle'ını **Aktif** edin
3. **Save** butonuna tıklayın

### ADIM 5: Environment Variables (KRİTİK!)

Hostinger Panel → **Environment Variables** bölümüne ekleyin:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://postgres.vvhpzepcitbbwffvruos:[PASSWORD]@aws-1-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true
```

**ÖNEMLİ:** 
- `[PASSWORD]` yerine gerçek Supabase password'unuzu yazın
- `.env.local` dosyasındaki aynı connection string'i kullanın

### ADIM 6: İlk Deploy

1. **Deployments** sekmesine gidin
2. **Deploy Now** butonuna tıklayın
3. Veya otomatik deploy için bir sonraki `git push` bekleyin

## 🔄 Otomatik Deploy Nasıl Çalışır?

### Senaryo 1: GitHub'a Push Yaptığınızda

1. `git push origin main` yaptığınızda
2. Hostinger otomatik olarak algılar
3. Repository'yi çeker
4. `npm install` çalıştırır
5. `npm run build` çalıştırır
6. `node server.js` ile server'ı başlatır
7. Site güncellenir ✅

### Senaryo 2: Manuel Deploy

1. Hostinger Panel → **Deployments**
2. **Deploy Now** butonuna tıklayın
3. En son commit deploy edilir

## 📊 Deploy Durumunu Takip Etme

### Runtime Logs
Hostinger Panel → **Runtime Logs**:
```
> Next.js app prepared successfully
> Build ID: [build-id]
> ✓ .next/static directory exists
> Ready on http://0.0.0.0:3000
```

### Build Logs
Hostinger Panel → **Build Logs**:
- Build sürecini görebilirsiniz
- Hata varsa burada görünür

## ✅ Deploy Sonrası Kontroller

1. **Site Açılıyor mu?**
   - `https://yourdomain.com` açılmalı

2. **Kategoriler Görünüyor mu?**
   - Sidebar'da kategoriler listelenmeli
   - Supabase'den geliyor olmalı

3. **Static Dosyalar Yükleniyor mu?**
   - Browser DevTools → Network
   - `/_next/static/` dosyaları 200 OK olmalı

4. **API Çalışıyor mu?**
   - `https://yourdomain.com/api/categories` JSON dönmeli

## 🆘 Sorun Giderme

### Auto Deploy Çalışmıyor
1. **Settings** → **Auto Deploy** kontrol edin
2. GitHub bağlantısı aktif mi kontrol edin
3. Webhook'lar doğru mu kontrol edin

### Build Hatası
1. **Build Logs** kontrol edin
2. Environment variables doğru mu kontrol edin
3. Node.js versiyonu 18+ olmalı

### Database Bağlantı Hatası
1. `DATABASE_URL` environment variable'ını kontrol edin
2. Connection string formatını kontrol edin
3. Supabase'de database aktif mi kontrol edin

## 🎯 Özet

✅ **GitHub'a push tamamlandı**
✅ **Kod yedeklendi**
🔄 **Hostinger'da Auto Deploy aktif edin**
⚙️ **Environment Variables ayarlayın**
🚀 **Deploy edin!**

Artık her `git push` yaptığınızda Hostinger otomatik olarak deploy edecek!

