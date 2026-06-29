"use client";

import { Gift, Star, TrendingUp, ArrowRight, ChevronRight } from "lucide-react";

const transactions = [
  { date: "2026-10-15", description: "Flight: Buenos Aires → El Calafate", points: 1250, type: "earned" },
  { date: "2026-09-20", description: "Flight: Santiago → Punta Arenas", points: 980, type: "earned" },
  { date: "2026-08-05", description: "Lounge access redemption", points: -500, type: "redeemed" },
  { date: "2026-07-12", description: "Bonus points - Summer promotion", points: 2000, type: "bonus" },
];

export default function LoyaltyPage() {
  const totalPoints = 12450;

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-light mb-2">Privilege Club</h1>
      <p className="text-gray-400 mb-8">Your loyalty rewards program.</p>

      {/* Tier Card */}
      <div className="rounded-2xl bg-gradient-to-br from-gray-400/20 to-gray-600/20 border border-white/5 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Current Tier</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
                <Star className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Silver</h2>
                <p className="text-sm text-gray-400">12,450 points</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Next Tier</p>
            <p className="text-lg font-bold text-amber-500 mt-1">Gold</p>
            <p className="text-xs text-gray-500">7,550 points to go</p>
          </div>
        </div>
        <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-amber-500 rounded-full" style={{ width: "62%" }} />
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Priority Check-in", icon: "✓" },
          { label: "Extra Baggage 10kg", icon: "🧳" },
          { label: "Lounge Access", icon: "🥂" },
          { label: "Priority Boarding", icon: "🛎️" },
          { label: "Free Seat Selection", icon: "💺" },
          { label: "Bonus Points", icon: "⭐" },
        ].map((benefit) => (
          <div key={benefit.label} className="p-4 rounded-xl border border-white/5 bg-[#111] text-center">
            <span className="text-2xl">{benefit.icon}</span>
            <p className="text-xs text-gray-400 mt-2">{benefit.label}</p>
          </div>
        ))}
      </div>

      {/* Transaction History */}
      <h2 className="text-xl font-light mb-4">Points History</h2>
      <div className="rounded-xl border border-white/5 bg-[#111] overflow-hidden">
        {transactions.map((t, i) => (
          <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0">
            <div>
              <p className="text-sm">{t.description}</p>
              <p className="text-xs text-gray-500">{t.date}</p>
            </div>
            <span className={`font-medium text-sm ${t.points > 0 ? "text-emerald-400" : "text-red-400"}`}>
              {t.points > 0 ? "+" : ""}{t.points.toLocaleString()} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
