"use client";

import { useCart } from "@/store/cartStore";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-6 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sepetiniz Boş</h2>
        <p className="text-gray-600 mb-6">
          Sepetinize henüz ürün eklenmemiş.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Sepetim</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded flex items-center justify-center flex-shrink-0">
                <div className="text-4xl">📦</div>
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                <div className="text-lg font-bold text-primary-600 mb-4">
                  {item.price.toFixed(2)}₺
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 border border-gray-300 rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-3 py-1 min-w-[3rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">
                  {(item.price * item.quantity).toFixed(2)}₺
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Sipariş Özeti
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Ara Toplam</span>
                <span>{getTotal().toFixed(2)}₺</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Kargo</span>
                <span className="text-green-600">Ücretsiz</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold">
                <span>Toplam</span>
                <span className="text-primary-600">{getTotal().toFixed(2)}₺</span>
              </div>
            </div>
            <Link
              href="/odeme"
              className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center px-6 py-3 rounded-md font-semibold transition mb-3"
            >
              Ödemeye Geç
            </Link>
            <button
              onClick={clearCart}
              className="w-full text-gray-600 hover:text-gray-800 text-sm"
            >
              Sepeti Temizle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

