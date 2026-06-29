"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CreditCard, Lock, ArrowRight, Check, Building, Wallet } from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "wallet">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const total = 376.20;

  const handlePay = async () => {
    setIsProcessing(true);
    // Simulate Stripe payment
    await new Promise(r => setTimeout(r, 2500));
    setIsProcessing(false);
    setIsComplete(true);
    setTimeout(() => router.push("/book/confirm"), 1500);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-light">Payment Successful!</h2>
          <p className="text-gray-500 mt-2">Redirecting to confirmation...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-lg mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light mb-2">Payment</h1>
          <p className="text-gray-500 mb-8">Secure payment powered by Stripe.</p>

          {/* Payment Method Tabs */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-6">
            {[
              { id: "card", label: "Card", icon: CreditCard },
              { id: "bank", label: "Bank", icon: Building },
              { id: "wallet", label: "Wallet", icon: Wallet },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id as any)}
                className={`flex-1 py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors ${
                  paymentMethod === method.id ? "bg-white text-black" : "text-gray-400 hover:text-white"
                }`}
              >
                <method.icon className="w-4 h-4" />
                {method.label}
              </button>
            ))}
          </div>

          {/* Card Form */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-2">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4242 4242 4242 4242"
                maxLength={19}
                className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-2">Expiry</label>
                <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" maxLength={5} className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2">CVC</label>
                <input type="text" value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" maxLength={4} className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Name on Card</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" />
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-6 p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Flight (1x $342)</span>
              <span>$342.00</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Taxes & Fees</span>
              <span>$34.20</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t border-white/5">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-4 h-4" /> Pay ${total.toFixed(2)}
              </>
            )}
          </button>
          <p className="text-xs text-gray-600 text-center mt-3 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" /> Secured by Stripe · Your payment is encrypted
          </p>
        </motion.div>
      </div>
    </div>
  );
}
