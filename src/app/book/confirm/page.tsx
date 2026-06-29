"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/lib/store/booking-store";
import { ArrowRight, Check, Plane, User, CreditCard, FileText } from "lucide-react";

export default function ConfirmPage() {
  const router = useRouter();
  const { selectedFlight, passengers, searchParams, setBookingId, setStep } = useBookingStore();
  const [isBooking, setIsBooking] = useState(false);

  const total = (selectedFlight?.price || 0) * passengers.length;

  const handleConfirm = async () => {
    setIsBooking(true);
    await new Promise((r) => setTimeout(r, 2000));
    const bookingId = "CT" + Date.now().toString(36).toUpperCase();
    setBookingId(bookingId);
    setIsBooking(false);
    setStep(5);
    router.push("/book/success");
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-light mb-2">Confirm Your Booking</h1>
        <p className="text-gray-400 text-sm mb-8">Please review all details before confirming.</p>

        <div className="space-y-4">
          {/* Flight Summary */}
          <div className="rounded-2xl border border-white/10 bg-black/50 p-6">
            <h3 className="font-medium flex items-center gap-2 mb-4">
              <Plane className="w-4 h-4" /> Flight Details
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{selectedFlight?.airline}</p>
                <p className="text-xs text-gray-500">{selectedFlight?.flightNumber}</p>
              </div>
              <div className="text-center">
                <p className="text-sm">{selectedFlight?.departureTime}</p>
                <p className="text-xs text-gray-500">{selectedFlight?.departureAirport}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">{selectedFlight?.duration}</p>
                <div className="w-16 h-px bg-white/10 my-1" />
                <p className="text-xs text-gray-500">{selectedFlight?.stops === 0 ? "Direct" : `${selectedFlight?.stops} stop`}</p>
              </div>
              <div className="text-center">
                <p className="text-sm">{selectedFlight?.arrivalTime}</p>
                <p className="text-xs text-gray-500">{selectedFlight?.arrivalAirport}</p>
              </div>
            </div>
          </div>

          {/* Passengers Summary */}
          <div className="rounded-2xl border border-white/10 bg-black/50 p-6">
            <h3 className="font-medium flex items-center gap-2 mb-4">
              <User className="w-4 h-4" /> Passengers ({passengers.length})
            </h3>
            {passengers.map((p, i) => (
              <div key={p.id} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-sm">{p.firstName} {p.lastName}</p>
                  <p className="text-xs text-gray-500">Passport: {p.passportNumber}</p>
                </div>
                <span className="text-xs text-gray-500">{p.seatPreference} seat · {p.mealPreference}</span>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="rounded-2xl border border-white/10 bg-black/50 p-6">
            <h3 className="font-medium flex items-center gap-2 mb-4">
              <CreditCard className="w-4 h-4" /> Price Summary
            </h3>
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Flight ({passengers.length}x ${selectedFlight?.price})</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Taxes</span>
              <span>${(total * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg pt-2 border-t border-white/5">
              <span>Total</span>
              <span>${(total * 1.1).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            disabled={isBooking}
            className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isBooking ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <Check className="w-4 h-4" />
                Confirm & Book
              </>
            )}
          </button>

          <button onClick={() => router.push("/book/payment")} className="w-full text-sm text-gray-500 hover:text-white transition-colors py-2">
            Back to Payment
          </button>
        </div>
      </motion.div>
    </div>
  );
}
