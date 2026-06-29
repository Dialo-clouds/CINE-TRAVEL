"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Play, Maximize } from "lucide-react";

const cabins = [
  { name: "Economy Class", seats: "3-4-3 layout, 31\" pitch", features: ["Personal 11\" screen", "USB charging", "Adjustable headrest"], color: "from-blue-900 to-blue-800" },
  { name: "Premium Economy", seats: "2-3-2 layout, 38\" pitch", features: ["Personal 15\" screen", "USB + AC power", "Leg rest", "Priority meal service"], color: "from-purple-900 to-purple-800" },
  { name: "Business Class", seats: "1-2-1 layout, fully flat bed", features: ["Personal 22\" screen", "Direct aisle access", "Fine dining", "Amenity kit"], color: "from-amber-900 to-amber-800" },
];

export default function CabinTourPage() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <Plane className="w-12 h-12 text-white mx-auto mb-4" />
            <h1 className="text-3xl font-light">Cabin Virtual Tour</h1>
            <p className="text-gray-500 mt-2">Explore our cabins before you book.</p>
          </div>

          <div className="flex gap-2 mb-8">
            {cabins.map((c, i) => (
              <button key={c.name} onClick={() => setSelected(i)} className={`flex-1 py-3 rounded-xl text-sm transition-colors ${selected === i ? "bg-white text-black" : "bg-white/5 text-gray-400"}`}>{c.name}</button>
            ))}
          </div>

          <div className={`rounded-2xl h-80 bg-gradient-to-br ${cabins[selected].color} flex items-center justify-center mb-6 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <button className="relative z-10 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </button>
          </div>

          <div className="rounded-2xl border border-white/5 p-6 space-y-3">
            <h3 className="text-lg font-medium">{cabins[selected].name}</h3>
            <p className="text-sm text-gray-400">{cabins[selected].seats}</p>
            <div className="flex flex-wrap gap-2">
              {cabins[selected].features.map(f => <span key={f} className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300">{f}</span>)}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}