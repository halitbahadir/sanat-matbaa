import Link from "next/link";
import ProductCard from "./ProductCard";

interface ProductShowcaseProps {
  title: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    category?: string;
  }>;
  badge?: string;
  badgeColor?: string;
}

export default function ProductShowcase({ title, products, badge, badgeColor = "bg-red-500" }: ProductShowcaseProps) {
  return (
    <div className="bg-white py-8">
      <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            {badge && (
              <span className={`${badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                {badge}
              </span>
            )}
          </div>
          <Link
            href="/kategori/firsat-urunleri"
            className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
          >
            Alışverişe Başla →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

