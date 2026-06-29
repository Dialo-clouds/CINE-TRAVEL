"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wifi, Check, ArrowRight } from "lucide-react";

const packages = [
  { name: "Messaging", price: 4.99, speed: "Basic", features: ["WhatsApp", "iMessage", "Messenger", "No media"] },
  { name: "Browse", price: 9.99, speed: "Standard", features: ["Web browsing", "Email", "Social media", "Music streaming"] },
  { name: "Stream", price: 14.99, speed: "High Speed", features: ["Video streaming", "VPN access", "All Browse features", "Multiple devices"] },
];

export default function WiFiPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <Wifi className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h1 className="text-3xl font-light">In-Flight WiFi</h1>
            <p className="text-gray-500 mt-2">Pre-purchase WiFi and save up to 30%.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {packages.map((pkg) => (
              <motion.button key={pkg.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={() => setSelected(pkg.name)} className={`p-6 rounded-xl border text-left transition-all ${selected === pkg.name ? "border-blue-500/50 bg-blue-500/5" : "border-white/5 hover:border-white/10"}`}>
                <Wifi className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-medium">{pkg.name}</h3>
                <p className="text-2xl font-light mt-2">${pkg.price}</p>
                <p className="text-xs text-gray-500 mt-1">{pkg.speed}</p>
                <div className="mt-4 space-y-1.5">
                  {pkg.features.map(f => <div key={f} className="flex items-center gap-2 text-xs text-gray-400"><Check className="w-3 h-3 text-emerald-400" />{f}</div>)}
                </div>
              </motion.button>
            ))}
          </div>

          {selected && <button className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center justify-center gap-2">Add WiFi - ${packages.find(p => p.name === selected)?.price} <ArrowRight className="w-4 h-4" /></button>}
        </motion.div>
      </div>
    </div>
  );
}