import { NextResponse } from "next/server";

// Simüle edilmiş ürün verileri - gerçek uygulamada veritabanından gelecek
const products = [
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let filteredProducts = products;

  if (category) {
    filteredProducts = products.filter((p) => p.category === category);
  }

  return NextResponse.json(filteredProducts);
}

