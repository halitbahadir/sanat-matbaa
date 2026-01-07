import { NextResponse } from "next/server";
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

// POST - Ensure there is a matching row in User table for the authenticated Supabase user.
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

    try {
      // Check if user exists
      const { data: existingUser } = await supabase
        .from("User")
        .select("id")
        .eq("email", email)
        .single();

      if (!existingUser) {
        // Create new user
        const { error: insertError } = await supabase
          .from("User")
          .insert({
            email,
            name,
            role: "user",
            password: "SUPABASE_AUTH", // Placeholder, not used with Supabase Auth
          });

        if (insertError) {
          console.warn("Profile sync DB error (non-critical):", insertError.message);
        }
      } else {
        // Update existing user name if provided
        if (name) {
          await supabase
            .from("User")
            .update({ name })
            .eq("id", existingUser.id);
        }
      }
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


