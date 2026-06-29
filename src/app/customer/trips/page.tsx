"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Plane, Calendar, Clock, MapPin, ChevronRight, Filter, Search } from "lucide-react";

export default function TripsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        const { data } = await supabase
          .from("bookings")
          .select("*")
          .eq("user_id", userData.user.id)
          .order("created_at", { ascending: false });
        if (data) setBookings(data);
      }
      setLoading(false);
    }
    load();
  }, []);

  const filtered = filter === "all" ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light">My Trips</h1>
        <p className="text-gray-400 mt-1">Manage your bookings and check-in online.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {["all", "confirmed", "completed", "cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm capitalize transition-colors ${
              filter === f ? "bg-amber-500 text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 rounded-xl border border-white/5 bg-[#111]">
          <Plane className="w-16 h-16 text-white/5 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No bookings found</p>
          <Link href="/book" className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-amber-500 text-black rounded-full text-sm font-medium">
            Book a Flight
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((booking) => (
            <Link
              key={booking.id}
              href={`/customer/trips/${booking.id}`}
              className="block p-6 rounded-xl border border-white/5 bg-[#111] hover:border-amber-500/20 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="font-mono text-sm text-amber-500">{booking.booking_reference}</span>
                  <span className={`ml-3 text-xs px-2 py-1 rounded-full ${
                    booking.status === "confirmed" ? "bg-emerald-500/10 text-emerald-400" :
                    booking.status === "cancelled" ? "bg-red-500/10 text-red-400" :
                    "bg-yellow-500/10 text-yellow-400"
                  }`}>{booking.status}</span>
                </div>
                <span className="text-sm text-gray-500">{new Date(booking.created_at).toLocaleDateString()}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Route</p>
                  <p className="font-medium text-sm">{booking.flight?.departure_airport || "N/A"} → {booking.flight?.arrival_airport || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Class</p>
                  <p className="font-medium text-sm capitalize">{booking.seat_class}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Passengers</p>
                  <p className="font-medium text-sm">{booking.total_passengers}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Total</p>
                  <p className="font-medium text-sm">${booking.total_amount}</p>
                </div>
              </div>

              <div className="flex justify-end mt-4 pt-4 border-t border-white/5">
                <span className="text-sm text-amber-500 group-hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
