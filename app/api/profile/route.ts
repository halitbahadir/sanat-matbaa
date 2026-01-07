import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

// GET - Get current user profile with role
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: (user as any).role || "user",
    });
  } catch (e: any) {
    console.error("Profile get error:", e?.message || e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// POST - Ensure there is a matching row in Prisma `User` table for the authenticated Supabase user.
export async function POST() {
  try {
    const supabase = createSupabaseServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user?.email) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const email = user.email.trim().toLowerCase();
    const name =
      (user.user_metadata as any)?.name ||
      (user.user_metadata as any)?.full_name ||
      null;

    if (!prisma || typeof prisma.user === "undefined") {
      // Database not available, but don't fail - just return ok
      console.warn("Prisma not available for profile sync");
      return NextResponse.json({ ok: true });
    }

    try {
      await prisma.user.upsert({
        where: { email },
        create: {
          email,
          name,
          role: "user",
          // Not used when Supabase Auth is enabled; kept to satisfy schema.
          password: "SUPABASE_AUTH",
        },
        update: {
          name: name ?? undefined,
        },
      });
    } catch (dbError: any) {
      // Log but don't fail - user might not exist in DB yet
      console.warn("Profile sync DB error (non-critical):", dbError?.message);
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("Profile sync error:", e?.message || e);
    // Return ok even on error to prevent login flow breakage
    return NextResponse.json({ ok: true });
  }
}


