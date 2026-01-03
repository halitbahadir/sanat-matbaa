# ⚡ Hostinger Node.js - 5 Dakikada Deploy

## 🎯 Hızlı Başlangıç

### 1. GitHub'a Push (2 dakika)
```bash
git init
git add .
git commit -m "Ready for Hostinger"
git remote add origin https://github.com/yourusername/repo.git
git push -u origin main
```

### 2. Hostinger Panel (2 dakika)

1. **Websites** → **Create Website**
2. **Node.js Web Uygulaması** seç
3. **GitHub'dan dağıt** → Repository URL gir
4. **Build Command**: `npm run build`
5. **Start Command**: `node .next/standalone/server.js`

### 3. Environment Variables (1 dakika)

Hostinger panel → **Environment Variables**:
```
NODE_ENV=production
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key
```

### 4. Veritabanı (1 dakika)

1. **Databases** → PostgreSQL oluştur
2. Connection string'i `DATABASE_URL`'e ekle
3. SSH'de: `npx prisma migrate deploy`

## ✅ Tamam! Site Canlıda 🎉

**Detaylı rehber için:** `HOSTINGER_NODEJS.md` dosyasına bakın.

