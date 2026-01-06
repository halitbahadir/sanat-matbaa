# Hostinger Environment Variables - Anahtar ve Değer

## 📋 Hostinger Panel'e Eklenecek Environment Variables

Hostinger Panel → **Environment Variables** bölümüne şu şekilde ekleyin:

### 1. DATABASE_URL

**Anahtar (Key):**
```
DATABASE_URL
```

**Değer (Value):**
```
postgresql://postgres.vvhpzepcitbbwffvruos:[PASSWORD]@aws-1-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true
```

**ÖNEMLİ:** `[PASSWORD]` yerine gerçek Supabase database password'unuzu yazın!

---

### 2. NODE_ENV

**Anahtar (Key):**
```
NODE_ENV
```

**Değer (Value):**
```
production
```

---

### 3. PORT

**Anahtar (Key):**
```
PORT
```

**Değer (Value):**
```
3000
```

---

## 📝 Hostinger Panel'de Nasıl Eklenecek?

1. Hostinger Panel → **Node.js Application** → **Settings**
2. **Environment Variables** bölümüne gidin
3. Her bir değişken için:
   - **Add Variable** veya **+** butonuna tıklayın
   - **Key** alanına anahtarı yazın (örn: `DATABASE_URL`)
   - **Value** alanına değeri yazın (örn: connection string)
   - **Save** butonuna tıklayın

## ⚠️ Önemli Notlar

1. **DATABASE_URL'de Password:**
   - `[PASSWORD]` yerine gerçek password'ü yazın
   - Password'de özel karakterler varsa URL encode edin:
     - `@` → `%40`
     - `#` → `%23`
     - `%` → `%25`

2. **Tırnak İşaretleri:**
   - Hostinger panelinde genellikle tırnak işareti gerekmez
   - Sadece değeri direkt yazın

3. **Boşluklar:**
   - Değerlerde başta/sonda boşluk olmamalı

## ✅ Örnek Tam Format

Hostinger panelinde şöyle görünecek:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `postgresql://postgres.vvhpzepcitbbwffvruos:GerçekPassword123@aws-1-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true` |
| `NODE_ENV` | `production` |
| `PORT` | `3000` |

## 🔍 Kontrol

Environment variables ekledikten sonra:
1. **Save** butonuna tıklayın
2. Server'ı yeniden başlatın (redeploy)
3. Runtime Logs'da hata olmamalı

