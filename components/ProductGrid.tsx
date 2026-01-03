"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

interface ProductGridProps {
  category?: string;
}

export default function ProductGrid({ category }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simüle edilmiş ürün verileri - gerçek uygulamada API'den gelecek
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "506 Plastik Kalem",
        price: 8.5,
        image: "/products/kalem-506.jpg",
        category: "firsat",
        description: "Kişiye özel baskılı plastik kalem",
      },
      {
        id: "2",
        name: "FİYAT-PERFORMANS ÜRÜNÜ | En çok tercih edilen",
        price: 5.25,
        image: "/products/kalem-fiyat-performans.jpg",
        category: "firsat",
        description: "Ekonomik ve kaliteli plastik kalem",
      },
      {
        id: "3",
        name: "Klipsli Plastik Kalem",
        price: 8.5,
        image: "/products/kalem-klipsli.jpg",
        category: "firsat",
        description: "Klipsli özel tasarım plastik kalem",
      },
      {
        id: "4",
        name: "1506 Kalem - 300 Adet",
        price: 7.0,
        image: "/products/kalem-1506.jpg",
        category: "firsat",
        description: "Toplu alım için özel fiyat",
      },
      {
        id: "5",
        name: "Özel Baskılı Çakmak",
        price: 12.0,
        image: "/products/cakmak-ozel.jpg",
        category: "firsat",
        description: "Kişiye özel logo baskılı çakmak",
      },
      {
        id: "6",
        name: "Siyah Özel Baskılı Çakmak",
        price: 12.0,
        image: "/products/cakmak-siyah.jpg",
        category: "firsat",
        description: "Siyah renk özel baskılı çakmak",
      },
    ];

    // Kategoriye göre filtrele
    const filteredProducts = category
      ? mockProducts.filter((p) => p.category === category)
      : mockProducts;

    setTimeout(() => {
      setProducts(filteredProducts);
      setLoading(false);
    }, 500);
  }, [category]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 animate-pulse rounded-lg h-80"
          ></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Bu kategoride ürün bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

