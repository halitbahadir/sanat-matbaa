# 🔗 Hostinger - GitHub Bağlantı Rehberi

## 📋 Adım Adım GitHub Bağlantısı

### 1. GitHub Repository Oluşturma

#### A. Local'de Git Repository Hazırlayın
```bash
# Proje klasöründe
cd /Users/user/Desktop/E-commerce

# Git başlat (eğer yoksa)
git init

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit - Production ready"
```

#### B. GitHub'da Yeni Repository Oluşturun

1. **GitHub.com**'a giriş yapın
2. Sağ üstte **"+"** → **"New repository"** tıklayın
3. Repository adı: `sanat-matbaasi` (veya istediğiniz isim)
4. **Public** veya **Private** seçin
5. **"Initialize this repository with a README"** işaretlemeyin (zaten dosyalar var)
6. **"Create repository"** tıklayın

#### C. Local Repository'yi GitHub'a Bağlayın

GitHub'da repository oluşturduktan sonra gösterilen komutları kullanın:

```bash
# GitHub'da gösterilen komutlar (örnek):
git remote add origin https://github.com/KULLANICI_ADINIZ/sanat-matbaasi.git
git branch -M main
git push -u origin main
```

**Önemli:** `KULLANICI_ADINIZ` yerine kendi GitHub kullanıcı adınızı yazın.

### 2. Hostinger Panel'de GitHub Bağlantısı

#### Adım 1: Node.js Uygulaması Oluştur

1. Hostinger panel'e giriş yapın
2. **Websites** → **Create Website** tıklayın
3. **"Node.js Web Uygulaması"** seçeneğini seçin
4. Domain'inizi seçin veya subdomain oluşturun

#### Adım 2: GitHub Entegrasyonu

1. **"GitHub'dan dağıt"** veya **"Deploy from GitHub"** seçeneğini seçin
2. **"Connect GitHub"** veya **"Authorize GitHub"** butonuna tıklayın
3. GitHub giriş ekranı açılacak:
   - GitHub kullanıcı adı ve şifrenizi girin
   - **"Authorize Hostinger"** veya **"Install"** butonuna tıklayın
   - Hostinger'ın repository'lerinize erişim izni isteyecek
   - **"Authorize"** veya **"Approve"** tıklayın

#### Adım 3: Repository Seçimi

1. GitHub bağlantısı kurulduktan sonra:
   - Repository listesi görünecek
   - **"sanat-matbaasi"** (veya oluşturduğunuz isim) repository'sini seçin
   - **Branch**: `main` (veya `master`) seçin

#### Adım 4: Build Ayarları

Hostinger panel'de şu ayarları yapın:

- **Build Command**: `npm run build`
- **Start Command**: `node .next/standalone/server.js`
- **Root Directory**: `/` (boş bırakın veya `/` yazın)
- **Node Version**: `18.x` veya `20.x` (Hostinger'ın desteklediği versiyon)

#### Adım 5: Environment Variables

Hostinger panel → **Environment Variables** bölümüne gidin ve ekleyin:

```
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/dbname?schema=public
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key-here
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### 3. İlk Deploy

1. Tüm ayarları yaptıktan sonra **"Deploy"** veya **"Save"** butonuna tıklayın
2. Hostinger otomatik olarak:
   - Repository'yi çeker
   - `npm install` çalıştırır
   - `npm run build` çalıştırır
   - Uygulamayı başlatır

3. Deploy işlemi 2-5 dakika sürebilir
4. **Logs** bölümünden ilerlemeyi takip edebilirsiniz

## 🔐 GitHub OAuth İzinleri

Hostinger'ın ihtiyaç duyduğu izinler:
- ✅ Repository erişimi (okuma)
- ✅ Webhook oluşturma (otomatik deploy için)
- ✅ Commit durumu (deploy takibi için)

**Güvenlik:** Hostinger sadece seçtiğiniz repository'ye erişebilir.

## 🔄 Otomatik Deploy (Opsiyonel)

Hostinger, GitHub'a push yaptığınızda otomatik deploy yapabilir:

1. Hostinger panel → **Settings** → **Auto Deploy**
2. **"Enable Auto Deploy"** aktif edin
3. Artık `git push` yaptığınızda otomatik deploy olur

## 📝 Manuel Deploy

Eğer otomatik deploy istemiyorsanız:

1. Hostinger panel → **Deployments**
2. **"Deploy Now"** butonuna tıklayın
3. En son commit deploy edilir

## 🆘 Sorun Giderme

### GitHub Bağlantısı Kurulamıyor

1. GitHub hesabınızın aktif olduğundan emin olun
2. Hostinger'ın GitHub uygulamasını kontrol edin: https://github.com/settings/applications
3. Tarayıcı pop-up blocker'ı kapatın
4. Farklı tarayıcı deneyin

### Repository Görünmüyor

1. Repository'nin **Public** olduğundan emin olun (veya Hostinger'a erişim izni verin)
2. GitHub'da repository ayarlarından Hostinger uygulamasına izin verin
3. Hostinger panel'de **"Refresh"** butonuna tıklayın

### Deploy Başarısız

1. **Logs** bölümünden hata mesajını okuyun
2. `package.json` dosyasının doğru olduğundan emin olun
3. Build command doğru mu kontrol edin: `npm run build`
4. Start command doğru mu kontrol edin: `node .next/standalone/server.js`

## ✅ Kontrol Listesi

- [ ] GitHub'da repository oluşturuldu
- [ ] Local dosyalar GitHub'a push edildi
- [ ] Hostinger panel'de Node.js uygulaması oluşturuldu
- [ ] GitHub bağlantısı kuruldu
- [ ] Repository seçildi
- [ ] Branch seçildi (main/master)
- [ ] Build command ayarlandı: `npm run build`
- [ ] Start command ayarlandı: `node .next/standalone/server.js`
- [ ] Environment variables eklendi
- [ ] İlk deploy başlatıldı
- [ ] Deploy başarılı oldu
- [ ] Site açılıyor

## 🎯 Özet

1. **GitHub'da repository oluştur** → Local'den push et
2. **Hostinger'da Node.js uygulaması oluştur**
3. **GitHub'a bağlan** → OAuth ile yetkilendir
4. **Repository seç** → Branch seç
5. **Build/Start command ayarla**
6. **Environment variables ekle**
7. **Deploy et** → Site canlıda! 🎉

## 📞 Yardım

- Hostinger Support: Panel'den ticket açın
- GitHub Docs: https://docs.github.com
- Next.js Deployment: https://nextjs.org/docs/deployment

