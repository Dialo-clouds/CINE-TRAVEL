"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, Navigation, ArrowRight } from "lucide-react";

const nearbyAirports = [
  { code: "JFK", name: "John F Kennedy", distance: 0, city: "New York" },
  { code: "LGA", name: "LaGuardia", distance: 10, city: "New York" },
  { code: "EWR", name: "Newark Liberty", distance: 16, city: "Newark" },
  { code: "HPN", name: "Westchester County", distance: 33, city: "White Plains" },
  { code: "ISP", name: "Long Island MacArthur", distance: 48, city: "Islip" },
];

export default function NearbyAirportsPage() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (code: string) => {
    setSelected(prev => prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <Navigation className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h1 className="text-3xl font-light">Nearby Airport Search</h1>
            <p className="text-gray-500 mt-2">Include airports within 100 miles for better fares.</p>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Enter your city or airport..." className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none" />
          </div>

          <div className="space-y-2 mb-8">
            {nearbyAirports.map((airport, i) => (
              <motion.button key={airport.code} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} onClick={() => toggle(airport.code)} className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${selected.includes(airport.code) ? "border-blue-500/50 bg-blue-500/5" : "border-white/5 hover:border-white/10"}`}>
                <div className="flex items-center gap-3">
                  <MapPin className={`w-5 h-5 ${selected.includes(airport.code) ? "text-blue-400" : "text-gray-500"}`} />
                  <div>
                    <p className="font-medium">{airport.name} ({airport.code})</p>
                    <p className="text-xs text-gray-500">{airport.city} · {airport.distance} miles</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selected.includes(airport.code) ? "border-blue-400 bg-blue-400" : "border-white/20"}`}>
                  {selected.includes(airport.code) && <span className="text-white text-xs">✓</span>}
                </div>
              </motion.button>
            ))}
          </div>

          <button className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center justify-center gap-2">Search {selected.length} Airports <ArrowRight className="w-4 h-4" /></button>
        </motion.div>
      </div>
    </div>
  );
}