"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Film, Music, Tv, Headphones, Gamepad2, BookOpen } from "lucide-react";

const entertainment = [
  { category: "Movies", icon: Film, items: ["Dune: Part Two", "Oppenheimer", "The Grand Budapest Hotel", "Inception", "The Secret Life of Walter Mitty", "Interstellar"], count: 200 },
  { category: "TV Shows", icon: Tv, items: ["Planet Earth III", "The Crown S6", "Succession S4", "The Bear S2", "Shogun"], count: 150 },
  { category: "Music", icon: Music, items: ["Curated Playlists", "Classical Collection", "Jazz Lounge", "World Music", "Ambient Soundscapes"], count: 500 },
  { category: "Podcasts", icon: Headphones, items: ["Travel Stories", "True Crime", "Business & Innovation", "Comedy Specials", "Wellness & Meditation"], count: 300 },
  { category: "Games", icon: Gamepad2, items: ["Chess", "Sudoku", "Trivia Challenge", "Poker", "Word Games"], count: 25 },
  { category: "Reading", icon: BookOpen, items: ["Best Sellers", "Travel Guides", "Business & Finance", "Lifestyle", "In-Flight Magazine"], count: 100 },
];

export default function EntertainmentPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-4">On Board Experience</p>
            <h1 className="text-5xl font-light">Entertainment</h1>
            <p className="text-gray-500 mt-4">Thousands of hours of content at your fingertips.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {entertainment.map((cat, i) => (
              <motion.div key={cat.category} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-white/5 bg-white/[0.01] p-6">
                <cat.icon className="w-8 h-8 text-amber-400 mb-4" />
                <h3 className="text-lg font-light mb-2">{cat.category}</h3>
                <p className="text-xs text-gray-500 mb-3">{cat.count}+ options</p>
                <div className="space-y-1.5">
                  {cat.items.map(item => (
                    <div key={item} className="text-sm text-gray-400 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-white/20" />{item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}