"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Star, TrendingUp, ArrowRight, Users, CreditCard, Repeat, Shield, Hotel, Car } from "lucide-react";

const transactions = [
  { date: "2026-10-15", description: "Flight: Buenos Aires to El Calafate", points: 1250, type: "earned" },
  { date: "2026-09-20", description: "Hotel partner: Hilton Dubai", points: 500, type: "earned" },
  { date: "2026-08-05", description: "Points + Cash redemption", points: -3000, type: "redeemed" },
  { date: "2026-07-12", description: "Family pool transfer from Elena", points: 2000, type: "bonus" },
];

const partners = [
  { name: "Hilton Hotels", type: "hotel", rate: "1 point = $0.01", icon: Hotel },
  { name: "Hertz Car Rental", type: "car", rate: "100 points = $1", icon: Car },
  { name: "Delta Airlines", type: "status", rate: "Status Match Available", icon: Shield },
];

export default function LoyaltyPage() {
  const totalPoints = 12450;
  const [showTransfer, setShowTransfer] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light mb-2">Privilege Club</h1>
          <p className="text-gray-500 mb-8">Your complete loyalty program.</p>

          {/* Tier Card */}
          <div className="rounded-2xl bg-gradient-to-br from-gray-400/20 to-gray-600/20 border border-white/5 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Current Tier</p>
                <div className="flex items-center gap-3 mt-2">
                  <Star className="w-10 h-10 text-amber-400 fill-amber-400" />
                  <div><h2 className="text-2xl font-bold">Silver</h2><p className="text-sm text-gray-400">{totalPoints.toLocaleString()} points</p></div>
                </div>
              </div>
              <div className="text-right"><p className="text-xs text-gray-400">Next Tier</p><p className="text-lg font-bold text-amber-500 mt-1">Gold</p><p className="text-xs text-gray-500">7,550 points to go</p></div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-amber-400 rounded-full" style={{ width: "62%" }} /></div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { icon: Users, label: "Family Pooling", desc: "Combine points" },
              { icon: CreditCard, label: "Points + Cash", desc: "Partial payment" },
              { icon: Repeat, label: "Transfer Miles", desc: "Send to members" },
              { icon: Shield, label: "Status Match", desc: "Match other airlines" },
            ].map(a => (
              <button key={a.label} className="p-4 rounded-xl border border-white/5 text-left hover:border-white/10 transition-all">
                <a.icon className="w-5 h-5 text-amber-400 mb-2" />
                <p className="text-sm font-medium">{a.label}</p>
                <p className="text-xs text-gray-500">{a.desc}</p>
              </button>
            ))}
          </div>

          {/* Partner Redemptions */}
          <h2 className="text-xl font-light mb-4">Partner Redemptions</h2>
          <div className="space-y-2 mb-8">
            {partners.map(p => (
              <div key={p.name} className="p-4 rounded-xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3"><p.icon className="w-8 h-8 text-gray-400 bg-white/5 rounded-full p-1.5" /><div><p className="text-sm font-medium">{p.name}</p><p className="text-xs text-gray-500">{p.type} · {p.rate}</p></div></div>
                <button className="text-xs text-amber-400 hover:underline">Redeem</button>
              </div>
            ))}
          </div>

          {/* Transaction History */}
          <h2 className="text-xl font-light mb-4">Points History</h2>
          <div className="rounded-xl border border-white/5 overflow-hidden">
            {transactions.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0">
                <div><p className="text-sm">{t.description}</p><p className="text-xs text-gray-500">{t.date}</p></div>
                <span className={`font-medium text-sm ${t.points > 0 ? "text-emerald-400" : "text-red-400"}`}>{t.points > 0 ? "+" : ""}{t.points.toLocaleString()} pts</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
