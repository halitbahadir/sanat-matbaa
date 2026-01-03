# 🚀 Projeyi Çalıştırma Rehberi

## Adım 1: Terminal'i Açın
- Mac'te: `Cmd + Space` tuşlarına basın, "Terminal" yazın ve Enter'a basın
- Veya Finder'dan Applications > Utilities > Terminal'i açın

## Adım 2: Proje Klasörüne Gidin
Terminal'de şu komutu yazın ve Enter'a basın:

```bash
cd /Users/user/Desktop/E-commerce
```

## Adım 3: Node.js'i Yükleyin (Her Yeni Terminal İçin)
Terminal'de şu komutları sırayla çalıştırın:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

Bu komutlar Node.js'i terminal oturumunuza yükler.

## Adım 4: Node.js ve npm'in Çalıştığını Kontrol Edin
```bash
node --version
npm --version
```

Her iki komut da bir versiyon numarası göstermelidir (örneğin: v24.12.0 ve 11.6.2)

## Adım 5: Bağımlılıkları Yükleyin (İlk Kez Çalıştırıyorsanız)
```bash
npm install
```

Bu işlem birkaç dakika sürebilir. Tüm paketlerin yüklendiğini göreceksiniz.

## Adım 6: Development Server'ı Başlatın
```bash
npm run dev
```

Bu komutu çalıştırdığınızda şu çıktıyı göreceksiniz:

```
  ▲ Next.js 14.2.35
  - Local:        http://localhost:3000
  - ready started server on 0.0.0.0:3000
```

## Adım 7: Tarayıcıda Açın
1. Tarayıcınızı açın (Chrome, Safari, Firefox vb.)
2. Adres çubuğuna şunu yazın: `http://localhost:3000`
3. Enter'a basın

## ✅ Başarılı!
Artık e-ticaret siteniz çalışıyor! Ana sayfayı göreceksiniz.

---

## 🔧 Sorun Giderme

### Problem: "command not found: npm" veya "command not found: node"
**Çözüm:** Adım 3'ü tekrar çalıştırın:
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### Problem: "Port 3000 is already in use"
**Çözüm:** Farklı bir port kullanın:
```bash
PORT=3001 npm run dev
```
Sonra tarayıcıda `http://localhost:3001` adresini açın.

### Problem: "Cannot find module" hatası
**Çözüm:** Cache'i temizleyin ve yeniden yükleyin:
```bash
rm -rf .next
rm -rf node_modules
npm install
npm run dev
```

### Problem: Sayfa yüklenmiyor veya hata veriyor
**Çözüm:** 
1. Terminal'de `Ctrl + C` ile server'ı durdurun
2. Cache'i temizleyin: `rm -rf .next`
3. Tekrar başlatın: `npm run dev`

---

## 📝 Notlar

- **Server'ı Durdurmak İçin:** Terminal'de `Ctrl + C` tuşlarına basın
- **Her Yeni Terminal:** Adım 3'ü (Node.js yükleme) tekrar çalıştırmanız gerekebilir
- **Değişiklik Yaptıktan Sonra:** Next.js otomatik olarak sayfayı yeniler (hot reload)

---

## 🎯 Hızlı Komutlar (Kopyala-Yapıştır)

Tüm adımları tek seferde çalıştırmak için:

```bash
cd /Users/user/Desktop/E-commerce && export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && npm run dev
```

Bu komut projeyi direkt başlatır!

