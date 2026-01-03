"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 overflow-hidden rounded-lg">
      <div className="px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white z-10"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              Tüm Matbaa Çözümleri İçin
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 text-white/95 leading-relaxed">
              Kişiye özel ürünler, promosyon ürünleri ve profesyonel matbaa hizmetleri. 
              Kaliteli baskı çözümleri ile ihtiyaçlarınızı karşılıyoruz.
            </p>
            <Link
              href="/kategori/firsat-urunleri"
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-50 transition shadow-xl"
            >
              Alışverişe Başla
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </Link>
          </motion.div>

          {/* Right Side - Product Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-xl p-6 sm:p-8 md:p-10 shadow-2xl relative max-w-md mx-auto">
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-green-500 text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm shadow-lg">
                ₺8.00 Tasarruf
              </div>
              <div className="text-center pt-2 sm:pt-4">
                <div className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6">📦</div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">ÜCRETSİZ PAKET TASARIMI</h3>
                <p className="text-gray-600 text-sm sm:text-base">Kişiye özel paket tasarımı ve baskı hizmeti</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
