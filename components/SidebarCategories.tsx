"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ChevronRight, Plus } from "lucide-react";
import { categoryIcons } from "@/lib/categoryIcons";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

// Fallback kategoriler (database bağlantısı yoksa kullanılacak)
const fallbackCategories = [
  { name: "Fırsat Ürünleri", icon: "🔥", slug: "firsat-urunleri" },
  { name: "Kişiye Özel Hediyeler", icon: "🎁", slug: "kisiye-ozel-hediyeler" },
  { name: "Kişiye Özel Kalemler", icon: "✏️", slug: "kisiye-ozel-kalemler" },
  { name: "Matbaa Ürünleri", icon: "🖨️", slug: "matbaa-urunleri" },
  { name: "Özel Günler", icon: "🎉", slug: "ozel-gunler" },
  { name: "Promosyon Toptan Alım", icon: "📦", slug: "promosyon-toptan-alim" },
  { name: "İsme Özel Ofis Hediyeleri", icon: "💼", slug: "isme-ozel-ofis-hediyeleri" },
  { name: "Teknoloji Ürünleri", icon: "💻", slug: "teknoloji-urunleri" },
  { name: "Düğün Davetiyeleri", icon: "💌", slug: "dugun-davetiyeleri" },
];

export default function SidebarCategories() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          // Eğer kategori varsa kullan, yoksa fallback kullan
          if (data && data.length > 0) {
            setCategories(data);
          } else {
            // Fallback kategorileri formatla
            setCategories(fallbackCategories.map((cat, index) => ({
              id: `fallback-${index}`,
              name: cat.name,
              slug: cat.slug,
              description: null,
            })));
          }
        } else {
          // API hatası durumunda fallback kullan
          setCategories(fallbackCategories.map((cat, index) => ({
            id: `fallback-${index}`,
            name: cat.name,
            slug: cat.slug,
            description: null,
          })));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Hata durumunda fallback kullan
        setCategories(fallbackCategories.map((cat, index) => ({
          id: `fallback-${index}`,
          name: cat.name,
          slug: cat.slug,
          description: null,
        })));
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="w-full md:w-64 flex-shrink-0">
      <div className="bg-red-600 text-white px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-2">
          <Menu size={18} className="sm:w-5 sm:h-5" />
          <span className="font-bold text-xs sm:text-sm">KATEGORİLERDEN ALIŞVERİŞ YAP</span>
        </div>
        <Menu size={18} className="sm:w-5 sm:h-5 md:hidden" />
      </div>
      
      <div className={`bg-white border border-gray-200 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <ul className="divide-y divide-gray-200">
          {loading ? (
            <li className="px-3 sm:px-4 py-2.5 sm:py-3 text-center text-gray-500 text-xs sm:text-sm">
              Kategoriler yükleniyor...
            </li>
          ) : categories.length === 0 ? (
            <li className="px-3 sm:px-4 py-2.5 sm:py-3 text-center text-gray-500 text-xs sm:text-sm">
              Kategori bulunamadı
            </li>
          ) : (
            categories.map((category) => {
              // Fallback kategoriler için icon'u fallbackCategories'den al
              const fallbackCat = fallbackCategories.find(c => c.slug === category.slug);
              const icon = categoryIcons[category.slug] || fallbackCat?.icon || "📦";
              return (
                <li key={category.id}>
                  <Link
                    href={`/kategori/${category.slug}`}
                    className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 transition group"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-lg sm:text-xl">{icon}</span>
                      <span className="text-xs sm:text-sm text-gray-700 group-hover:text-primary-600">{category.name}</span>
                    </div>
                  </Link>
                </li>
              );
            })
          )}
          <li>
            <Link
              href="/kategori"
              className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 transition group"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Plus size={14} className="sm:w-4 sm:h-4 text-gray-400" />
                <span className="text-xs sm:text-sm text-gray-700 group-hover:text-primary-600">Daha Fazla Gör</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
