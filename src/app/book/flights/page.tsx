"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/lib/store/booking-store";
import { supabase } from "@/lib/supabase/client";
import { ArrowRight, Plane } from "lucide-react";
import Link from "next/link";

export default function FlightsPage() {
  const router = useRouter();
  const { selectedFlight, setSelectedFlight, searchParams, setStep } = useBookingStore();
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"price" | "duration" | "stops">("price");

  useEffect(() => {
    async function loadFlights() {
      setLoading(true);
      let query = supabase.from("flights").select("*, airline:airlines(*), departure_airport:airports!departure_airport_id(*), arrival_airport:airports!arrival_airport_id(*)").eq("status", "scheduled");

      if (searchParams.from) query = query.eq("departure_airport.code", searchParams.from);
      if (searchParams.to) query = query.eq("arrival_airport.code", searchParams.to);
      if (searchParams.departDate) {
        query = query.gte("departure_time", searchParams.departDate).lt("departure_time", searchParams.departDate + "T23:59:59");
      }

      const { data } = await query.order("departure_time").limit(20);
      setFlights(data || []);
      setLoading(false);
    }
    loadFlights();
  }, [searchParams.from, searchParams.to, searchParams.departDate]);

  const sorted = [...flights].sort((a, b) => {
    if (sortBy === "price") return (a.base_price || 0) - (b.base_price || 0);
    if (sortBy === "duration") return (a.duration_minutes || 0) - (b.duration_minutes || 0);
    return 0;
  });

  const handleContinue = () => {
    if (selectedFlight) { setStep(2); router.push("/book/passengers"); }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-light">Available Flights</h1>
              <p className="text-gray-400 text-sm mt-1">{searchParams.from || "Any"} → {searchParams.to || "Any"} · {searchParams.departDate || "Any date"}</p>
            </div>
            <div className="flex gap-3">
              <Link href="/book" className="text-sm text-gray-500 hover:text-white transition-colors">Back</Link>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="h-10 rounded-xl bg-white/5 border border-white/10 px-3 text-sm text-white focus:outline-none">
                <option value="price" className="bg-black">Sort by Price</option>
                <option value="duration" className="bg-black">Sort by Duration</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => <div key={i} className="h-28 rounded-xl bg-white/[0.02] animate-pulse" />)}
            </div>
          ) : flights.length === 0 ? (
            <div className="text-center py-20">
              <Plane className="w-16 h-16 text-white/5 mx-auto mb-4" />
              <p className="text-gray-500">No flights found for this route and date.</p>
              <Link href="/book" className="text-blue-400 hover:underline mt-2 inline-block">Try another search</Link>
            </div>
          ) : (
            <div className="space-y-3 mb-8">
              {sorted.map((flight, i) => (
                <motion.div key={flight.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  onClick={() => handleSelect(flight)}
                  className={`p-6 rounded-xl border cursor-pointer transition-all ${selectedFlight?.id === flight.id ? "border-white bg-white/5" : "border-white/5 bg-white/[0.01] hover:border-white/10"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg">✈️</div>
                      <div>
                        <p className="font-medium">{flight.airline?.name || "Airline"}</p>
                        <p className="text-xs text-gray-500">{flight.flight_number}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light">${flight.base_price}</p>
                      <p className="text-xs text-gray-500">per person</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <div className="text-center"><p className="text-lg font-medium">{new Date(flight.departure_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p><p className="text-xs text-gray-500">{flight.departure_airport?.code}</p></div>
                    <div className="text-center"><p className="text-xs text-gray-500">{Math.floor((flight.duration_minutes || 180) / 60)}h {(flight.duration_minutes || 180) % 60}m</p><div className="w-24 h-px bg-white/10 my-1" /><p className="text-xs text-gray-500">Direct</p></div>
                    <div className="text-center"><p className="text-lg font-medium">{new Date(flight.arrival_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p><p className="text-xs text-gray-500">{flight.arrival_airport?.code}</p></div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex justify-between">
            <Link href="/book" className="text-sm text-gray-500 hover:text-white">Back</Link>
            <button onClick={handleContinue} disabled={!selectedFlight} className="px-8 py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 disabled:opacity-30 flex items-center gap-2">Continue <ArrowRight className="w-4 h-4" /></button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}