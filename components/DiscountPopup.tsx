"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

export default function DiscountPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Hide on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    // LocalStorage'dan kontrol et - daha önce gösterildi mi?
    const hasSeenPopup = localStorage.getItem("hasSeenDiscountPopup");
    
    if (!hasSeenPopup) {
      // 1 saniye sonra popup'ı göster
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // LocalStorage'a kaydet - bir daha gösterme
    localStorage.setItem("hasSeenDiscountPopup", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full relative animate-fade-in animate-zoom-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
          aria-label="Kapat"
        >
          <X size={24} className="text-gray-600" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-4">
              <span className="text-4xl">🎉</span>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Özel İndirim!
          </h2>
          
          <p className="text-xl text-gray-700 mb-6">
            Websiteden siparişe özel <span className="text-red-600 font-bold text-2xl">%15 İndirim</span>
          </p>
          
          <p className="text-sm text-gray-600 mb-6">
            Websiteden siparişe özel %15 indirim fırsatını kaçırmayın!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleClose}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Hemen Alışverişe Başla
            </button>
        
          </div>
        </div>
      </div>
    </div>
  );
}

