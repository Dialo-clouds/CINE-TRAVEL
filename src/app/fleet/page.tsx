"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Users, Gauge, Ruler, Star } from "lucide-react";

const fleet = [
  {
    id: 1, name: "Airbus A350-900", type: "Long Haul",
    image: "/images/fleet/a350.jpg",
    seats: { business: 48, premium: 32, economy: 226 },
    range: "15,000 km", speed: "903 km/h", length: "66.8m",
    features: ["WiFi", "In-seat Entertainment", "Mood Lighting", "Quiet Cabin"],
    routes: ["DXB-LHR", "DXB-JFK", "DXB-SYD"], rating: 4.8,
  },
  {
    id: 2, name: "Boeing 787-9 Dreamliner", type: "Long Haul",
    image: "/images/fleet/dreamliner.jpg",
    seats: { business: 30, premium: 21, economy: 237 },
    range: "14,140 km", speed: "913 km/h", length: "63m",
    features: ["Larger Windows", "Higher Humidity", "Smoother Ride", "LED Lighting"],
    routes: ["EZE-FTE", "SCL-PUQ", "DXB-NRT"], rating: 4.7,
  },
  {
    id: 3, name: "Airbus A320neo", type: "Short Haul",
    image: "/images/fleet/a320.webp",
    seats: { business: 12, economy: 150 },
    range: "6,300 km", speed: "830 km/h", length: "37.6m",
    features: ["Fuel Efficient", "Quiet Engines", "Spacious Cabin"],
    routes: ["Regional Routes", "Domestic"], rating: 4.5,
  },
  {
    id: 4, name: "Embraer E195-E2", type: "Regional",
    image: "/images/fleet/embraer.jpg",
    seats: { business: 0, economy: 132 },
    range: "4,800 km", speed: "830 km/h", length: "41.5m",
    features: ["Low Emissions", "Quiet Cabin", "2x2 Seating"],
    routes: ["Short Domestic", "Regional"], rating: 4.4,
  },
];

export default function FleetPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-16">
            <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-4">Our Aircraft</p>
            <h1 className="text-5xl font-light">Fleet</h1>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">Modern aircraft designed for cinematic travel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fleet.map((plane, i) => (
              <motion.div
                key={plane.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelected(selected === plane.id ? null : plane.id)}
                className={`rounded-2xl border overflow-hidden cursor-pointer transition-all ${selected === plane.id ? "border-white/20 bg-white/[0.02]" : "border-white/5 bg-white/[0.01] hover:border-white/10"}`}
              >
                <div className="relative h-64 overflow-hidden bg-gray-900">
                  <img src={plane.image} alt={plane.name} className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{plane.type}</p>
                    <h3 className="text-2xl font-light">{plane.name}</h3>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-sm text-white">{plane.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-2 rounded-lg bg-white/[0.02]"><Users className="w-4 h-4 text-gray-400 mx-auto mb-1" /><p className="text-[0.5rem] text-gray-500 uppercase">Seats</p><p className="text-lg font-light">{Object.values(plane.seats).reduce((a,b) => a + b, 0)}</p></div>
                    <div className="text-center p-2 rounded-lg bg-white/[0.02]"><Gauge className="w-4 h-4 text-gray-400 mx-auto mb-1" /><p className="text-[0.5rem] text-gray-500 uppercase">Range</p><p className="text-xs">{plane.range}</p></div>
                    <div className="text-center p-2 rounded-lg bg-white/[0.02]"><Ruler className="w-4 h-4 text-gray-400 mx-auto mb-1" /><p className="text-[0.5rem] text-gray-500 uppercase">Length</p><p className="text-sm">{plane.length}</p></div>
                    <div className="text-center p-2 rounded-lg bg-white/[0.02]"><Gauge className="w-4 h-4 text-gray-400 mx-auto mb-1" /><p className="text-[0.5rem] text-gray-500 uppercase">Speed</p><p className="text-xs">{plane.speed}</p></div>
                  </div>
                  {selected === plane.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border-t border-white/5 pt-4 space-y-4">
                      <div><p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Features</p><div className="flex flex-wrap gap-1.5">{plane.features.map(f => <span key={f} className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300">{f}</span>)}</div></div>
                      <div><p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Popular Routes</p><div className="flex flex-wrap gap-1.5">{plane.routes.map(r => <span key={r} className="px-3 py-1 rounded-full bg-blue-500/10 text-xs text-blue-300">{r}</span>)}</div></div>
                      <div className="grid grid-cols-3 gap-3 text-center pt-2">
                        {plane.seats.business > 0 && <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5"><p className="text-2xl font-light">{plane.seats.business}</p><p className="text-[0.5rem] text-gray-500 uppercase mt-1">Business</p></div>}
                        {plane.seats.premium > 0 && <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5"><p className="text-2xl font-light">{plane.seats.premium}</p><p className="text-[0.5rem] text-gray-500 uppercase mt-1">Premium</p></div>}
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5"><p className="text-2xl font-light">{plane.seats.economy}</p><p className="text-[0.5rem] text-gray-500 uppercase mt-1">Economy</p></div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}