# 🚀 Hostinger Deployment - Hızlı Başlangıç

## ⚡ Hızlı Kurulum (5 Dakika)

### 1. Local Hazırlık
```bash
# Build al
npm run build

# Test et
npm start
```

### 2. Hostinger'a Yükleme

#### Seçenek A: Git ile (Önerilen - VPS)
```bash
# GitHub'a push et
git add .
git commit -m "Production ready"
git push

# Hostinger VPS'de
cd /home/yourusername/public_html
git pull
npm install --production
npm run build
pm2 start ecosystem.config.js
```

#### Seçenek B: FTP ile (Shared Hosting)
1. `npm run build` çalıştır
2. Şu klasörleri FTP ile yükle:
   - `.next/standalone/`
   - `.next/static/`
   - `public/`
   - `package.json`
   - `node_modules/` (veya Hostinger'da `npm install`)

### 3. Environment Variables (Hostinger Panel)

Hostinger Panel → Environment Variables:
```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key
```

### 4. Veritabanı
```bash
# Hostinger'da SSH
npx prisma migrate deploy
```

### 5. Başlat
```bash
# PM2 ile
pm2 start ecosystem.config.js
pm2 save
```

## ✅ Kontrol Listesi

- [ ] Build başarılı (`npm run build`)
- [ ] Environment variables ayarlandı
- [ ] Veritabanı oluşturuldu ve migrate edildi
- [ ] PM2 kurulu ve çalışıyor
- [ ] SSL aktif
- [ ] Site açılıyor

## 🆘 Sorun Giderme

**Site açılmıyor?**
- Port 3000 açık mı kontrol et
- PM2 logları: `pm2 logs`

**Database hatası?**
- `.env` dosyasındaki `DATABASE_URL` kontrol et
- Hostinger panel'de database connection test et

**Build hatası?**
- Node.js versiyonu 18+ olmalı
- `npm install` tekrar çalıştır

