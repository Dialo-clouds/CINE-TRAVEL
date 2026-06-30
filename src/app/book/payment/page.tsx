"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/lib/store/booking-store";
import { createBooking } from "@/lib/services/booking-service";
import { supabase } from "@/lib/supabase/client";
import { CreditCard, Lock, ArrowRight, Check } from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();
  const { selectedFlight, passengers, searchParams, setBookingId } = useBookingStore();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const total = (selectedFlight?.base_price || selectedFlight?.price || 0) * passengers.length;
  const tax = total * 0.1;
  const grandTotal = total + tax;

  const handlePay = async () => {
    if (!user) { router.push("/login?redirect=/book/payment"); return; }
    
    setIsProcessing(true);

    try {
      // Create real booking in Supabase
      const { bookingRef } = await createBooking({
        userId: user.id,
        flightId: selectedFlight?.id || "",
        seatClass: searchParams.cabinClass || "economy",
        totalPassengers: passengers.length,
        totalAmount: grandTotal,
        passengers: passengers.map(p => ({
          first_name: p.firstName,
          last_name: p.lastName,
          date_of_birth: p.dateOfBirth || undefined,
          nationality: p.nationality || undefined,
          passport_number: p.passportNumber || undefined,
          passport_expiry: p.passportExpiry || undefined,
          email: p.email || undefined,
          phone: p.phone || undefined,
          meal_preference: p.mealPreference || "regular",
          special_requests: p.specialRequests || undefined,
        })),
      });

      setBookingId(bookingRef);
      setIsProcessing(false);
      setIsComplete(true);
      setTimeout(() => router.push("/book/confirm"), 1500);
    } catch (err: any) {
      console.error("Booking failed:", err);
      setIsProcessing(false);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-light">Payment Successful!</h2>
          <p className="text-gray-500 mt-2">Booking confirmed. Redirecting...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-lg mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light mb-2">Payment</h1>
          <p className="text-gray-500 mb-8">Secure payment for your booking.</p>

          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-4 mb-6">
            <h3 className="font-medium flex items-center gap-2"><CreditCard className="w-4 h-4" /> Card Details</h3>
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="4242 4242 4242 4242" maxLength={19} className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" maxLength={5} className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" />
              <input type="text" value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="CVC" maxLength={4} className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" />
            </div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name on card" className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" />
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 mb-6 space-y-2">
            <div className="flex justify-between text-sm text-gray-400"><span>Flight ({passengers.length}x)</span><span>${total.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm text-gray-400"><span>Taxes & Fees</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-medium pt-2 border-t border-white/5"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
          </div>

          <button onClick={handlePay} disabled={isProcessing} className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center gap-2">
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <><Lock className="w-4 h-4" /> Pay ${grandTotal.toFixed(2)}</>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}