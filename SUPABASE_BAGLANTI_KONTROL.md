# Supabase Bağlantı Kontrolü

## 🔍 Sorun
API'den 500 hatası alınıyor ve kategoriler gelmiyor. Prisma veritabanına bağlanamıyor.

## ✅ Çözüm Adımları

### 1. Supabase Connection String Kontrolü

Supabase'de **iki tür connection string** var:

#### A) Direct Connection (Port 5432)
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

#### B) Connection Pooler (Port 6543) - **ÖNERİLEN**
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

### 2. .env Dosyasını Güncelle

`.env.local` veya `.env` dosyasında `DATABASE_URL` şu formatta olmalı:

```env
# Connection Pooler kullan (önerilen)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# VEYA Direct Connection
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

### 3. Supabase'den Connection String Alma

1. Supabase Dashboard → Project Settings → Database
2. **Connection Pooling** sekmesine git
3. **Connection string** kopyala (Port 6543 olan)
4. `.env.local` dosyasına ekle

### 4. Test Et

```bash
# Test script çalıştır
node test-db-connection.js
```

### 5. Server'ı Yeniden Başlat

```bash
# Server'ı durdur (Ctrl+C)
# Sonra yeniden başlat
npm run dev
```

## ⚠️ Önemli Notlar

- **Connection Pooler** kullanmak daha iyi (port 6543)
- `?pgbouncer=true&connection_limit=1` parametrelerini ekle
- Password'ü URL encode et (özel karakterler için)
- Supabase'de database'in aktif olduğundan emin ol

## 🔧 Alternatif: Supabase Client Kullan

Eğer Prisma bağlantısı çalışmazsa, direkt Supabase client kullanabiliriz:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```


