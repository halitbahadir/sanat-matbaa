import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { getCategoryBySlug } from "@/lib/categories";

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: "Kategori Bulunamadı - SM Sanat Matbaası",
      description: "Aradığınız kategori bulunamadı.",
    };
  }

  return {
    title: `${category.name} - SM Sanat Matbaası`,
    description: category.description || `${category.name} kategorisindeki ürünleri keşfedin.`,
    openGraph: {
      title: `${category.name} - SM Sanat Matbaası`,
      description: category.description || `${category.name} kategorisindeki ürünleri keşfedin.`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  // Slug'ı kategori koduna çevir (ürün filtreleme için)
  // Örnek: "firsat-urunleri" -> "firsat"
  const categoryCode = params.slug
    .replace(/-/g, "_")
    .replace("firsat_urunleri", "firsat")
    .replace("kisiye_ozel_hediyeler", "ozel-hediye")
    .replace("kisiye_ozel_kalemler", "ozel-kalem")
    .replace("matbaa_urunleri", "matbaa")
    .replace("ozel_gunler", "ozel-gunler")
    .replace("promosyon_toptan_alim", "toptan")
    .replace("isme_ozel_ofis_hediyeleri", "ofis-hediye")
    .replace("teknoloji_urunleri", "teknoloji")
    .replace("dugun_davetiyeleri", "davetiye");

  return (
    <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">
        {category.name.toUpperCase()}
      </h1>
      <div className="w-24 h-1 bg-red-600 mb-4"></div>
      {category.description && (
        <p className="text-gray-600 mb-8">{category.description}</p>
      )}
      <ProductGrid category={categoryCode} />
    </div>
  );
}

