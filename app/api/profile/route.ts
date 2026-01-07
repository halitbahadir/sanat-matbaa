import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Ensure there is a matching row in Prisma `User` table for the authenticated Supabase user.
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
      return NextResponse.json({ ok: false }, { status: 500 });
    }

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

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("Profile sync error:", e?.message || e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}


