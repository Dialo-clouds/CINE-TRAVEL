"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function IcelandPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative h-[60vh] bg-cover bg-center flex items-end" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1200&q=80)" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 mb-6">
              <span className="text-sm text-white/80">CineScore 95</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-light tracking-tight">ICELAND</h1>
            <p className="text-white/60 text-sm uppercase tracking-[0.3em] mt-4">Where the Earth is Still Being Born</p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-lg text-gray-400 leading-relaxed mb-12">
          Fire and ice in perpetual dialogue. Volcanoes erupt beneath glaciers. Waterfalls plunge into canyons carved by ancient floods. The aurora dances overhead like a celestial script written in green and purple light.
        </p>
        <div className="flex gap-4 mb-12 overflow-x-auto">
          {["Best: SEP-MAR", "Avg: 5C", "Golden Hour: 04:30", "Aurora Season"].map(s => (
            <div key={s} className="px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-sm whitespace-nowrap">{s}</div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/explore" className="text-sm text-gray-500 hover:text-white transition-colors">Back to Explore</Link>
        </div>
      </div>
    </main>
  );
}
