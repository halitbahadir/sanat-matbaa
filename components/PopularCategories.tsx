import Link from "next/link";
import { Book, CreditCard, Package, Shirt } from "lucide-react";

const categories = [
  { name: "Kitaplar", icon: Book, slug: "kitaplar", color: "bg-blue-100 text-blue-600" },
  { name: "Kartvizitler", icon: CreditCard, slug: "kartvizitler", color: "bg-green-100 text-green-600" },
  { name: "Paketleme", icon: Package, slug: "paketleme", color: "bg-purple-100 text-purple-600" },
  { name: "Tişört", icon: Shirt, slug: "tisort", color: "bg-pink-100 text-pink-600" },
];

export default function PopularCategories() {
  return (
    <div className="bg-gray-50 py-8 sm:py-12">
      <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Popüler Kategoriler</h2>
          <Link
            href="/kategori/firsat-urunleri"
            className="text-primary-600 hover:text-primary-700 font-semibold text-sm sm:text-base whitespace-nowrap"
          >
            Tümünü Gör →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/kategori/${category.slug}`}
              className="bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition text-center group"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full ${category.color} mb-3 sm:mb-4 group-hover:scale-110 transition`}>
                <category.icon size={32} className="sm:w-10 sm:h-10" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
