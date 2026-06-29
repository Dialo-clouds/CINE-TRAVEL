"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const allocations = [
  { category: "FLIGHTS", amount: 1200, percentage: 27, color: "bg-blue-400" },
  { category: "ACCOMMODATION", amount: 1500, percentage: 33, color: "bg-purple-400" },
  { category: "EXPERIENCES", amount: 800, percentage: 18, color: "bg-emerald-400" },
  { category: "DINING", amount: 400, percentage: 9, color: "bg-orange-400" },
  { category: "TRANSPORT", amount: 300, percentage: 7, color: "bg-yellow-400" },
  { category: "OTHER", amount: 300, percentage: 6, color: "bg-pink-400" },
];

const total = allocations.reduce((s, a) => s + a.amount, 0);

export default function BudgetPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="text-xs text-white/60 uppercase tracking-[0.2em]">Financial Composition</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light mb-4">Golden Ratio Budget</h1>
          <p className="text-5xl font-light text-white/80">${total.toLocaleString()}</p>
        </motion.div>

        <div className="space-y-4 mb-12">
          {allocations.map((a, i) => (
            <motion.div key={a.category} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="backdrop-blur-3xl bg-black/50 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${a.color}`} />
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{a.category}</span>
                    <span className="text-sm">${a.amount.toLocaleString()} <span className="text-gray-500 text-xs ml-1">{a.percentage}%</span></span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div className={`h-full rounded-full ${a.color}`} initial={{ width: 0 }} animate={{ width: `${a.percentage}%` }} transition={{ duration: 1, delay: i * 0.1 }} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-sm text-white/50 hover:text-white transition-all">Return Home</Link>
        </div>
      </div>
    </main>
  );
}
