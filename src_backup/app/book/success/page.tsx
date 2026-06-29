"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/lib/store/booking-store";
import { Check, Plane, Download, Home, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  const router = useRouter();
  const { bookingId, selectedFlight, passengers, searchParams, reset } = useBookingStore();

  const handleNewBooking = () => {
    reset();
    router.push("/book");
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 mb-6">
          <Check className="w-10 h-10 text-emerald-400" />
        </div>

        <h1 className="text-3xl font-light mb-2">Booking Confirmed!</h1>
        <p className="text-gray-400 mb-8">Your expedition has been booked successfully.</p>

        <div className="rounded-2xl border border-white/10 bg-black/50 p-6 mb-8 text-left space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Booking Reference</span>
            <span className="font-mono text-lg">{bookingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Flight</span>
            <span className="text-sm">{selectedFlight?.airline} {selectedFlight?.flightNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Route</span>
            <span className="text-sm">{selectedFlight?.departure} → {selectedFlight?.arrival}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Date</span>
            <span className="text-sm">{searchParams.departDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Passengers</span>
            <span className="text-sm">{passengers.length}</span>
          </div>
          <div className="flex justify-between font-medium pt-4 border-t border-white/5">
            <span>Total Paid</span>
            <span>${((selectedFlight?.price || 0) * passengers.length * 1.1).toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Download E-Ticket
          </button>
          <Link href="/" className="px-6 py-3 rounded-xl border border-white/10 text-sm hover:border-white/20 transition-colors flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </div>

        <button onClick={handleNewBooking} className="mt-6 text-sm text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto">
          Book Another Expedition <ArrowRight className="w-3 h-3" />
        </button>
      </motion.div>
    </div>
  );
}
