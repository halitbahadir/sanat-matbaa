import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = 'force-dynamic';

// GET - Tüm kategorileri listele
export async function GET() {
  try {
    // Prisma client'ın düzgün çalışıp çalışmadığını kontrol et
    if (!prisma || typeof prisma.category === 'undefined') {
      console.error("Prisma client not properly initialized");
      return NextResponse.json([], { status: 200 }); // Return empty array instead of error
    }

    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(categories || []);
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    console.error("Error details:", error?.message, error?.code);
    // Return empty array instead of error to prevent UI breakage
    return NextResponse.json([]);
  }
}

// POST - Yeni kategori ekle
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user || (user as any).role !== "admin") {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, slug, description } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Kategori adı ve slug gereklidir" },
        { status: 400 }
      );
    }

    // Slug'un benzersiz olduğunu kontrol et
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Bu slug zaten kullanılıyor" },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description: description || null,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Kategori eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
