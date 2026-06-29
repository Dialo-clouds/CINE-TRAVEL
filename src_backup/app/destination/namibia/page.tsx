"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NamibiaPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative h-[60vh] bg-cover bg-center flex items-end" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1571077325458-2bd6b0d2ad7c?w=1200&q=80)" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 mb-6">
              <span className="text-sm text-white/80">CineScore 89</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-light tracking-tight">NAMIBIA</h1>
            <p className="text-white/60 text-sm uppercase tracking-[0.3em] mt-4">The Oldest Desert on Earth</p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-lg text-gray-400 leading-relaxed mb-12">
          The Namib Desert has existed for 55 million years. Dead trees stand frozen in time at Deadvlei, their shadows stretching across white clay pans. The dunes sing at dawn with a sound like distant drums.
        </p>
        <div className="flex gap-4 mb-12 overflow-x-auto">
          {["Best: MAY-SEP", "Avg: 22C", "Golden Hour: 06:45", "Stargazing"].map(s => (
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
