"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Truck, Palette } from "lucide-react";
import { useCart } from "@/store/cartStore";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      <Link href={`/urun/${product.id}`}>
        <div className="relative aspect-square bg-gradient-to-br from-orange-100 to-orange-200">
          {/* Placeholder image - gerçek uygulamada Next.js Image kullanılacak */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 via-blue-100 to-pink-100">
            <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-brown-800 p-0.5 sm:p-1 rounded">
              <span className="text-gold-500 text-[10px] sm:text-xs font-bold">SM</span>
            </div>
            <div className="text-4xl sm:text-5xl md:text-6xl">📦</div>
          </div>
          <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2 flex gap-1 sm:gap-2">
            <div className="flex-1 bg-green-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex items-center gap-0.5 sm:gap-1">
              <Truck size={10} className="sm:w-3 sm:h-3" />
              <span className="hidden xs:inline">Ücretsiz Kargo</span>
            </div>
            <div className="flex-1 bg-blue-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex items-center gap-0.5 sm:gap-1">
              <Palette size={10} className="sm:w-3 sm:h-3" />
              <span className="hidden xs:inline">Ücretsiz Tasarım</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="p-3 sm:p-4">
        <Link href={`/urun/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2 hover:text-primary-600 transition text-sm sm:text-base">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3 sm:mt-4 gap-2">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600">
            {product.price.toFixed(2)}₺
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-primary-600 hover:bg-primary-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 transition text-xs sm:text-sm"
          >
            <ShoppingCart size={14} className="sm:w-[18px] sm:h-[18px]" />
            <span className="hidden sm:inline">Sepete Ekle</span>
            <span className="sm:hidden">Ekle</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
