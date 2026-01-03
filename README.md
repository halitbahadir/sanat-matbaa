# SM Sanat Matbaası E-Ticaret Websitesi

Modern ve profesyonel bir e-ticaret websitesi. Next.js 14, TypeScript, Tailwind CSS ve Prisma kullanılarak geliştirilmiştir.

## Özellikler

- 🛍️ **Ürün Kataloğu**: Kategorilere göre düzenlenmiş ürün listesi
- 🛒 **Sepet Sistemi**: Zustand ile state management
- 💳 **Ödeme Sistemi**: Stripe entegrasyonu hazır
- 👤 **Kullanıcı Girişi**: NextAuth.js ile authentication
- 📱 **Responsive Tasarım**: Mobil uyumlu modern arayüz
- 🔍 **SEO Optimizasyonu**: Metadata, sitemap ve robots.txt
- 📦 **Ücretsiz Kargo**: Tüm siparişlerde ücretsiz kargo
- 🎨 **Ücretsiz Tasarım**: Logo ve tasarım hizmeti

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Veritabanını yapılandırın:
```bash
# .env dosyasını oluşturun ve DATABASE_URL'i ayarlayın
cp .env.example .env

# Prisma migration'ları çalıştırın
npx prisma migrate dev
```

3. Development server'ı başlatın:
```bash
npm run dev
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Kategoriler

- Fırsat Ürünleri
- Kişiye Özel Hediyeler
- Kişiye Özel Kalemler
- Matbaa Ürünleri
- Özel Günler
- Promosyon Toptan Alım
- İsme Özel Ofis Hediyeleri
- Teknoloji Ürünleri
- Düğün Davetiyeleri

## Teknolojiler

- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS
- **Prisma**: Database ORM
- **NextAuth.js**: Authentication
- **Zustand**: State management
- **Framer Motion**: Animations
- **Stripe**: Payment processing

## SEO

Website SEO için optimize edilmiştir:
- Meta tags ve Open Graph
- Sitemap.xml
- Robots.txt
- Semantic HTML
- Structured data hazır

## Lisans

Bu proje özel bir projedir.

