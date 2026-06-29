"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, MapPin, Thermometer, Clock, Mountain, Users } from "lucide-react";

export default function PatagoniaPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div className="relative h-[70vh] bg-cover bg-center flex items-end" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1531844251246-9a1bfaae09fc?w=1200&q=80)" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-white/80">CineScore 94</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-light tracking-tight">PATAGONIA</h1>
            <div className="flex items-center gap-2 mt-4">
              <MapPin className="w-4 h-4 text-blue-400" />
              <p className="text-white/60 text-sm uppercase tracking-[0.3em]">Chile / Argentina</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-lg text-gray-300 leading-relaxed mb-12">
            Patagonia is not a destination; it is a confrontation with scale. The Fitz Roy massif rises from the steppe like a cathedral built for giants. Glaciers calve into milky turquoise lakes. The wind is a constant companion — sometimes a whisper, often a roar. The light at dawn paints granite in shades of rose and amber that exist nowhere else on Earth.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-2">
          {[
            { icon: Thermometer, label: "BEST SEASON", value: "OCT-MAR" },
            { icon: Clock, label: "AVG TEMP", value: "12C" },
            { icon: Mountain, label: "GOLDEN HOUR", value: "06:45" },
            { icon: MapPin, label: "ELEVATION", value: "1,200M" },
            { icon: Users, label: "CROWD INDEX", value: "LOW" },
          ].map((stat) => (
            <div key={stat.label} className="px-5 py-4 rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm flex items-center gap-3 whitespace-nowrap">
              <stat.icon className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-[0.5rem] uppercase tracking-[0.3em] text-gray-500">{stat.label}</p>
                <p className="text-sm font-medium">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Experiences */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h2 className="text-xl font-light mb-6">Curated Experiences</h2>
          <div className="space-y-4">
            {[
              { title: "Glacier Ice Trekking", desc: "Navigate the surface of an ancient glacier with crampons and axes. The ice beneath your feet is thousands of years old.", duration: "6 hours", difficulty: "Moderate", eco: true },
              { title: "Dawn Photography Expedition", desc: "Reach the best vantage points before first light. Capture the moment when the sun ignites the granite spires in shades of rose.", duration: "4 hours", difficulty: "Easy", eco: false },
              { title: "Steppe Night Sky Camping", desc: "Camp at the edge of the Patagonian steppe. No artificial light for 200 kilometers. The Southern Cross guides ancient routes.", duration: "12 hours", difficulty: "Challenging", eco: true },
            ].map((exp) => (
              <div key={exp.title} className="p-6 rounded-xl border border-white/5 bg-black/50 backdrop-blur-sm hover:border-white/10 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{exp.title}</h3>
                  {exp.eco && <span className="text-[0.5rem] uppercase tracking-[0.2em] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">Eco</span>}
                </div>
                <p className="text-sm text-gray-400 mb-3">{exp.desc}</p>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>{exp.duration}</span>
                  <span>{exp.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Accommodations */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h2 className="text-xl font-light mb-6">Accommodations</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: "REFUGIO POINCENOT", type: "Mountain Refuge", score: 91, price: "$120/night" },
              { name: "ECO LODGE PERITO", type: "Glacier Lodge", score: 95, price: "$350/night" },
            ].map((acc) => (
              <div key={acc.name} className="p-6 rounded-xl border border-white/5 bg-black/50 backdrop-blur-sm hover:border-white/10 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-yellow-400">{acc.score}</span>
                </div>
                <h3 className="font-medium">{acc.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{acc.type}</p>
                <p className="text-sm text-white/80 mt-3">{acc.price}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="text-center pt-8 border-t border-white/5">
          <Link href="/explore" className="text-sm text-gray-500 hover:text-white transition-colors">
            Back to Explore
          </Link>
        </div>
      </div>
    </main>
  );
}
