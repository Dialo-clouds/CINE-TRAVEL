import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/stripe";
import { supabase } from "@/lib/supabase/client";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const bookingId = paymentIntent.metadata.booking_id;
    if (bookingId) {
      await supabase.from("bookings").update({ payment_status: "paid", status: "confirmed" }).eq("id", bookingId);
    }
  }

  return NextResponse.json({ received: true });
}
