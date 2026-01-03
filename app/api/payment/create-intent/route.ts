import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getCurrentUser } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, items } = await request.json();

    // Stripe Payment Intent oluştur
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // TL'yi kuruşa çevir
      currency: "try",
      metadata: {
        userId: (user as any).id,
        items: JSON.stringify(items),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error("Payment intent error:", error);
    return NextResponse.json(
      { error: error.message || "Ödeme işlemi başlatılamadı" },
      { status: 500 }
    );
  }
}

