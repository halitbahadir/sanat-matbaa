import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Kategoriler - SM Sanat Matbaası",
  description: "Tüm ürün kategorilerimizi keşfedin.",
};

export const dynamic = 'force-dynamic';

async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">Tüm Kategoriler</h1>
      <div className="w-24 h-1 bg-red-600 mb-8"></div>

      {categories.length === 0 ? (
        <p className="text-gray-600">Henüz kategori bulunmuyor.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category: any) => (
            <Link
              key={category.id}
              href={`/kategori/${category.slug}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border border-gray-200 hover:border-primary-500"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {category.name}
              </h2>
              {category.description && (
                <p className="text-gray-600 text-sm">{category.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

