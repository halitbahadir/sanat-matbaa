# Supabase Connection String Bulma - Görsel Rehber

## ❌ Şu anki sayfa: API Settings (Yanlış)
Bu sayfada connection string yok. Database sekmesine gitmeniz gerekiyor.

## ✅ Doğru Yol

### ADIM 1: Sol menüden "Database" seçin
- Sol sidebar'da **CONFIGURATION** bölümünde
- **Database** linkine tıklayın (dış link ikonu olan)

### ADIM 2: Database sayfasında
1. **Connection string** bölümünü bulun
2. **Connection Pooling** sekmesine tıklayın
3. **Session mode** seçin
4. Connection string'i kopyalayın

## 📍 Alternatif Yol

Eğer Database linki görünmüyorsa:

1. Sol sidebar'da **PROJECT SETTINGS** bölümünde
2. **General** seçin
3. Aşağı kaydırın, **Database** bölümünü bulun
4. Veya direkt URL: `https://supabase.com/dashboard/project/[PROJECT-ID]/settings/database`

## 🎯 İhtiyacınız olan format:

```
postgresql://postgres.vvhpzepcitbbwffvruos:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres?pgbouncer=true
```

