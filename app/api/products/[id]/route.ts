import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createSupabaseServerClient();
    const { data: product, error } = await supabase
      .from("Product")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !product) {
      return NextResponse.json(
        { error: "Ürün bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Ürün yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { getCurrentUser } = await import("@/lib/auth");
    const user = await getCurrentUser();
    
    if (!user || (user as any).role !== "admin") {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, price, category, stock, image, active } = body;

    if (!name || price === undefined) {
      return NextResponse.json(
        { error: "Ürün adı ve fiyat gereklidir" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();
    const { data: product, error } = await supabase
      .from("Product")
      .update({
        name,
        description: description?.trim() || null,
        price: parseFloat(price),
        category: category?.trim() || null,
        stock: stock || 0,
        image: image?.trim() || null,
        active: active !== false,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error || !product) {
      if (error?.code === 'PGRST116') {
        return NextResponse.json(
          { error: "Ürün bulunamadı" },
          { status: 404 }
        );
      }
      console.error("Error updating product:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      console.error("Product ID:", params.id);
      console.error("Update data:", { name, description, price, category, stock, image, active });
      return NextResponse.json(
        { error: error?.message || "Ürün güncellenirken bir hata oluştu", details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Ürün güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

