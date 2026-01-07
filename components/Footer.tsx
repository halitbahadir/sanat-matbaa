"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo & Social Media */}
          <div>
            <div className="mb-3 sm:mb-4">
              <Logo />
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
              Kişiye özel ürünler ve promosyon ürünleri konusunda uzman ekibimizle hizmetinizdeyiz.
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="#" className="p-1.5 sm:p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition text-xs sm:text-sm font-semibold" title="Facebook">
                f
              </a>
              <a href="#" className="p-1.5 sm:p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition text-xs sm:text-sm font-semibold" title="Twitter">
                𝕏
              </a>
              <a
                href="https://instagram.com/sanatmatbaasi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition text-sm"
                title="Instagram"
              >
                📷
              </a>
              <a href="#" className="p-1.5 sm:p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition text-xs sm:text-sm font-semibold" title="Pinterest">
                P
              </a>
            </div>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-lg">İletişim</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 sm:mt-1 flex-shrink-0" />
                <span>info@sanatmatbaasi.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 sm:mt-1 flex-shrink-0" />
                <span>0532 622 33 67</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 sm:mt-1 flex-shrink-0" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-lg">Hizmetler</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <Link href="/hakkimizda" className="hover:text-primary-400 transition">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-400 transition">
                  Blogumuz
                </Link>
              </li>
              <li>
                <Link href="/iade" className="hover:text-primary-400 transition">
                  İade Başlat
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-primary-400 transition">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/kargo-sss" className="hover:text-primary-400 transition">
                  Kargo SSS
                </Link>
              </li>
            </ul>
          </div>

          {/* Instagram Feed */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-lg">Instagram</h4>
            <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">@sanatmatbaasi</p>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-800 rounded hover:opacity-80 transition cursor-pointer"
                >
                  <div className="w-full h-full flex items-center justify-center text-gray-600 text-lg sm:text-xl">
                    📷
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-gray-400">
              &copy; {new Date().getFullYear()} SM Sanat Matbaası. Tüm hakları saklıdır.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
              <Link href="/gizlilik-politikasi" className="hover:text-primary-400 transition">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-kosullari" className="hover:text-primary-400 transition">
                Kullanım Koşulları
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs text-gray-500">Ödeme:</span>
              <div className="flex items-center gap-1">
                <div className="w-6 h-4 sm:w-8 sm:h-5 bg-gray-700 rounded text-[8px] sm:text-xs flex items-center justify-center">V</div>
                <div className="w-6 h-4 sm:w-8 sm:h-5 bg-gray-700 rounded text-[8px] sm:text-xs flex items-center justify-center">M</div>
                <div className="w-6 h-4 sm:w-8 sm:h-5 bg-gray-700 rounded text-[8px] sm:text-xs flex items-center justify-center">AP</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
