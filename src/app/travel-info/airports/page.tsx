"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Bus, Car, Coffee, Wifi, ShoppingBag, Hotel } from "lucide-react";

const airports = [
  { code: "DXB", name: "Dubai International", terminals: 3, lounges: 7, shops: 120, transport: ["Metro", "Taxi", "Bus", "Rental Car"], hotels: ["Dubai International Hotel", "Premier Inn"], wifi: "Free unlimited" },
  { code: "LHR", name: "London Heathrow", terminals: 4, lounges: 8, shops: 90, transport: ["Heathrow Express", "Tube", "Taxi", "Bus"], hotels: ["Sofitel", "Hilton Garden Inn"], wifi: "Free 45 min" },
  { code: "EZE", name: "Buenos Aires Ezeiza", terminals: 3, lounges: 3, shops: 40, transport: ["Taxi", "Bus", "Shuttle", "Rental Car"], hotels: ["Holiday Inn", "Posada de las Aguilas"], wifi: "Free unlimited" },
];

export default function AirportsPage() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-light">Airport Guides</h1>
          </div>
          <div className="flex gap-2 mb-8">
            {airports.map((a, i) => (
              <button key={a.code} onClick={() => setSelected(i)} className={`px-4 py-2 rounded-full text-sm ${selected === i ? "bg-white text-black" : "bg-white/5 text-gray-400"}`}>{a.code}</button>
            ))}
          </div>
          {airports[selected] && (
            <div className="rounded-2xl border border-white/5 p-6 space-y-4">
              <h2 className="text-2xl font-light">{airports[selected].name}</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-white/[0.02]"><p className="text-2xl font-light">{airports[selected].terminals}</p><p className="text-xs text-gray-500">Terminals</p></div>
                <div className="p-3 rounded-lg bg-white/[0.02]"><p className="text-2xl font-light">{airports[selected].lounges}</p><p className="text-xs text-gray-500">Lounges</p></div>
                <div className="p-3 rounded-lg bg-white/[0.02]"><p className="text-2xl font-light">{airports[selected].shops}</p><p className="text-xs text-gray-500">Shops</p></div>
              </div>
              <div><p className="text-sm text-gray-400 mb-2">Transport</p><div className="flex gap-2">{airports[selected].transport.map(t => <span key={t} className="px-3 py-1 rounded-full bg-white/5 text-xs">{t}</span>)}</div></div>
              <div className="flex items-center gap-2 text-sm text-emerald-400"><Wifi className="w-4 h-4" />{airports[selected].wifi}</div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}