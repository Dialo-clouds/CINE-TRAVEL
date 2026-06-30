"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getUserBookings } from "@/lib/services/booking-service";
import { supabase } from "@/lib/supabase/client";
import { Ticket, ArrowLeft } from "lucide-react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const data = await getUserBookings(user.id);
        setBookings(data);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/5 px-6 py-4">
        <Link href="/customer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"><ArrowLeft className="w-4 h-4" /> Back</Link>
      </header>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-light mb-8">My Bookings</h1>
        {bookings.length === 0 ? (
          <div className="text-center py-20 rounded-xl border border-white/5">
            <Ticket className="w-16 h-16 text-white/5 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No bookings yet</p>
            <Link href="/book" className="inline-block mt-4 px-6 py-3 bg-white text-black rounded-full text-sm font-medium">Book a Flight</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b.id} className="p-6 rounded-xl border border-white/5 bg-white/[0.01]">
                <div className="flex justify-between mb-4">
                  <span className="font-mono text-sm text-gray-400">{b.booking_reference}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${b.status === "confirmed" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-gray-400"}`}>{b.status}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-light">{b.flight?.departure_time ? new Date(b.flight.departure_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--"}</p>
                    <p className="text-xs text-gray-500">{b.flight?.departure_airport?.code || "???"}</p>
                  </div>
                  <div className="flex-1 text-center"><p className="text-xs text-gray-500">{b.flight?.airline?.name || "Airline"}</p><div className="w-full h-px bg-white/10 my-2" /><p className="text-xs text-gray-500">{b.passengers?.length || 0} passenger(s)</p></div>
                  <div className="text-center">
                    <p className="text-2xl font-light">{b.flight?.arrival_time ? new Date(b.flight.arrival_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--"}</p>
                    <p className="text-xs text-gray-500">{b.flight?.arrival_airport?.code || "???"}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between text-sm">
                  <span className="text-gray-400">{b.seat_class} · ${b.total_amount}</span>
                  <span className="text-gray-500">{new Date(b.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}