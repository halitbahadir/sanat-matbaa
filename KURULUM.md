# Kurulum ve Çalıştırma Rehberi

## Hızlı Başlangıç

### 1. Node.js Kurulumu (Eğer yoksa)
Projede Node.js zaten kurulu. Eğer terminal'de çalışmıyorsa:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### 2. Bağımlılıkları Yükle
```bash
npm install
```

### 3. Development Server'ı Başlat
```bash
npm run dev
```

### 4. Tarayıcıda Aç
```
http://localhost:3000
```

## Sorun Giderme

### "Cannot find module" Hatası
Eğer bu hatayı alıyorsanız:

```bash
# Cache'i temizle
rm -rf .next
rm -rf node_modules
npm install
npm run dev
```

### Port 3000 Kullanımda
Eğer port 3000 kullanımda ise:

```bash
# Farklı port kullan
PORT=3001 npm run dev
```

### TypeScript Hataları
```bash
# Type kontrolü yap
npx tsc --noEmit
```

## Production Build

```bash
npm run build
npm start
```

## Önemli Notlar

1. **Veritabanı**: Şu anda mock data kullanılıyor. Gerçek veritabanı için:
   - `.env` dosyası oluşturun
   - `DATABASE_URL` ekleyin
   - `npx prisma migrate dev` çalıştırın

2. **Environment Variables**: `.env.example` dosyasını `.env` olarak kopyalayın ve değerleri doldurun.

3. **Ürün Görselleri**: `/public/products/` klasörüne ürün görsellerini ekleyin.

