"use client";

import { motion } from "framer-motion";
import { Leaf, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

const projects = [
  { name: "Amazon Reforestation", location: "Brazil", tons: "50,000", price: 12, desc: "Planting native trees in the Amazon rainforest." },
  { name: "Wind Energy", location: "India", tons: "100,000", price: 8, desc: "Supporting renewable wind energy projects." },
  { name: "Ocean Cleanup", location: "Pacific Ocean", tons: "25,000", price: 15, desc: "Removing plastic from our oceans." },
];

export default function CarbonPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-16">
            <Leaf className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h1 className="text-5xl font-light">Carbon Offset</h1>
            <p className="text-gray-500 mt-4 max-w-lg mx-auto">Fly responsibly. Offset your carbon footprint by supporting verified environmental projects.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map(p => (
              <div key={p.name} className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 text-center hover:border-white/10 transition-all">
                <Globe className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-lg font-light">{p.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{p.location}</p>
                <p className="text-sm text-gray-400 mt-3">{p.desc}</p>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-2xl font-light text-emerald-400">${p.price}</p>
                  <p className="text-xs text-gray-500">per ton of CO₂</p>
                </div>
                <button className="mt-4 w-full h-10 rounded-xl bg-white/5 text-sm text-gray-300 hover:bg-white/10 transition-colors">Offset Now</button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}