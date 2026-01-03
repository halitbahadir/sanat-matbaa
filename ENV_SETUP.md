# Environment Variables Setup

## Hızlı Kurulum

1. Proje kök dizininde `.env.local` dosyası oluşturun:

```bash
touch .env.local
```

2. Aşağıdaki içeriği `.env.local` dosyasına ekleyin:

```env
# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="0sFxzQrq0bCQ0TDrhwMlflS9CcNsWZKYTH1I+kq75fo="

# Database (PostgreSQL - Opsiyonel, şimdilik gerekli değil)
# DATABASE_URL="postgresql://user:password@localhost:5432/sanat_matbaasi?schema=public"

# Stripe (Opsiyonel - Ödeme için)
# STRIPE_SECRET_KEY="sk_test_..."
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

3. Development server'ı yeniden başlatın:

```bash
npm run dev
```

## Notlar

- `NEXTAUTH_SECRET`: Session şifreleme için kullanılır. Production'da mutlaka değiştirin!
- `DATABASE_URL`: Veritabanı bağlantısı için. Şimdilik opsiyonel (session çalışır).
- Veritabanı olmadan da NextAuth çalışır (JWT session kullanıyor).

## Sorun Giderme

Eğer hala 500 hatası alıyorsanız:

1. `.env.local` dosyasının proje kök dizininde olduğundan emin olun
2. Server'ı tamamen durdurup yeniden başlatın
3. Terminal'deki hata mesajlarını kontrol edin

