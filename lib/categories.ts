import { prisma } from "@/lib/prisma";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Note: categoryIcons moved to lib/categoryIcons.ts for client-side safety

// Server-side kategori çekme
export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Slug'a göre kategori çekme
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const category = await prisma.category.findUnique({
      where: {
        slug,
      },
    });
    return category;
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
}

