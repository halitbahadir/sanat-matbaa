"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronRight, Plus } from "lucide-react";

const categories = [
  { name: "Kartvizitler", icon: "💼", path: "/kategori/kartvizitler" },
  { name: "Kitaplar", icon: "📚", path: "/kategori/kitaplar" },
  { name: "Katalog", icon: "📖", path: "/kategori/katalog", hasSubmenu: true },
  { name: "Online Tasarım", icon: "🎨", path: "/kategori/online-tasarim" },
  { name: "Belgeler", icon: "📄", path: "/kategori/belgeler" },
  { name: "Kitaplar", icon: "📚", path: "/kategori/kitaplar" },
  { name: "Dekorasyon", icon: "🎭", path: "/kategori/dekorasyon" },
  { name: "Davetiyeler", icon: "💌", path: "/kategori/davetiyeler" },
  { name: "Biletler", icon: "🎫", path: "/kategori/biletler" },
];

export default function SidebarCategories() {
  const [isOpen, setIsOpen] = useState(false);

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
          {categories.map((category, index) => (
            <li key={index}>
              <Link
                href={category.path}
                className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 transition group"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-lg sm:text-xl">{category.icon}</span>
                  <span className="text-xs sm:text-sm text-gray-700 group-hover:text-primary-600">{category.name}</span>
                </div>
                {category.hasSubmenu && (
                  <ChevronRight size={14} className="sm:w-4 sm:h-4 text-gray-400" />
                )}
              </Link>
            </li>
          ))}
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
