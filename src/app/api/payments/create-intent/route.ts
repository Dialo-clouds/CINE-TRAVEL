import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/stripe";

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, metadata } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency || "usd",
      metadata,
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
