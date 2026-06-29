"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const entries = [
  { id: 1, title: "THE LONG DAWN", mood: "AWE", location: "Laguna de los Tres, Patagonia", timestamp: "2026.10.15 · 06:47", content: "The first light caught the eastern face of Fitz Roy like a match striking stone. For seventeen minutes, the entire massif burned rose and amber.", weather: "2C · Clear" },
  { id: 2, title: "CATHEDRAL OF ICE", mood: "INSIGNIFICANCE", location: "Perito Moreno Glacier", timestamp: "2026.10.16 · 14:30", content: "Sixty meters of compressed time. The face of the glacier is not white but a blue so deep it belongs to another spectrum.", weather: "8C · Partly Cloudy" },
  { id: 3, title: "THE SOUTHERN CROSS", mood: "WONDER", location: "Patagonian Steppe", timestamp: "2026.10.17 · 23:15", content: "No artificial light for 200 kilometers. The Milky Way is not a suggestion but an overwhelming presence.", weather: "-5C · Crystal Clear" },
];

export default function JournalPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="text-xs text-white/60 uppercase tracking-[0.2em]">Expedition Archive</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light">Field Notes</h1>
        </motion.div>

        <div className="relative pl-12">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent" />
          {entries.map((entry, i) => (
            <motion.div key={entry.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="relative mb-10">
              <div className="absolute -left-12 top-0 w-10 h-10 rounded-full border-2 border-white/20 bg-black flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <div className="backdrop-blur-3xl bg-black/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-blue-400 uppercase tracking-[0.2em]">{entry.mood}</span>
                  <span className="text-xs text-gray-500">{entry.timestamp}</span>
                </div>
                <h3 className="text-xl font-medium mb-2">{entry.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{entry.location}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{entry.content}</p>
                <p className="text-xs text-gray-500 mt-3">{entry.weather}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-sm text-white/50 hover:text-white transition-all">
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
