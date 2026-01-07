import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();
    const normalizedEmail = String(email).trim().toLowerCase();

    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Ensure profile row exists (password no longer used)
    const user = await prisma.user.upsert({
      where: { email: normalizedEmail },
      create: {
        name,
        email: normalizedEmail,
        password: "SUPABASE_AUTH",
        role: "user",
      },
      update: {
        name,
      },
    });

    return NextResponse.json(
      {
        message: "Kayıt başarılı",
        userId: user.id,
        needsEmailConfirmation: !data.session,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Kayıt sırasında bir hata oluştu" },
      { status: 500 }
    );
  }
}
