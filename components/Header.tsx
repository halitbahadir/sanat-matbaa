"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, ShoppingCart, User, Phone, MapPin, Star, Menu } from "lucide-react";
import CategoryNav from "./CategoryNav";
import Logo from "./Logo";
import { useCart } from "@/store/cartStore";

export default function Header() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items } = useCart();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Hide header on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* Top Bar - First Row (Very Thin) */}
      <div className="bg-gray-50 border-b border-gray-200 py-1.5">
        <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 flex justify-between items-center text-xs text-gray-600">
          <div className="flex items-center gap-1 sm:gap-2">
            <MapPin size={12} />
            <span className="hidden sm:inline">Mağaza Bul</span>
            <span className="sm:hidden">Mağaza</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <a href="#" className="hover:text-primary-600 transition text-xs" title="Facebook">f</a>
            <a href="#" className="hover:text-primary-600 transition text-xs" title="Twitter">𝕏</a>
            <a href="https://instagram.com/sanatmatbaasi" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition text-xs" title="Instagram">📷</a>
            <a href="#" className="hover:text-primary-600 transition text-xs hidden sm:inline" title="Youtube">▶</a>
          </div>
        </div>
      </div>

      {/* Top Bar - Second Row */}
      <div className="bg-white border-b border-gray-200 py-2">
        <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-6">
          <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
            {/* Left side - col-8 */}
            <div className="col-span-8 sm:col-span-8 flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2 text-gray-700">
                <Phone size={12} className="sm:w-[14px] sm:h-[14px]" />
                <span className="font-medium text-xs sm:text-sm">Hotline: 0532 622 33 67</span>
              </div>
              <span className="text-gray-600 text-xs hidden lg:inline">Siparişinizi ücretsiz teslim alın</span>
            </div>
            
            {/* Right side - col-4 */}
            <div className="col-span-4 sm:col-span-4 flex items-center justify-end gap-1 sm:gap-3">
              <Link href="/giris" className="p-1 sm:p-1.5 hover:bg-gray-100 rounded transition" aria-label="Kullanıcı">
                <User size={14} className="sm:w-4 sm:h-4 text-gray-700" />
              </Link>
              <Link href="/favoriler" className="relative p-1 sm:p-1.5 hover:bg-gray-100 rounded transition" aria-label="Favoriler">
                <Star size={14} className="sm:w-4 sm:h-4 text-gray-700" />
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-600 text-white text-[8px] sm:text-[10px] rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link href="/sepet" className="relative p-1 sm:p-1.5 hover:bg-gray-100 rounded transition" aria-label="Sepet">
                <ShoppingCart size={14} className="sm:w-4 sm:h-4 text-gray-700" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-600 text-white text-[8px] sm:text-[10px] rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded transition"
              aria-label="Menü"
            >
              <Menu size={24} className="text-gray-700" />
            </button>

            {/* Logo */}
            <Logo />

            {/* Search Bar */}
            <div className="flex-1 hidden md:block">
              <div className="relative flex">
                <input
                  type="text"
                  placeholder="Ne arıyorsunuz?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-300 rounded-l-lg focus:outline-none focus:border-primary-500 text-sm"
                />
                <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-r-lg font-semibold transition text-sm">
                  Ara
                </button>
              </div>
            </div>

            {/* Mobile Search Button */}
            <Link
              href="/arama"
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Ara"
            >
              <Search size={20} className="text-gray-700" />
            </Link>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <CategoryNav />
    </header>
  );
}
