import { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductShowcaseCards from "@/components/ProductShowcaseCards";
import DealOfTheDay from "@/components/DealOfTheDay";
import PopularCategories from "@/components/PopularCategories";
import TestimonialSection from "@/components/TestimonialSection";
import MobileAppSection from "@/components/MobileAppSection";
import ProductColumns from "@/components/ProductColumns";
import BlogSection from "@/components/BlogSection";
import SidebarCategories from "@/components/SidebarCategories";

export const metadata: Metadata = {
  title: "SM Sanat Matbaası - Tüm Matbaa Çözümleri",
  description: "Kişiye özel ürünler, promosyon ürünleri ve profesyonel matbaa hizmetleri. Ücretsiz kargo ve ücretsiz tasarım.",
};

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section with Sidebar */}
      <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Sidebar - col-3 */}
          <div className="md:col-span-3">
            <SidebarCategories />
          </div>
          
          {/* Right Hero Section - col-9 */}
          <div className="md:col-span-9">
            <HeroSection />
          </div>
        </div>
      </div>
      
      <FeaturesSection />
      <ProductShowcaseCards />
      <DealOfTheDay />
      <PopularCategories />
      <TestimonialSection />
      <MobileAppSection />
      <ProductColumns />
      <BlogSection />

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-pink-500 to-orange-500 py-12 sm:py-16">
        <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Bülten</h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/95">
              Bültenimize abone olun ve yeni ürünler, kampanyalar ve özel tekliflerden 
              ilk siz haberdar olun.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 sm:gap-2">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 sm:px-5 py-3 sm:py-4 rounded-lg text-gray-900 focus:outline-none text-sm sm:text-base"
              />
              <button className="bg-white text-orange-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg font-bold hover:bg-gray-100 transition text-sm sm:text-base whitespace-nowrap">
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Printed and Shipped On Demand */}
      <div className="bg-gradient-to-r from-pink-100 to-orange-100 py-8 sm:py-12">
        <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Talep Üzerine Basılıp Gönderilir!
              </h2>
              <Link
                href="/hizmetlerimiz"
                className="text-primary-600 hover:text-primary-700 font-semibold text-base sm:text-lg"
              >
                Hizmetlerimiz →
              </Link>
            </div>
            <div className="flex justify-center gap-2 sm:gap-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-lg flex items-center justify-center text-2xl sm:text-3xl md:text-4xl shadow-sm">📦</div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-lg flex items-center justify-center text-2xl sm:text-3xl md:text-4xl shadow-sm">📄</div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-lg flex items-center justify-center text-2xl sm:text-3xl md:text-4xl shadow-sm">🎁</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
