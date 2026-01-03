import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductShowcaseCards() {
  return (
    <div className="bg-white py-8 sm:py-12">
      <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {/* BEST SELLER - Colorful Sticker Pack */}
          <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 sm:p-8 overflow-hidden group hover:shadow-xl transition">
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold">
              EN ÇOK SATAN
            </div>
            <div className="text-center mb-4 sm:mb-6">
              <div className="text-6xl sm:text-8xl mb-3 sm:mb-4">🎨</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Renkli Sticker Paketi</h3>
            </div>
            <Link
              href="/kategori/firsat-urunleri"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition w-full justify-center text-sm sm:text-base"
            >
              Alışverişe Başla
              <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
            </Link>
          </div>

          {/* SAVE 30% - Gift Card */}
          <div className="relative bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-6 sm:p-8 overflow-hidden group hover:shadow-xl transition">
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold">
              %30 İNDİRİM
            </div>
            <div className="text-center mb-4 sm:mb-6">
              <div className="text-6xl sm:text-8xl mb-3 sm:mb-4">🎁</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Arkadaşınız İçin Hediye Kartı</h3>
            </div>
            <Link
              href="/kategori/kisiye-ozel-hediyeler"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition w-full justify-center text-sm sm:text-base"
            >
              Alışverişe Başla
              <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
            </Link>
          </div>

          {/* SAVE 50% - Cardboard Package Box */}
          <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 sm:p-8 overflow-hidden group hover:shadow-xl transition">
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold">
              %50 İNDİRİM
            </div>
            <div className="text-center mb-4 sm:mb-6">
              <div className="text-6xl sm:text-8xl mb-3 sm:mb-4">📦</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Karton Paket Kutusu</h3>
            </div>
            <Link
              href="/kategori/paketleme"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition w-full justify-center text-sm sm:text-base"
            >
              Alışverişe Başla
              <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
