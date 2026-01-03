"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function DealOfTheDay() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      const distance = tomorrow.getTime() - now;

      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dealProducts = [
    {
      id: "1",
      name: "Mavi Broşür",
      price: 16.0,
      image: "/products/brosur-mavi.jpg",
      category: "matbaa",
    },
    {
      id: "2",
      name: "Yeşil Katalog",
      price: 18.0,
      image: "/products/katalog-yesil.jpg",
      category: "matbaa",
    },
    {
      id: "3",
      name: "Yaratıcı Yaşam",
      price: 18.0,
      image: "/products/yaratici-yasam.jpg",
      category: "matbaa",
    },
    {
      id: "4",
      name: "Sarı Davetiye Kartları",
      price: 12.0,
      image: "/products/davetiye-sari.jpg",
      category: "ozel-gunler",
    },
  ];

  return (
    <div className="bg-white py-8 sm:py-12">
      <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Günün Fırsatı</h2>
            <div className="flex items-center gap-2 bg-red-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
              <span className="text-xs sm:text-sm font-semibold text-red-600">Kalan Süre:</span>
              <div className="flex items-center gap-1 font-mono text-sm sm:text-lg font-bold text-red-600">
                <span>{String(timeLeft.hours).padStart(2, "0")}</span>
                <span>:</span>
                <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span>:</span>
                <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
          <Link
            href="/kategori/firsat-urunleri"
            className="text-primary-600 hover:text-primary-700 font-semibold text-sm sm:text-base whitespace-nowrap"
          >
            Tümünü Gör →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
