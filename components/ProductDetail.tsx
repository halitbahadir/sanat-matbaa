"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Truck, Palette, Minus, Plus } from "lucide-react";
import { useCart } from "@/store/cartStore";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category?: string;
}

interface ProductDetailProps {
  productId: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    // Simüle edilmiş ürün verisi - gerçek uygulamada API'den gelecek
    const mockProduct: Product = {
      id: productId,
      name: "506 Plastik Kalem",
      price: 8.5,
      image: "/products/kalem-506.jpg",
      description:
        "Yüksek kaliteli plastik malzemeden üretilmiş, kişiye özel baskılı kalem. Şirketinizin logosu veya özel mesajınızla basılabilir.",
      category: "firsat",
    };

    setTimeout(() => {
      setProduct(mockProduct);
      setLoading(false);
    }, 300);
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-6 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-6 py-8 text-center">
        <p className="text-gray-500 text-lg">Ürün bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 via-blue-100 to-pink-100">
            <div className="absolute top-4 left-4 bg-brown-800 p-2 rounded">
              <span className="text-gold-500 font-bold">SM</span>
            </div>
            <div className="text-9xl">📦</div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <div className="flex-1 bg-green-500 text-white text-sm px-3 py-2 rounded flex items-center gap-2">
              <Truck size={16} />
              <span>Ücretsiz Kargo</span>
            </div>
            <div className="flex-1 bg-blue-500 text-white text-sm px-3 py-2 rounded flex items-center gap-2">
              <Palette size={16} />
              <span>Ücretsiz Tasarım</span>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <div className="text-4xl font-bold text-primary-600 mb-6">
            {product.price.toFixed(2)}₺
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adet
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                <Minus size={20} />
              </button>
              <span className="text-xl font-semibold w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 rounded-md flex items-center justify-center gap-2 text-lg font-semibold transition"
          >
            <ShoppingCart size={24} />
            <span>Sepete Ekle</span>
          </button>

          {/* Features */}
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="text-green-600 mt-1">✓</div>
              <div>
                <div className="font-semibold">Ücretsiz Kargo</div>
                <div className="text-sm text-gray-600">
                  Tüm siparişlerinizde ücretsiz kargo
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-green-600 mt-1">✓</div>
              <div>
                <div className="font-semibold">Ücretsiz Tasarım</div>
                <div className="text-sm text-gray-600">
                  Logo ve tasarım hizmeti ücretsiz
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-green-600 mt-1">✓</div>
              <div>
                <div className="font-semibold">Hızlı Teslimat</div>
                <div className="text-sm text-gray-600">
                  Siparişleriniz hızlıca hazırlanır
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

