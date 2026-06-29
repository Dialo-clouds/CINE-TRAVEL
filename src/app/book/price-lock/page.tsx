"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Clock, ArrowRight, Shield } from "lucide-react";

export default function PriceLockPage() {
  const [locked, setLocked] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-10">
            <Lock className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h1 className="text-3xl font-light">Price Lock</h1>
            <p className="text-gray-500 mt-2">Freeze this fare for 72 hours. Only $9.99.</p>
          </div>

          {locked ? (
            <div className="text-center p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <p className="text-emerald-400 text-lg">Price Locked!</p>
              <p className="text-gray-400 text-sm mt-2">Your fare of $342 is locked until June 24, 2026 at 11:59 PM.</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-amber-400"><Clock className="w-4 h-4" /> 71h 45m remaining</div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-4">
              <div className="flex justify-between text-sm"><span>Current Fare</span><span className="font-medium">$342.00</span></div>
              <div className="flex justify-between text-sm"><span>Price Lock Fee</span><span>$9.99</span></div>
              <div className="flex justify-between font-medium pt-3 border-t border-white/5"><span>Total to Lock</span><span>$9.99</span></div>
              <button onClick={() => setLocked(true)} className="w-full h-12 rounded-xl bg-amber-500 text-black font-semibold hover:bg-amber-400 flex items-center justify-center gap-2"><Lock className="w-4 h-4" /> Lock This Price</button>
              <p className="text-xs text-gray-600 text-center">$9.99 will be deducted from your final ticket price if you book within 72 hours.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}