import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  try {
    const supabase = createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) return null;

    const email = user.email.trim().toLowerCase();

    // Ensure Prisma profile exists (best-effort)
    // Don't create if doesn't exist - let it be created manually or via API
    // This prevents accidentally creating users with wrong role

    const dbUser = await prisma.user.findUnique({ where: { email } });
    if (!dbUser) return null;

    return {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      role: (dbUser as any).role || "user",
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
