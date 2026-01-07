import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createSupabaseServerClient();
    const { data: category, error } = await supabase
      .from("Category")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !category) {
      return NextResponse.json(
        { error: "Kategori bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Kategori yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    const { data: category, error } = await supabase
      .from("Category")
      .update({
        name,
        slug,
        description: description || null,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error || !category) {
      if (error?.code === 'PGRST116') {
        return NextResponse.json(
          { error: "Kategori bulunamadı" },
          { status: 404 }
        );
      }
      console.error("Error updating category:", error);
      return NextResponse.json(
        { error: "Kategori güncellenirken bir hata oluştu" },
        { status: 500 }
      );
    }

    return NextResponse.json(category);
  } catch (error: any) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Kategori güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

