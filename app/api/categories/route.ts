import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = 'force-dynamic';

// GET - Tüm kategorileri listele
export async function GET() {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("Category")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error("Error fetching categories:", error);
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

    const supabase = createSupabaseServerClient();

    // Slug'un benzersiz olduğunu kontrol et
    const { data: existingCategory } = await supabase
      .from("Category")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existingCategory) {
      return NextResponse.json(
        { error: "Bu slug zaten kullanılıyor" },
        { status: 400 }
      );
    }

    // Yeni kategori oluştur
    // id, createdAt, updatedAt Supabase'de otomatik oluşturuluyorsa göndermeye gerek yok
    const { data: category, error } = await supabase
      .from("Category")
      .insert({
        name,
        slug,
        description: description || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating category:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: error.message || "Kategori eklenirken bir hata oluştu", details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Kategori eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
