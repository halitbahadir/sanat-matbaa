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
    try {
      await prisma.user.upsert({
        where: { email },
        create: {
          email,
          name:
            (user.user_metadata as any)?.name ||
            (user.user_metadata as any)?.full_name ||
            null,
          role: "user",
          password: "SUPABASE_AUTH",
        },
        update: {
          // Update name if available, but preserve existing role
          name:
            (user.user_metadata as any)?.name ||
            (user.user_metadata as any)?.full_name ||
            undefined,
        },
      });
    } catch {
      // ignore
    }

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
