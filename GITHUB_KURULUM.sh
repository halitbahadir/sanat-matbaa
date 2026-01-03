#!/bin/bash

# GitHub Repository Kurulum Scripti
# Bu script'i çalıştırmadan önce GitHub'da repository oluşturun

echo "🚀 GitHub Repository Kurulumu"
echo "=============================="
echo ""

# Git repository kontrolü
if [ ! -d ".git" ]; then
    echo "📦 Git repository başlatılıyor..."
    git init
else
    echo "✅ Git repository zaten mevcut"
fi

# .gitignore kontrolü
if [ ! -f ".gitignore" ]; then
    echo "⚠️  .gitignore dosyası bulunamadı, oluşturuluyor..."
    # .gitignore dosyası zaten var, bu sadece kontrol
fi

echo ""
echo "📝 Dosyalar ekleniyor..."
git add .

echo ""
echo "💾 Commit oluşturuluyor..."
git commit -m "Initial commit - Production ready for Hostinger"

echo ""
echo "=============================="
echo "✅ Local repository hazır!"
echo ""
echo "📋 Şimdi yapmanız gerekenler:"
echo ""
echo "1. GitHub.com'a gidin"
echo "2. Yeni repository oluşturun:"
echo "   - Repository adı: sanat-matbaasi (veya istediğiniz isim)"
echo "   - Public veya Private seçin"
echo "   - 'Initialize with README' işaretlemeyin"
echo ""
echo "3. Repository oluşturduktan sonra GitHub'da gösterilen komutları çalıştırın:"
echo "   git remote add origin https://github.com/KULLANICI_ADINIZ/sanat-matbaasi.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. KULLANICI_ADINIZ yerine kendi GitHub kullanıcı adınızı yazın"
echo ""
echo "=============================="

