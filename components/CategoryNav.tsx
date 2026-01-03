"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, ChevronDown } from "lucide-react";

const categories = [
  { name: "Ana Sayfa", slug: "home", path: "/" },
  { name: "SM Sanat", slug: "sm-sanat", path: "/hakkimizda", hasDropdown: true },
  { name: "Mağaza", slug: "magaza", path: "/kategori/firsat-urunleri", hasDropdown: true },
  { name: "Blog", slug: "blog", path: "/blog", hasDropdown: true },
  { name: "Sayfalar", slug: "sayfalar", path: "/hakkimizda", hasDropdown: true },
];

export default function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-between py-2 sm:py-3 overflow-x-auto">
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 min-w-max">
            {categories.map((category) => {
              const isActive =
                (category.path === "/" && pathname === "/") ||
                (category.path !== "/" && pathname?.startsWith(category.path));

              return (
                <Link
                  key={category.slug}
                  href={category.path}
                  className={`text-xs sm:text-sm font-medium transition flex items-center gap-1 whitespace-nowrap ${
                    isActive
                      ? "text-primary-600"
                      : "text-gray-700 hover:text-primary-600"
                  }`}
                >
                  {category.name}
                  {category.hasDropdown && <ChevronDown size={12} className="sm:w-3.5 sm:h-3.5" />}
                </Link>
              );
            })}
          </div>
          
          {/* Hot Extra Sale */}
          <Link
            href="/kategori/firsat-urunleri"
            className="flex items-center gap-1 sm:gap-2 text-red-600 hover:text-red-700 font-semibold text-xs sm:text-sm whitespace-nowrap ml-4"
          >
            <Flame size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Hot Extra Sale %30 İndirim</span>
            <span className="sm:hidden">%30 İndirim</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
