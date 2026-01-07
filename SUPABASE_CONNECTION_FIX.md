# Supabase Connection Fix

## ⚠️ Önemli: IPv4 Network

Mesajınızda **"Not IPv4 compatible"** yazıyor. Bu durumda **Session Pooler** kullanmanız gerekiyor.

## ✅ Doğru Connection String

### Session Pooler (IPv4 için - ÖNERİLEN)

Supabase Dashboard'da:
1. **Project Settings** → **Database**
2. **Connection Pooling** sekmesi
3. **Session mode** seçin
4. Connection string'i kopyalayın

Format şöyle olmalı:
```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres?pgbouncer=true
```

### Direct Connection (IPv6 için - Şu an çalışmıyor)

Eğer IPv6 network'teyseniz:
```
postgresql://postgres:[YOUR-PASSWORD]@db.vvhpzepcitbbwffvruos.supabase.co:5432/postgres
```

## 🔧 .env.local Dosyasını Güncelle

`.env.local` dosyasını açın ve `DATABASE_URL`'i güncelleyin:

```env
# Session Pooler kullan (IPv4 için)
DATABASE_URL="postgresql://postgres.vvhpzepcitbbwffvruos:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres?pgbouncer=true"

# VEYA Direct Connection (IPv6 için - genelde çalışmaz)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.vvhpzepcitbbwffvruos.supabase.co:5432/postgres"
```

**ÖNEMLİ:** `[YOUR-PASSWORD]` yerine gerçek database password'unuzu yazın!

## 📝 Adımlar

1. Supabase Dashboard → Project Settings → Database
2. **Connection Pooling** sekmesine git
3. **Session mode** connection string'i kopyala
4. `.env.local` dosyasına yapıştır (password'ü ekle)
5. Server'ı yeniden başlat: `npm run dev`


