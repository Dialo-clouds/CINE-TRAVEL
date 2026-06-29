"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/lib/store/booking-store";
import { ArrowRight, CreditCard, Lock, Check } from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();
  const { selectedFlight, passengers, searchParams, setStep } = useBookingStore();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const total = (selectedFlight?.price || 0) * passengers.length;
  const tax = total * 0.1;
  const grandTotal = total + tax;

  const handlePay = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000));
    setIsProcessing(false);
    setStep(4);
    router.push("/book/confirm");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-light mb-8">Payment</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-6 space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Card Details
              </h3>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Expiry</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">CVC</label>
                  <input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="123"
                    maxLength={4}
                    className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name on Card</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Your payment is encrypted and secure
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-6 h-fit space-y-4">
            <h3 className="font-medium">Order Summary</h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Flight ({passengers.length}x)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Taxes & Fees</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-white/5 pt-2 flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Pay ${grandTotal.toFixed(2)}
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-8">
          <button onClick={() => router.push("/book/passengers")} className="text-sm text-gray-500 hover:text-white transition-colors">
            Back to Passengers
          </button>
        </div>
      </motion.div>
    </div>
  );
}
