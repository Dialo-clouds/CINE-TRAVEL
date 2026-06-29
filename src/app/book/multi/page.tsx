"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Search, ArrowRight, Plane } from "lucide-react";

interface FlightLeg {
  id: number;
  from: string;
  to: string;
  date: string;
}

export default function MultiCityPage() {
  const router = useRouter();
  const [legs, setLegs] = useState<FlightLeg[]>([
    { id: 1, from: "", to: "", date: "" },
    { id: 2, from: "", to: "", date: "" },
  ]);
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState("economy");

  const addLeg = () => {
    if (legs.length < 6) {
      setLegs([...legs, { id: Date.now(), from: "", to: "", date: "" }]);
    }
  };

  const removeLeg = (id: number) => {
    if (legs.length > 2) {
      setLegs(legs.filter(l => l.id !== id));
    }
  };

  const updateLeg = (id: number, field: keyof FlightLeg, value: string) => {
    setLegs(legs.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light mb-2">Multi-City Booking</h1>
          <p className="text-gray-500 mb-8">Build a custom itinerary with multiple stops.</p>

          <div className="space-y-4 mb-8">
            {legs.map((leg, index) => (
              <motion.div
                key={leg.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-5 rounded-xl border border-white/5 bg-white/[0.01]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500 uppercase tracking-[0.2em]">Flight {index + 1}</span>
                  {legs.length > 2 && (
                    <button onClick={() => removeLeg(leg.id)} className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1">
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="From"
                    value={leg.from}
                    onChange={(e) => updateLeg(leg.id, "from", e.target.value)}
                    className="h-10 rounded-lg bg-white/5 border border-white/10 px-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20"
                  />
                  <input
                    type="text"
                    placeholder="To"
                    value={leg.to}
                    onChange={(e) => updateLeg(leg.id, "to", e.target.value)}
                    className="h-10 rounded-lg bg-white/5 border border-white/10 px-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20"
                  />
                  <input
                    type="date"
                    value={leg.date}
                    onChange={(e) => updateLeg(leg.id, "date", e.target.value)}
                    className="h-10 rounded-lg bg-white/5 border border-white/10 px-3 text-sm text-white focus:outline-none focus:border-white/20"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {legs.length < 6 && (
            <button onClick={addLeg} className="w-full h-12 rounded-xl border border-dashed border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm flex items-center justify-center gap-2 mb-8">
              <Plus className="w-4 h-4" /> Add Another Flight
            </button>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-xs text-gray-500 mb-2">Passengers</label>
              <select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))} className="w-full h-10 rounded-lg bg-white/5 border border-white/10 px-3 text-sm text-white focus:outline-none">
                {[1,2,3,4,5,6].map(n => <option key={n} value={n} className="bg-black">{n} Passenger{n > 1 ? "s" : ""}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Cabin Class</label>
              <select value={cabinClass} onChange={(e) => setCabinClass(e.target.value)} className="w-full h-10 rounded-lg bg-white/5 border border-white/10 px-3 text-sm text-white focus:outline-none">
                <option value="economy" className="bg-black">Economy</option>
                <option value="premium" className="bg-black">Premium Economy</option>
                <option value="business" className="bg-black">Business</option>
                <option value="first" className="bg-black">First Class</option>
              </select>
            </div>
          </div>

          <button onClick={() => router.push("/book/flights")} className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
            <Search className="w-4 h-4" /> Search Flights
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
