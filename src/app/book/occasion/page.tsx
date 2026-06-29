"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cake, Heart, Star, Briefcase, ArrowRight } from "lucide-react";

const occasions = [
  { id: "birthday", icon: Cake, label: "Birthday", desc: "Complimentary cake & champagne", price: 0 },
  { id: "honeymoon", icon: Heart, label: "Honeymoon", desc: "Champagne, roses & premium seats", price: 49 },
  { id: "anniversary", icon: Star, label: "Anniversary", desc: "Champagne & dessert platter", price: 29 },
  { id: "business", icon: Briefcase, label: "Business", desc: "Priority boarding & lounge access", price: 79 },
];

export default function SpecialOccasionPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [note, setNote] = useState("");

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <Star className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h1 className="text-3xl font-light">Special Occasion</h1>
            <p className="text-gray-500 mt-2">Make your flight memorable.</p>
          </div>

          <div className="space-y-3 mb-8">
            {occasions.map((occ) => (
              <motion.button key={occ.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} onClick={() => setSelected(occ.id)} className={`w-full p-5 rounded-xl border text-left flex items-center gap-4 transition-all ${selected === occ.id ? "border-amber-500/50 bg-amber-500/5" : "border-white/5 hover:border-white/10"}`}>
                <occ.icon className="w-8 h-8 text-amber-400" />
                <div className="flex-1"><h3 className="font-medium">{occ.label}</h3><p className="text-xs text-gray-500">{occ.desc}</p></div>
                <p className="text-lg font-light">{occ.price === 0 ? "Free" : `$${occ.price}`}</p>
              </motion.button>
            ))}
          </div>

          <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Special requests or notes..." className="w-full h-24 rounded-xl bg-white/5 border border-white/10 p-4 text-white placeholder:text-gray-600 focus:outline-none resize-none mb-4" />

          <button className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center justify-center gap-2">Add to Booking <ArrowRight className="w-4 h-4" /></button>
        </motion.div>
      </div>
    </div>
  );
}