"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Ticket, ArrowLeft } from "lucide-react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("bookings")
        .select("*, flight:flights(*), passengers(*)")
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false });

      if (data) setBookings(data);
      setLoading(false);
    }
    loadBookings();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/5 px-6 py-4">
        <Link href="/customer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-light mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="text-center py-20 rounded-xl border border-white/5">
            <Ticket className="w-16 h-16 text-white/5 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No bookings yet</p>
            <Link href="/book" className="inline-block mt-4 px-6 py-3 bg-white text-black rounded-full text-sm font-medium">
              Book a Flight
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="p-6 rounded-xl border border-white/5 bg-black/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-sm text-gray-400">{booking.booking_reference}</span>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    booking.status === "confirmed" ? "bg-emerald-500/10 text-emerald-400" :
                    booking.status === "cancelled" ? "bg-red-500/10 text-red-400" :
                    "bg-yellow-500/10 text-yellow-400"
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Flight</p>
                    <p className="font-medium">{booking.flight?.flight_number || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Passengers</p>
                    <p className="font-medium">{booking.passengers?.length || 1}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Class</p>
                    <p className="font-medium capitalize">{booking.seat_class}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Total</p>
                    <p className="font-medium">${booking.total_amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
