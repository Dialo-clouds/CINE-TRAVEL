"use client";

import { motion } from "framer-motion";
import { Crown, Coffee, Wifi, Utensils, Shower, ArrowRight } from "lucide-react";

export default function VIPPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <Crown className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h1 className="text-3xl font-light">Private Terminal Access</h1>
            <p className="text-gray-500 mt-2">The ultimate airport experience. From $500/person.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Coffee, label: "Private Lounge" }, { icon: Utensils, label: "Fine Dining" }, { icon: Wifi, label: "High-Speed WiFi" },
              { icon: Shower, label: "Private Suites" }, { icon: Crown, label: "Dedicated Butler" }, { icon: ArrowRight, label: "Direct Boarding" },
            ].map(a => (
              <div key={a.label} className="p-4 rounded-xl border border-white/5 text-center">
                <a.icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <p className="text-xs">{a.label}</p>
              </div>
            ))}
          </div>
          <button className="w-full h-12 rounded-xl bg-amber-500 text-black font-semibold hover:bg-amber-400 flex items-center justify-center gap-2">Request Access <ArrowRight className="w-4 h-4" /></button>
        </motion.div>
      </div>
    </div>
  );
}