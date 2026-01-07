import { createSupabaseServerClient } from "@/lib/supabase/server";

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
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("Category")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Slug'a göre kategori çekme
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("Category")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      console.error("Error fetching category by slug:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
}

