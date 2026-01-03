# 🚀 Hostinger Node.js Deployment - Adım Adım Rehber

## ✅ Evet, Çalışır!

Hostinger'ın Node.js özelliği ile Next.js uygulamanız mükemmel çalışacak. İşte adım adım rehber:

## 📋 Ön Hazırlık (Local)

### 1. Production Build Test
```bash
# Local'de test edin
npm run build
npm start
# http://localhost:3000 açılmalı
```

### 2. Git Repository Hazırlayın (Önerilen)
```bash
# Git repository oluştur
git init
git add .
git commit -m "Production ready for Hostinger"

# GitHub'a push edin
git remote add origin https://github.com/yourusername/sanat-matbaasi.git
git push -u origin main
```

## 🎯 Hostinger Panel'de Yapılacaklar

### Adım 1: Node.js Uygulaması Oluştur

1. Hostinger panel → **Websites** → **Create Website**
2. **"Node.js Web Uygulaması"** seçeneğini seçin
3. Domain'inizi seçin veya subdomain oluşturun

### Adım 2: GitHub'dan Deploy (Önerilen Yöntem)

1. **"GitHub'dan dağıt"** seçeneğini seçin
2. GitHub repository URL'inizi girin: `https://github.com/yourusername/sanat-matbaasi`
3. Branch: `main` veya `master`
4. Build Command: `npm run build`
5. Start Command: `node .next/standalone/server.js`
6. **Root Directory**: `/` (boş bırakın)

### Adım 3: Environment Variables Ayarlayın

Hostinger panel → **Environment Variables** bölümüne ekleyin:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/dbname?schema=public
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key-here
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

**Önemli:** `NEXTAUTH_SECRET` için güvenli bir key oluşturun:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Adım 4: Veritabanı Oluşturun

1. Hostinger panel → **Databases** → **PostgreSQL** (veya MySQL)
2. Yeni database oluşturun
3. Connection bilgilerini alın
4. `DATABASE_URL` environment variable'ına ekleyin

### Adım 5: Build ve Deploy

Hostinger otomatik olarak:
1. Repository'yi çeker
2. `npm install` çalıştırır
3. `npm run build` çalıştırır (build command)
4. `node .next/standalone/server.js` ile başlatır (start command)

## 🔧 Alternatif: Manuel Dosya Yükleme

Eğer GitHub kullanmak istemiyorsanız:

### 1. Local'de Build Alın
```bash
npm run build
```

### 2. FTP ile Yükleyin

Hostinger File Manager veya FTP ile şu klasörleri yükleyin:
- `.next/standalone/` (tüm içerik)
- `.next/static/` (tüm içerik)
- `public/` (tüm içerik)
- `package.json`
- `package-lock.json` (varsa)

### 3. Hostinger'da Install
```bash
# SSH ile bağlanın (Hostinger panel'den SSH bilgilerini alın)
cd /home/yourusername/public_html
npm install --production
```

### 4. Start Command Ayarlayın
Hostinger panel → **Start Command**:
```
node .next/standalone/server.js
```

## 📝 Veritabanı Migration

Hostinger'da SSH ile bağlanın:
```bash
cd /home/yourusername/public_html
npx prisma generate
npx prisma migrate deploy
# veya
npx prisma db push
```

## 👤 İlk Admin Kullanıcı Oluşturma

```bash
# Hostinger SSH'de
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'admin@sanatmatbaasi.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin'
    }
  });
  console.log('✅ Admin user created:', user.email);
}

main().catch(console.error).finally(() => prisma.\$disconnect());
"
```

## ✅ Kontrol Listesi

- [ ] Local'de `npm run build` başarılı
- [ ] Git repository oluşturuldu ve push edildi
- [ ] Hostinger'da Node.js uygulaması oluşturuldu
- [ ] GitHub repository bağlandı (veya dosyalar yüklendi)
- [ ] Environment variables ayarlandı
- [ ] Veritabanı oluşturuldu
- [ ] `DATABASE_URL` doğru ayarlandı
- [ ] `NEXTAUTH_URL` domain'inize göre ayarlandı
- [ ] `NEXTAUTH_SECRET` güvenli bir key
- [ ] Build command: `npm run build`
- [ ] Start command: `node .next/standalone/server.js`
- [ ] Veritabanı migration çalıştırıldı
- [ ] İlk admin kullanıcı oluşturuldu
- [ ] Site açılıyor ve çalışıyor

## 🎯 Hostinger Node.js Özellikleri

✅ **Otomatik Deploy**: GitHub'dan otomatik deploy
✅ **Environment Variables**: Panel'den kolay yönetim
✅ **SSL**: Let's Encrypt ücretsiz SSL
✅ **Port Yönetimi**: Otomatik port atama
✅ **Logs**: Panel'den log görüntüleme
✅ **Restart**: Panel'den uygulama restart

## 🆘 Sorun Giderme

### Build Hatası
- Hostinger panel → **Logs** bölümünden hata mesajını kontrol edin
- `package.json` dosyasında tüm dependencies olduğundan emin olun

### Port Hatası
- Environment variable'da `PORT=3000` olduğundan emin olun
- Hostinger genellikle otomatik port atar

### Database Connection Error
- `DATABASE_URL` formatını kontrol edin
- Hostinger database panel'de connection bilgilerini doğrulayın
- Firewall ayarlarını kontrol edin

### 404 Hatası
- `NEXTAUTH_URL` değerinin doğru olduğundan emin olun
- SSL aktif mi kontrol edin
- Domain ayarlarını kontrol edin

### Uygulama Başlamıyor
- Start command doğru mu kontrol edin: `node .next/standalone/server.js`
- Logs bölümünden hata mesajını okuyun
- `npm install` çalıştırıldı mı kontrol edin

## 📞 Destek

- Hostinger Support: Panel'den ticket açın
- Next.js Docs: https://nextjs.org/docs/deployment
- Prisma Docs: https://www.prisma.io/docs

## 🎉 Başarılı Deployment Sonrası

1. Site açılıyor ✅
2. `/giris` sayfası çalışıyor ✅
3. Admin paneli erişilebilir ✅
4. Veritabanı bağlantısı çalışıyor ✅

**Tebrikler! 🎊** E-ticaret siteniz canlıda!

