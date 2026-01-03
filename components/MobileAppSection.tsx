import Link from "next/link";

export default function MobileAppSection() {
  return (
    <div className="bg-white py-12 sm:py-16 border-t border-gray-200">
      <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              SM Sanat Matbaası Uygulaması ile Daha Hızlı Alışveriş
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
              iOS ve Android için mevcut
            </p>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Uygulamamızı bugün indirin ve hızlı alışveriş yapın. 
              Özel kampanyalar ve kolay sipariş takibi.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <button className="bg-gray-900 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2 text-sm sm:text-base">
                <span>📱</span>
                <div className="text-left">
                  <div className="text-[10px] sm:text-xs">Google Play'den</div>
                  <div className="text-xs sm:text-sm font-bold">İndir</div>
                </div>
              </button>
              <button className="bg-gray-900 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2 text-sm sm:text-base">
                <span>📱</span>
                <div className="text-left">
                  <div className="text-[10px] sm:text-xs">App Store'dan</div>
                  <div className="text-xs sm:text-sm font-bold">İndir</div>
                </div>
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-3 sm:gap-4">
            <div className="bg-gray-100 rounded-2xl p-3 sm:p-4 w-24 h-48 sm:w-32 sm:h-64 flex items-center justify-center text-3xl sm:text-4xl">
              📱
            </div>
            <div className="bg-gray-100 rounded-2xl p-3 sm:p-4 w-24 h-48 sm:w-32 sm:h-64 flex items-center justify-center text-3xl sm:text-4xl mt-4 sm:mt-8">
              📱
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
