import { NextResponse } from "next/server";

// Simüle edilmiş ürün verileri
const products = [
  {
    id: "1",
    name: "506 Plastik Kalem",
    price: 8.5,
    image: "/products/kalem-506.jpg",
    category: "firsat",
    description:
      "Yüksek kaliteli plastik malzemeden üretilmiş, kişiye özel baskılı kalem. Şirketinizin logosu veya özel mesajınızla basılabilir.",
  },
  {
    id: "2",
    name: "FİYAT-PERFORMANS ÜRÜNÜ | En çok tercih edilen",
    price: 5.25,
    image: "/products/kalem-fiyat-performans.jpg",
    category: "firsat",
    description: "Ekonomik ve kaliteli plastik kalem. Toplu alımlar için ideal.",
  },
  {
    id: "3",
    name: "Klipsli Plastik Kalem",
    price: 8.5,
    image: "/products/kalem-klipsli.jpg",
    category: "firsat",
    description: "Klipsli özel tasarım plastik kalem. Cebinizde taşıması kolay.",
  },
  {
    id: "4",
    name: "1506 Kalem - 300 Adet",
    price: 7.0,
    image: "/products/kalem-1506.jpg",
    category: "firsat",
    description: "Toplu alım için özel fiyat. Minimum 300 adet sipariş.",
  },
  {
    id: "5",
    name: "Özel Baskılı Çakmak",
    price: 12.0,
    image: "/products/cakmak-ozel.jpg",
    category: "firsat",
    description: "Kişiye özel logo baskılı çakmak. Dayanıklı ve şık tasarım.",
  },
  {
    id: "6",
    name: "Siyah Özel Baskılı Çakmak",
    price: 12.0,
    image: "/products/cakmak-siyah.jpg",
    category: "firsat",
    description: "Siyah renk özel baskılı çakmak. Profesyonel görünüm.",
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
  }

  return NextResponse.json(product);
}

