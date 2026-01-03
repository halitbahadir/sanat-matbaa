import Link from "next/link";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
}

export default function ProductColumns() {
  const bestSeller: Product[] = [
    { id: "1", name: "Kahve Kupası", price: 25.0, image: "/products/kahve-kupasi.jpg", rating: 5 },
    { id: "2", name: "Kutu Paketi", price: 15.0, image: "/products/kutu-paketi.jpg", rating: 4 },
    { id: "3", name: "Mavi Broşür", price: 16.0, image: "/products/brosur-mavi.jpg", rating: 5 },
  ];

  const topSale: Product[] = [
    { id: "4", name: "Kurumsal Üçlü Paket", price: 35.0, image: "/products/kurumsal-uclu.jpg" },
    { id: "5", name: "Şık Kartvizit", price: 12.0, image: "/products/kartvizit-sik.jpg" },
    { id: "6", name: "Özel Tasarım Kutu", price: 20.0, image: "/products/ozel-tasarim-kutu.jpg" },
  ];

  const topRated: Product[] = [
    { id: "7", name: "Promosyon Kalem", price: 8.5, image: "/products/promosyon-kalem.jpg", rating: 5 },
    { id: "8", name: "Düğün Davetiyesi", price: 15.0, image: "/products/dugun-davetiyesi.jpg", rating: 5 },
    { id: "9", name: "Elegant Kartvizit", price: 18.0, image: "/products/elegant-kartvizit.jpg", rating: 4 },
  ];

  return (
    <div className="bg-white py-8 sm:py-12">
      <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Best Seller Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-2 border-primary-600">
              EN ÇOK SATAN
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {bestSeller.map((product) => (
                <div key={product.id} className="flex gap-2 sm:gap-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-xl sm:text-2xl">📦</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1 line-clamp-2">{product.name}</h4>
                    <div className="flex items-center gap-1 mb-1">
                      {product.rating && [...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-[10px] sm:text-xs">★</span>
                      ))}
                    </div>
                    <p className="text-primary-600 font-bold text-sm sm:text-base">{product.price.toFixed(2)}₺</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Sale Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-2 border-red-600">
              EN ÇOK SATAN
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {topSale.map((product) => (
                <div key={product.id} className="flex gap-2 sm:gap-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-xl sm:text-2xl">📦</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1 line-clamp-2">{product.name}</h4>
                    <p className="text-primary-600 font-bold text-sm sm:text-base">{product.price.toFixed(2)}₺</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Rated Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-2 border-yellow-600">
              EN ÇOK BEĞENİLEN
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {topRated.map((product) => (
                <div key={product.id} className="flex gap-2 sm:gap-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-xl sm:text-2xl">📦</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1 line-clamp-2">{product.name}</h4>
                    <div className="flex items-center gap-1 mb-1">
                      {product.rating && [...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-[10px] sm:text-xs">★</span>
                      ))}
                    </div>
                    <p className="text-primary-600 font-bold text-sm sm:text-base">{product.price.toFixed(2)}₺</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Promo Banner */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl p-4 sm:p-6 h-full flex flex-col justify-between">
              <div>
                <div className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold inline-block mb-3 sm:mb-4">
                  %20 İNDİRİM
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Kraft Kağıt Posta Paketi</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Özel tasarım kraft kağıt paketler</p>
              </div>
              <Link
                href="/kategori/paketleme"
                className="bg-white text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-center block text-sm sm:text-base"
              >
                Alışverişe Başla
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
