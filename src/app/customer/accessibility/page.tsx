"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Ear, Accessibility, Check } from "lucide-react";

const options = [
  { id: "screen-reader", icon: Eye, label: "Screen Reader", desc: "Optimized for screen readers" },
  { id: "high-contrast", icon: Accessibility, label: "High Contrast", desc: "Enhanced color contrast" },
  { id: "large-text", icon: Eye, label: "Large Text", desc: "Increased font sizes" },
  { id: "hearing", icon: Ear, label: "Hearing Impaired", desc: "Visual alerts & captions" },
];

export default function AccessibilityPage() {
  const [enabled, setEnabled] = useState<string[]>([]);

  const toggle = (id: string) => setEnabled(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Accessibility className="w-12 h-12 text-blue-400 mx-auto mb-6" />
          <h1 className="text-3xl font-light text-center mb-8">Accessibility Mode</h1>
          <div className="space-y-3">
            {options.map(opt => (
              <button key={opt.id} onClick={() => toggle(opt.id)} className={`w-full p-5 rounded-xl border text-left flex items-center gap-4 transition-all ${enabled.includes(opt.id) ? "border-blue-500/50 bg-blue-500/5" : "border-white/5 hover:border-white/10"}`}>
                <opt.icon className="w-6 h-6 text-blue-400" />
                <div className="flex-1"><h3 className="font-medium">{opt.label}</h3><p className="text-xs text-gray-500">{opt.desc}</p></div>
                {enabled.includes(opt.id) && <Check className="w-5 h-5 text-blue-400" />}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}