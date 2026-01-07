# .env.local Güncelleme - Adım Adım

## ✅ Connection String Bulundu!

Connection string'iniz:
```
postgresql://postgres.vvhpzepcitbbwffvruos:[YOUR-PASSWORD]@aws-1-eu-central-1.pooler.supabase.com:5432/postgres
```

## 📝 Yapılacaklar

### ADIM 1: Database Password'ü Bulun
1. Supabase Dashboard'da aynı sayfada (Database Settings)
2. **"Reset your database password"** linkine tıklayın
3. Yeni password oluşturun veya mevcut password'ü kullanın
4. **ÖNEMLİ:** Password'ü bir yere kaydedin!

### ADIM 2: .env.local Dosyasını Güncelleyin

1. Proje klasöründe `.env.local` dosyasını açın
2. `DATABASE_URL` satırını bulun veya yeni ekleyin
3. Şu formatta güncelleyin:

```env
DATABASE_URL="postgresql://postgres.vvhpzepcitbbwffvruos:[GERÇEK-PASSWORD]@aws-1-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true"
```

**Örnek:**
```env
DATABASE_URL="postgresql://postgres.vvhpzepcitbbwffvruos:MyPassword123@aws-1-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true"
```

### ADIM 3: pgbouncer=true Ekleyin
Connection string'in sonuna `?pgbouncer=true` ekleyin (yukarıdaki örnekte var).

### ADIM 4: Test Edin

```bash
# Terminal'de:
node check-env.js
```

### ADIM 5: Server'ı Yeniden Başlatın

```bash
# Terminal'de Ctrl+C ile durdurun
npm run dev
```

## ⚠️ Önemli Notlar

1. **Password Özel Karakterler:** Eğer password'de özel karakterler varsa URL encode edin:
   - `@` → `%40`
   - `#` → `%23`
   - `%` → `%25`

2. **pgbouncer=true:** Connection string'in sonuna `?pgbouncer=true` ekleyin (Prisma için önerilir).

3. **Tırnak İşaretleri:** .env dosyasında connection string'i tırnak içine alın.


