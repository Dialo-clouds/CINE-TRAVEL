"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wheelchair, Heart, Baby, Eye, Ear, Utensils, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const assistanceTypes = [
  { id: "wheelchair", label: "Wheelchair Assistance", icon: Wheelchair, desc: "Mobility assistance from check-in to boarding" },
  { id: "medical", label: "Medical Condition", icon: Heart, desc: "In-flight medical support and equipment" },
  { id: "infant", label: "Traveling with Infant", icon: Baby, desc: "Bassinet, baby meals, priority boarding" },
  { id: "visual", label: "Visual Impairment", icon: Eye, desc: "Guide assistance and braille materials" },
  { id: "hearing", label: "Hearing Impairment", icon: Ear, desc: "Sign language support and visual alerts" },
  { id: "dietary", label: "Special Meals", icon: Utensils, desc: "Halal, kosher, vegan, gluten-free, etc." },
];

export default function AssistancePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light mb-2">Special Assistance</h1>
          <p className="text-gray-500 mb-8">Let us know how we can help make your journey comfortable.</p>

          <div className="space-y-3 mb-8">
            {assistanceTypes.map((type) => (
              <motion.button key={type.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                onClick={() => toggle(type.id)}
                className={`w-full p-5 rounded-xl border text-left transition-all flex items-start gap-4 ${selected.includes(type.id) ? "border-white/30 bg-white/[0.03]" : "border-white/5 bg-white/[0.01] hover:border-white/10"}`}>
                <type.icon className={`w-6 h-6 mt-0.5 ${selected.includes(type.id) ? "text-white" : "text-gray-500"}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between"><h3 className="font-medium">{type.label}</h3>{selected.includes(type.id) && <Check className="w-5 h-5 text-emerald-400" />}</div>
                  <p className="text-xs text-gray-500 mt-1">{type.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {selected.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <label className="block text-sm text-gray-400 mb-2">Additional Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Describe any specific requirements..." className="w-full h-24 rounded-xl bg-white/5 border border-white/10 p-4 text-white placeholder:text-gray-600 focus:outline-none resize-none" />
            </motion.div>
          )}

          <div className="flex gap-3">
            <Link href="/book" className="flex-1 h-12 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white flex items-center justify-center">Back</Link>
            <button className="flex-1 h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center justify-center gap-2">Save & Continue <ArrowRight className="w-4 h-4" /></button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
