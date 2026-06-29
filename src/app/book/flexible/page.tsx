"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Search } from "lucide-react";
import Link from "next/link";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const generatePrices = () => {
  const prices: Record<string, number> = {};
  for (let d = 1; d <= 90; d++) {
    const date = new Date();
    date.setDate(date.getDate() + d);
    const key = date.toISOString().split("T")[0];
    prices[key] = Math.floor(Math.random() * 300) + 150;
  }
  return prices;
};

export default function FlexibleDatePage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [prices] = useState(generatePrices());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getPriceColor = (price: number) => {
    if (price < 200) return "text-emerald-400 bg-emerald-500/10";
    if (price < 280) return "text-yellow-400 bg-yellow-500/10";
    return "text-red-400 bg-red-500/10";
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h1 className="text-5xl font-light">Flexible Dates</h1>
            <p className="text-gray-500 mt-4">Find the cheapest days to fly. Prices update in real-time.</p>
          </div>

          <div className="flex gap-3 mb-8">
            <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="From" className="flex-1 h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" />
            <input type="text" value={to} onChange={(e) => setTo(e.target.value)} placeholder="To" className="flex-1 h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" />
            <button className="px-6 h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center gap-2"><Search className="w-4 h-4" /> Search</button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
            {Object.entries(prices).slice(0, 35).map(([date, price], i) => (
              <motion.button
                key={date}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                onClick={() => setSelectedDate(date)}
                className={`p-3 rounded-xl text-center transition-all ${selectedDate === date ? "bg-white text-black" : `border border-white/5 hover:border-white/20 ${getPriceColor(price)}`}`}
              >
                <p className="text-[0.5rem] uppercase">{MONTHS[new Date(date).getMonth()]}</p>
                <p className="text-lg font-light">{new Date(date).getDate()}</p>
                <p className="text-xs mt-1">${price}</p>
              </motion.button>
            ))}
          </div>

          {selectedDate && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
              <p className="text-sm">Selected: {selectedDate}</p>
              <Link href="/book/flights" className="inline-flex items-center gap-2 mt-3 px-6 py-3 bg-white text-black rounded-full text-sm font-medium">Book This Date <ArrowRight className="w-4 h-4" /></Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}