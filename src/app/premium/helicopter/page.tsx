"use client";

import { motion } from "framer-motion";
import { Plane, MapPin, Clock, ArrowRight } from "lucide-react";

export default function HelicopterPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <span className="text-6xl block mb-4">🚁</span>
            <h1 className="text-3xl font-light">Helicopter Transfer</h1>
            <p className="text-gray-500 mt-2">Skip traffic. Arrive in style.</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-4">
            {[
              { route: "DXB Airport → Dubai Marina", time: "12 min", price: "$890" },
              { route: "LHR Airport → Central London", time: "15 min", price: "$1,200" },
              { route: "JFK Airport → Manhattan", time: "10 min", price: "$950" },
            ].map(r => (
              <div key={r.route} className="p-4 rounded-xl border border-white/5 flex items-center justify-between">
                <div><p className="text-sm font-medium">{r.route}</p><div className="flex items-center gap-3 text-xs text-gray-500 mt-1"><Clock className="w-3 h-3" />{r.time}</div></div>
                <div className="text-right"><p className="text-lg font-light">{r.price}</p><button className="text-xs text-amber-400 hover:underline mt-1">Book</button></div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
