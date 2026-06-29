"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Coffee, Wifi, Wine, Utensils, Shower, Monitor, Clock, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const lounges = [
  { id: 1, airport: "Buenos Aires (EZE)", name: "CineTravel Premium Lounge", terminal: "A", hours: "24/7", price: 45, rating: 4.8, amenities: ["WiFi", "Buffet", "Bar", "Showers", "Workspace"], image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400&q=80" },
  { id: 2, airport: "Santiago (SCL)", name: "Andes View Lounge", terminal: "B", hours: "5AM-11PM", price: 35, rating: 4.5, amenities: ["WiFi", "Snacks", "Coffee Bar", "Quiet Zone"], image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80" },
  { id: 3, airport: "Dubai (DXB)", name: "Oasis First Class Lounge", terminal: "C", hours: "24/7", price: 75, rating: 4.9, amenities: ["WiFi", "Fine Dining", "Spa", "Showers", "Sleeping Pods", "Cigar Room"], image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80" },
];

const amenityIcons: Record<string, any> = { WiFi: Wifi, Buffet: Utensils, Bar: Wine, Showers: Shower, Workspace: Monitor, "Snacks": Utensils, "Coffee Bar": Coffee, "Quiet Zone": Clock, "Fine Dining": Utensils, Spa: Star, "Sleeping Pods": Clock, "Cigar Room": Coffee };

export default function LoungePage() {
  const [selectedLounge, setSelectedLounge] = useState<number | null>(null);
  const [passengers, setPassengers] = useState(1);

  const total = selectedLounge ? (lounges.find(l => l.id === selectedLounge)?.price || 0) * passengers : 0;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light mb-2">Airport Lounges</h1>
          <p className="text-gray-500 mb-8">Premium lounge access at select airports.</p>

          <div className="space-y-4 mb-8">
            {lounges.map((lounge) => (
              <motion.button key={lounge.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedLounge(lounge.id)}
                className={`w-full p-6 rounded-xl border text-left transition-all ${selectedLounge === lounge.id ? "border-white/30 bg-white/[0.03]" : "border-white/5 bg-white/[0.01] hover:border-white/10"}`}>
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-xl bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${lounge.image})` }} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{lounge.name}</h3>
                        <p className="text-xs text-gray-500">{lounge.airport} · Terminal {lounge.terminal}</p>
                        <div className="flex items-center gap-1 mt-1"><Clock className="w-3 h-3 text-gray-500" /><span className="text-xs text-gray-500">{lounge.hours}</span></div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-light">${lounge.price}</p>
                        <p className="text-xs text-gray-500">per person</p>
                        <div className="flex items-center gap-1 mt-1 justify-end"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /><span className="text-xs text-amber-400">{lounge.rating}</span></div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {lounge.amenities.map(a => { const Icon = amenityIcons[a] || Coffee; return <span key={a} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 text-[0.6rem] text-gray-400"><Icon className="w-3 h-3" />{a}</span>; })}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {selectedLounge && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">Passengers:</span>
                  <button onClick={() => setPassengers(Math.max(1, passengers - 1))} className="p-1 hover:bg-white/5 rounded">-</button>
                  <span className="text-lg font-medium w-8 text-center">{passengers}</span>
                  <button onClick={() => setPassengers(passengers + 1)} className="p-1 hover:bg-white/5 rounded">+</button>
                </div>
                <p className="text-lg font-light">Total: ${total}</p>
              </div>
            </motion.div>
          )}

          <div className="flex gap-3">
            <Link href="/book" className="flex-1 h-12 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white flex items-center justify-center">Back</Link>
            <button className="flex-1 h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center justify-center gap-2">Add Lounge Access <ArrowRight className="w-4 h-4" /></button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
