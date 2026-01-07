import { NextResponse } from "next/server";
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

    // Ensure profile row exists in User table
    if (data.user) {
      const { data: userData, error: dbError } = await supabase
        .from("User")
        .upsert({
          email: normalizedEmail,
          name,
          password: "SUPABASE_AUTH", // Placeholder, not used with Supabase Auth
          role: "user",
        }, {
          onConflict: "email",
        })
        .select()
        .single();

      if (dbError) {
        console.warn("User profile creation error (non-critical):", dbError);
      }

      return NextResponse.json(
        {
          message: "Kayıt başarılı",
          userId: userData?.id || data.user.id,
          needsEmailConfirmation: !data.session,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        message: "Kayıt başarılı",
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
