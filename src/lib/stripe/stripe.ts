import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

export async function createPaymentIntent(amount: number, currency: string = "usd", metadata: Record<string, string> = {}) {
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Stripe uses cents
    currency,
    metadata,
    automatic_payment_methods: { enabled: true },
  });
}

export async function retrievePaymentIntent(id: string) {
  return stripe.paymentIntents.retrieve(id);
}

export async function refundPayment(paymentIntentId: string, amount?: number) {
  return stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount: amount ? Math.round(amount * 100) : undefined,
  });
}

export async function createCustomer(email: string, name: string) {
  return stripe.customers.create({ email, name });
}
