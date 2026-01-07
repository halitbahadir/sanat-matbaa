import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const supabase = createSupabaseServerClient();
    let query = supabase
      .from("Product")
      .select("*")
      .eq("active", true)
      .order("createdAt", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
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
    const { data: newProduct, error } = await supabase
      .from("Product")
      .insert({
        name,
        description: description || null,
        price: parseFloat(price),
        category: category || null,
        stock: stock || 0,
        image: image || null,
        active: active !== false,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating product:", error);
      return NextResponse.json(
        { error: "Ürün oluşturulurken bir hata oluştu" },
        { status: 500 }
      );
    }

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Ürün oluşturulurken bir hata oluştu" },
      { status: 500 }
    );
  }
}

