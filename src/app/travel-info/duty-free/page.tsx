"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Wine, SprayCanIcon as Spray, Watch, Gem, Gift } from "lucide-react";

const categories = [
  { name: "Fragrances", icon: Spray, items: ["Chanel No. 5 - $120", "Dior Sauvage - $95", "Tom Ford Oud Wood - $250", "Jo Malone Collection - $180"] },
  { name: "Spirits & Wine", icon: Wine, items: ["Johnnie Walker Blue - $180", "Dom Pérignon 2012 - $220", "Hennessy XO - $200", "Macallan 18 Year - $350"] },
  { name: "Watches", icon: Watch, items: ["TAG Heuer Carrera - $3,200", "Omega Seamaster - $4,500", "Cartier Tank - $5,800", "Rolex Datejust - $8,900"] },
  { name: "Jewelry", icon: Gem, items: ["Tiffany Necklace - $950", "Cartier Love Ring - $1,650", "Bvlgari Bracelet - $2,400", "Van Cleef Pendant - $3,100"] },
  { name: "Exclusive Gifts", icon: Gift, items: ["CineTravel Model Plane - $45", "Leather Travel Set - $180", "Silk Scarf Collection - $120", "Limited Edition Watch - $650"] },
];

export default function DutyFreePage() {
  const [selectedCat, setSelectedCat] = useState("Fragrances");

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-4">Shop On Board</p>
            <h1 className="text-5xl font-light">Duty-Free Catalog</h1>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(c => (
              <button key={c.name} onClick={() => setSelectedCat(c.name)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${selectedCat === c.name ? "bg-white text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>
                <c.icon className="w-4 h-4" />{c.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categories.find(c => c.name === selectedCat)?.items.map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-gray-500" />
                  <span className="text-sm">{item}</span>
                </div>
                <button className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-400 hover:bg-white/10">Pre-order</button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}