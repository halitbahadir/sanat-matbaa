import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = createSupabaseServerClient();
    const identifier = params.slug;
    
    // Try to find by ID first (UUID format), then by slug
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
    
    const { data: category, error } = await supabase
      .from("Category")
      .select("*")
      .eq(isUUID ? "id" : "slug", identifier)
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
  { params }: { params: { slug: string } }
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
    const identifier = params.slug;
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

    const { data: category, error } = await supabase
      .from("Category")
      .update({
        name,
        slug,
        description: description || null,
        updatedAt: new Date().toISOString(),
      })
      .eq(isUUID ? "id" : "slug", identifier)
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


