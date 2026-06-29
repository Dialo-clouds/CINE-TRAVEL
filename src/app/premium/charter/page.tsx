"use client";

import { motion } from "framer-motion";
import { Plane, MapPin, Calendar, ArrowRight } from "lucide-react";

const charters = [
  { from: "DXB", to: "LHR", date: "Jul 15", price: "$4,900", seats: 14 },
  { from: "JFK", to: "MIA", date: "Jul 18", price: "$3,200", seats: 8 },
  { from: "NRT", to: "SIN", date: "Jul 20", price: "$5,800", seats: 12 },
];

export default function CharterPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <Plane className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-3xl font-light">Empty Leg Charters</h1>
            <p className="text-gray-500 mt-2">Private jet flights at up to 75% off.</p>
          </div>
          <div className="space-y-3">
            {charters.map(c => (
              <div key={c.from + c.to} className="p-5 rounded-xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Plane className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="font-medium">{c.from} → {c.to}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1"><Calendar className="w-3 h-3" />{c.date} · {c.seats} seats</div>
                  </div>
                </div>
                <div className="text-right"><p className="text-lg font-light">{c.price}</p><button className="text-xs text-amber-400 hover:underline mt-1">Book</button></div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}