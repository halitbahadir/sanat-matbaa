export default function TestimonialSection() {
  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center text-2xl sm:text-3xl">
              👤
            </div>
          </div>
          <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-800 leading-relaxed mb-4 sm:mb-6 px-4">
            "Tüm matbaa ihtiyaçlarınız için. Broşürlerinizi, kartvizitlerinizi, davetiyelerinizi 
            ve etkinlik programlarınızı tasarlayıp basıyoruz. Sadece mürekkep değil... Çözümler."
          </blockquote>
          <div className="text-gray-600">
            <p className="font-semibold text-sm sm:text-base">Eddy M.</p>
            <p className="text-xs sm:text-sm">Liff'te Tasarımcı</p>
          </div>
        </div>
      </div>
    </div>
  );
}
