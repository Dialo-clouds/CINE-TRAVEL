"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/lib/store/booking-store";
import { mockFlights } from "@/lib/data/flights";
import { ArrowRight, Plane, Search } from "lucide-react";
import Link from "next/link";

export default function FlightsPage() {
  const router = useRouter();
  const { selectedFlight, setSelectedFlight, searchParams, setStep } = useBookingStore();
  const [filteredFlights] = useState(mockFlights);
  const [sortBy, setSortBy] = useState<"price" | "duration" | "stops">("price");

  const sorted = [...filteredFlights].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "stops") return a.stops - b.stops;
    return a.duration.localeCompare(b.duration);
  });

  const handleSelect = (flight: typeof mockFlights[0]) => {
    setSelectedFlight(flight);
  };

  const handleContinue = () => {
    if (selectedFlight) {
      setStep(2);
      router.push("/book/passengers");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-light">Available Flights</h1>
              <p className="text-gray-400 text-sm mt-1">{searchParams.from || "Buenos Aires"} → {searchParams.to || "El Calafate"} · {searchParams.departDate || "Select date"}</p>
            </div>
            <div className="flex gap-3">
              <Link href="/book" className="text-sm text-gray-500 hover:text-white transition-colors">Back</Link>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="h-10 rounded-xl bg-white/5 border border-white/10 px-3 text-sm text-white focus:outline-none">
                <option value="price" className="bg-black">Sort by Price</option>
                <option value="duration" className="bg-black">Sort by Duration</option>
                <option value="stops" className="bg-black">Sort by Stops</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {sorted.map((flight, i) => (
              <motion.div key={flight.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                onClick={() => handleSelect(flight)}
                className={`p-6 rounded-xl border cursor-pointer transition-all ${selectedFlight?.id === flight.id ? "border-white bg-white/5" : "border-white/5 bg-white/[0.01] hover:border-white/10"}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg">✈️</div>
                    <div>
                      <p className="font-medium">{flight.airline}</p>
                      <p className="text-xs text-gray-500">{flight.flightNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-light">${flight.price}</p>
                    <p className="text-xs text-gray-500">per person</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <div className="text-center"><p className="text-lg font-medium">{flight.departureTime}</p><p className="text-xs text-gray-500">{flight.departureAirport}</p></div>
                  <div className="flex flex-col items-center"><p className="text-xs text-gray-500">{flight.duration}</p><div className="w-24 h-px bg-white/10 my-1" /><p className="text-xs text-gray-500">{flight.stops === 0 ? "Direct" : `${flight.stops} stop`}</p></div>
                  <div className="text-center"><p className="text-lg font-medium">{flight.arrivalTime}</p><p className="text-xs text-gray-500">{flight.arrivalAirport}</p></div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between">
            <Link href="/book" className="text-sm text-gray-500 hover:text-white transition-colors">Back to Search</Link>
            <button onClick={handleContinue} disabled={!selectedFlight} className="px-8 py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 disabled:opacity-30 flex items-center gap-2">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
