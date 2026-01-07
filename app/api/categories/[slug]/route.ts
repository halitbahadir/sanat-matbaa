import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = createSupabaseServerClient();
    const { data: category, error } = await supabase
      .from("Category")
      .select("*")
      .eq("slug", params.slug)
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


