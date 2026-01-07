import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  try {
    const supabase = createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) return null;

    const email = user.email.trim().toLowerCase();

    // Get user role from public.User table
    const { data: dbUser, error } = await supabase
      .from("User")
      .select("id, email, name, role")
      .eq("email", email)
      .single();

    if (error || !dbUser) {
      console.error("Error fetching user from database:", error);
      return null;
    }

    return {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      role: dbUser.role || "user",
    };
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if ((user as any).role !== "admin") {
    throw new Error("Forbidden");
  }
  return user;
}
