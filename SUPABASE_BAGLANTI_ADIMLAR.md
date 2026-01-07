# Supabase Bağlantı Düzeltme - Adım Adım Rehber

## 🎯 Amaç
Supabase veritabanına bağlanmak için doğru connection string'i almak ve projeye eklemek.

## 📋 Adım Adım

### ADIM 1: Supabase Dashboard'a Giriş
1. https://supabase.com adresine gidin
2. Login olun
3. Projenizi seçin (sanat-matbaa)

### ADIM 2: Connection String'i Bulma
1. Sol menüden **Settings** (⚙️) tıklayın
2. **Database** sekmesine tıklayın
3. Aşağı kaydırın, **Connection Pooling** bölümünü bulun

### ADIM 3: Session Mode Connection String'i Kopyalama
1. **Connection Pooling** bölümünde **Session mode** seçin
2. **Connection string** kutusunda şu formatta bir string göreceksiniz:
   ```
   postgresql://postgres.vvhpzepcitbbwffvruos:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres?pgbouncer=true
   ```
3. Bu string'i **kopyalayın**

### ADIM 4: Password'ü Bulma
1. Aynı sayfada **Database** sekmesinde yukarı kaydırın
2. **Database password** bölümünü bulun
3. Eğer password'ü bilmiyorsanız:
   - **Reset database password** butonuna tıklayın
   - Yeni password oluşturun
   - **ÖNEMLİ:** Bu password'ü bir yere kaydedin!

### ADIM 5: Connection String'i Tamamlama
Kopyaladığınız connection string'de `[YOUR-PASSWORD]` yerine gerçek password'ü yazın:

**Örnek:**
```
postgresql://postgres.vvhpzepcitbbwffvruos:MySecurePassword123@aws-0-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true
```

### ADIM 6: .env.local Dosyasını Güncelleme
1. Proje klasöründe `.env.local` dosyasını açın
2. `DATABASE_URL` satırını bulun veya yeni ekleyin:
   ```env
   DATABASE_URL="postgresql://postgres.vvhpzepcitbbwffvruos:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres?pgbouncer=true"
   ```
3. `[PASSWORD]` yerine gerçek password'ü yazın
4. Dosyayı kaydedin

### ADIM 7: Server'ı Yeniden Başlatma
1. Terminal'de çalışan server'ı durdurun (Ctrl+C)
2. Yeniden başlatın:
   ```bash
   npm run dev
   ```

### ADIM 8: Test Etme
1. Tarayıcıda `http://localhost:3000` açın
2. Kategorilerin göründüğünü kontrol edin
3. Console'da hata olmadığını kontrol edin

## ⚠️ Önemli Notlar

1. **Password Özel Karakterler:** Eğer password'de özel karakterler varsa (ör: `@`, `#`, `%`), URL encode etmeniz gerekebilir:
   - `@` → `%40`
   - `#` → `%23`
   - `%` → `%25`
   - `&` → `%26`

2. **IPv4 vs IPv6:** Eğer "Not IPv4 compatible" hatası alıyorsanız, **Session mode** kullanın (Transaction mode değil).

3. **Connection Limit:** Connection string'in sonuna `&connection_limit=1` ekleyebilirsiniz:
   ```
   ?pgbouncer=true&connection_limit=1
   ```

## 🔍 Sorun Giderme

### Hata: "Can't reach database server"
- Connection string'deki password'ü kontrol edin
- Session mode kullandığınızdan emin olun
- Region'ın doğru olduğunu kontrol edin

### Hata: "Authentication failed"
- Password'ün doğru olduğundan emin olun
- Password'de özel karakterler varsa URL encode edin

### Kategoriler hala gelmiyor
- Server'ı yeniden başlattığınızdan emin olun
- Browser console'da hata var mı kontrol edin
- `.env.local` dosyasının proje root'unda olduğundan emin olun


