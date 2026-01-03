# Hostinger Deployment Rehberi

## 🚀 Hostinger'a Deployment Adımları

### 1. Ön Hazırlık (Local)

#### A. Production Build Test
```bash
# Local'de production build test edin
npm run build
npm start
```

#### B. Environment Variables Hazırlayın
`.env.production` dosyası oluşturun:
```env
# Database (Hostinger PostgreSQL veya MySQL)
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"

# NextAuth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret-key"

# Stripe (Production keys)
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

### 2. Hostinger Panel Ayarları

#### A. Node.js Versiyonu
- Hostinger panel → Node.js Versiyonu → **Node.js 18.x veya 20.x** seçin

#### B. Application Root
- Application Root: `/public_html` veya `/` (VPS ise)

#### C. Application Startup File
- Startup File: `server.js` (standalone build sonrası)

### 3. Veritabanı Kurulumu

#### Seçenek 1: Hostinger PostgreSQL (Önerilen)
1. Hostinger panel → Databases → PostgreSQL oluştur
2. Connection bilgilerini al
3. `.env.production` dosyasına ekle

#### Seçenek 2: Hostinger MySQL
1. Prisma schema'yı MySQL için güncelle:
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

### 4. Deployment Adımları

#### A. Git Repository (Önerilen)
```bash
# Git repository oluştur
git init
git add .
git commit -m "Initial commit"

# GitHub'a push et
git remote add origin https://github.com/yourusername/repo.git
git push -u origin main
```

#### B. Hostinger'a Upload

**Yöntem 1: Git (VPS için)**
```bash
# Hostinger VPS'de
cd /home/yourusername/public_html
git clone https://github.com/yourusername/repo.git .
npm install --production
npm run build
```

**Yöntem 2: FTP/File Manager**
1. Local'de build al:
```bash
npm run build
```
2. `.next/standalone` klasörünü FTP ile yükle
3. `.next/static` klasörünü yükle
4. `public` klasörünü yükle
5. `package.json` ve `node_modules` yükle

#### C. Server Başlatma

**PM2 ile (Önerilen - VPS için)**
```bash
# PM2 kurulumu
npm install -g pm2

# Uygulamayı başlat
cd /home/yourusername/public_html
pm2 start .next/standalone/server.js --name "sanat-matbaasi"
pm2 save
pm2 startup
```

**Node.js ile (Basit)**
```bash
cd /home/yourusername/public_html
node .next/standalone/server.js
```

### 5. Environment Variables (Hostinger Panel)

Hostinger panel → Environment Variables bölümüne ekleyin:
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### 6. Veritabanı Migration

```bash
# Hostinger'da SSH ile bağlan
npx prisma migrate deploy
# veya
npx prisma db push
```

### 7. Domain ve SSL

1. Hostinger panel → Domains → SSL Certificate aktif et
2. `NEXTAUTH_URL` değerini `https://yourdomain.com` olarak güncelle

### 8. İlk Admin Kullanıcı Oluşturma

```bash
# Hostinger'da
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@sanatmatbaasi.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin'
    }
  });
  console.log('Admin user created');
}

main().catch(console.error).finally(() => prisma.$disconnect());
"
```

## 🔧 Troubleshooting

### Build Hatası
```bash
# Cache temizle
rm -rf .next node_modules
npm install
npm run build
```

### Port Hatası
- Hostinger genellikle port 3000 kullanır
- `.env` dosyasında `PORT=3000` ekleyin

### Database Connection Error
- Hostinger panel'de database connection bilgilerini kontrol edin
- Firewall ayarlarını kontrol edin

## 📝 Checklist

- [ ] Local'de `npm run build` başarılı
- [ ] `.env.production` dosyası hazır
- [ ] Veritabanı oluşturuldu
- [ ] Git repository oluşturuldu (opsiyonel)
- [ ] Hostinger'a dosyalar yüklendi
- [ ] Environment variables ayarlandı
- [ ] Veritabanı migration çalıştırıldı
- [ ] PM2 veya process manager kuruldu
- [ ] SSL sertifikası aktif
- [ ] İlk admin kullanıcı oluşturuldu
- [ ] Site test edildi

## 🎯 Hostinger Özel Notlar

1. **Shared Hosting**: Node.js uygulamaları çalışmayabilir, VPS gerekebilir
2. **VPS**: Tam kontrol, PM2 kullanabilirsiniz
3. **Database**: PostgreSQL veya MySQL kullanabilirsiniz
4. **SSL**: Let's Encrypt ücretsiz SSL mevcut

## 📞 Destek

Sorun yaşarsanız:
- Hostinger Support
- Next.js Documentation
- Prisma Documentation

