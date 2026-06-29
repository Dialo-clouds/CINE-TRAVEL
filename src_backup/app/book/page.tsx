"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/lib/store/booking-store";
import { Search, ArrowRight, Users, Calendar } from "lucide-react";

const popularRoutes = [
  { from: "Buenos Aires (EZE)", to: "El Calafate (FTE)", label: "Patagonia" },
  { from: "Santiago (SCL)", to: "Punta Arenas (PUQ)", label: "Chilean Patagonia" },
  { from: "Tokyo (NRT)", to: "Osaka (KIX)", label: "Kyoto" },
  { from: "Marrakech (RAK)", to: "Errachidia (ERH)", label: "Sahara" },
];

export default function SearchPage() {
  const router = useRouter();
  const { searchParams, setSearchParams, setStep } = useBookingStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!searchParams.from) errs.from = "Required";
    if (!searchParams.to) errs.to = "Required";
    if (!searchParams.departDate) errs.departDate = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStep(1);
      router.push("/book/flights");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-light mb-4">Book Your Expedition</h1>
        <p className="text-gray-400">Search flights to your cinematic destination.</p>
      </motion.div>

      <form onSubmit={handleSearch} className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8 space-y-6">
          {/* From/To */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">From</label>
              <input
                type="text"
                placeholder="City or Airport"
                value={searchParams.from}
                onChange={(e) => setSearchParams({ from: e.target.value })}
                className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20"
              />
              {errors.from && <p className="text-red-400 text-xs mt-1">{errors.from}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">To</label>
              <input
                type="text"
                placeholder="City or Airport"
                value={searchParams.to}
                onChange={(e) => setSearchParams({ to: e.target.value })}
                className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20"
              />
              {errors.to && <p className="text-red-400 text-xs mt-1">{errors.to}</p>}
            </div>
          </div>

          {/* Dates */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Departure</label>
              <input
                type="date"
                value={searchParams.departDate}
                onChange={(e) => setSearchParams({ departDate: e.target.value })}
                className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none focus:border-white/20"
              />
              {errors.departDate && <p className="text-red-400 text-xs mt-1">{errors.departDate}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Return (optional)</label>
              <input
                type="date"
                value={searchParams.returnDate}
                onChange={(e) => setSearchParams({ returnDate: e.target.value })}
                className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none focus:border-white/20"
              />
            </div>
          </div>

          {/* Passengers & Class */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Passengers</label>
              <select
                value={searchParams.passengers}
                onChange={(e) => setSearchParams({ passengers: parseInt(e.target.value) })}
                className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none focus:border-white/20"
              >
                {[1,2,3,4,5,6].map(n => (
                  <option key={n} value={n} className="bg-black">{n} Passenger{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Cabin Class</label>
              <select
                value={searchParams.cabinClass}
                onChange={(e) => setSearchParams({ cabinClass: e.target.value as any })}
                className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none focus:border-white/20"
              >
                <option value="economy" className="bg-black">Economy</option>
                <option value="premium" className="bg-black">Premium Economy</option>
                <option value="business" className="bg-black">Business</option>
                <option value="first" className="bg-black">First Class</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            Search Flights
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Popular Routes */}
      <div className="mt-12">
        <h3 className="text-sm text-gray-500 uppercase tracking-[0.2em] mb-4">Popular Expedition Routes</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {popularRoutes.map((route) => (
            <button
              key={route.label}
              onClick={() => {
                setSearchParams({ from: route.from, to: route.to });
                setStep(1);
                router.push("/book/flights");
              }}
              className="p-4 rounded-xl border border-white/5 bg-black/50 text-left hover:border-white/10 transition-all"
            >
              <p className="text-sm font-medium">{route.label}</p>
              <p className="text-xs text-gray-500 mt-1">{route.from} → {route.to}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
