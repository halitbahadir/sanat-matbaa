import { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";

const categoryMap: Record<string, { name: string; description: string }> = {
  "firsat-urunleri": {
    name: "Fırsat Ürünleri",
    description: "En uygun fiyatlı fırsat ürünlerimizi keşfedin.",
  },
  "kisiye-ozel-hediyeler": {
    name: "Kişiye Özel Hediyeler",
    description: "Sevdikleriniz için özel tasarım hediyeler.",
  },
  "kisiye-ozel-kalemler": {
    name: "Kişiye Özel Kalemler",
    description: "Kişiye özel baskılı kalemler ve yazı gereçleri.",
  },
  "matbaa-urunleri": {
    name: "Matbaa Ürünleri",
    description: "Profesyonel matbaa ürünleri ve hizmetleri.",
  },
  "ozel-gunler": {
    name: "Özel Günler",
    description: "Doğum günü, yıldönümü ve özel günler için ürünler.",
  },
  "promosyon-toptan-alim": {
    name: "Promosyon Toptan Alım",
    description: "Toplu alımlar için özel fiyatlar ve kampanyalar.",
  },
  "isme-ozel-ofis-hediyeleri": {
    name: "İsme Özel Ofis Hediyeleri",
    description: "Ofis ortamı için özel tasarım hediyeler.",
  },
  "teknoloji-urunleri": {
    name: "Teknoloji Ürünleri",
    description: "Teknoloji odaklı promosyon ürünleri.",
  },
  "dugun-davetiyeleri": {
    name: "Düğün Davetiyeleri",
    description: "Özel tasarım düğün davetiyeleri ve aksesuarları.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = categoryMap[params.slug] || {
    name: "Kategori",
    description: "Ürün kategorisi",
  };

  return {
    title: `${category.name} - SM Sanat Matbaası`,
    description: category.description,
    openGraph: {
      title: `${category.name} - SM Sanat Matbaası`,
      description: category.description,
    },
  };
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = categoryMap[params.slug] || {
    name: "Kategori",
    description: "Ürün kategorisi",
  };

  // Slug'ı kategori koduna çevir
  const categoryCode = params.slug
    .replace(/-/g, "_")
    .replace("firsat_urunleri", "firsat");

  return (
    <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">
        {category.name.toUpperCase()}
      </h1>
      <div className="w-24 h-1 bg-red-600 mb-4"></div>
      <p className="text-gray-600 mb-8">{category.description}</p>
      <ProductGrid category={categoryCode} />
    </div>
  );
}

