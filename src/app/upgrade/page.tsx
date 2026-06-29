"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Star, ArrowRight } from "lucide-react";

export default function UpgradePage() {
  const [bid, setBid] = useState(200);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-10">
            <Star className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h1 className="text-3xl font-light">Seat Upgrade</h1>
            <p className="text-gray-500 mt-2">Bid for a premium cabin upgrade.</p>
          </div>
          {submitted ? (
            <div className="text-center p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <p className="text-emerald-400 text-lg">Bid Placed!</p>
              <p className="text-gray-400 text-sm mt-2">You'll be notified if your bid of ${bid} is accepted.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/5 p-6">
                <p className="text-sm text-gray-400 mb-2">Your Bid (USD)</p>
                <div className="flex items-center gap-4">
                  <button onClick={() => setBid(Math.max(100, bid - 50))} className="p-2 hover:bg-white/5 rounded-lg text-xl">-</button>
                  <span className="text-3xl font-light">${bid}</span>
                  <button onClick={() => setBid(bid + 50)} className="p-2 hover:bg-white/5 rounded-lg text-xl">+</button>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${Math.min(100, (bid/500)*100)}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-2">Bid strength: {bid < 200 ? "Low" : bid < 350 ? "Medium" : "Strong"}</p>
              </div>
              <button onClick={() => setSubmitted(true)} className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center justify-center gap-2">Place Bid <ArrowRight className="w-4 h-4" /></button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}