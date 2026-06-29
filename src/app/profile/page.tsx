"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, Star, Sparkles, Compass } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-white/20 bg-white/5 mx-auto mb-6">
            <Globe className="w-12 h-12 text-white/60" />
          </div>
          <h1 className="text-4xl font-light">Explorer</h1>
          <p className="text-gray-400 mt-2">Seeker of cinematic landscapes. Chaser of golden hour. Collector of silences.</p>
        </motion.div>

        <div className="grid grid-cols-4 gap-4 mb-16 text-center">
          {[{ v: "3", l: "EXPEDITIONS" }, { v: "5", l: "COUNTRIES" }, { v: "94", l: "CINESCORE" }, { v: "2", l: "STORYBOARDS" }].map(s => (
            <div key={s.l} className="backdrop-blur-3xl bg-black/50 border border-white/10 rounded-2xl p-6">
              <p className="text-3xl font-light">{s.v}</p>
              <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-sm text-white/50 hover:text-white transition-all">Return Home</Link>
        </div>
      </div>
    </main>
  );
}
