"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Clock, ArrowRight, Shield } from "lucide-react";

export default function MeetGreetPage() {
  const [booked, setBooked] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-10">
            <User className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h1 className="text-3xl font-light">Meet & Greet</h1>
            <p className="text-gray-500 mt-2">Personal escort through the airport.</p>
          </div>
          {booked ? (
            <div className="text-center p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <p className="text-emerald-400 text-lg">Booked!</p>
              <p className="text-gray-400 text-sm mt-2">Your personal escort will meet you at the terminal entrance.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-4">
              <p className="text-sm text-gray-400">Our Meet & Greet service includes:</p>
              {["Personal escort from curb to gate", "Fast-track through security", "Lounge access included", "Priority boarding"].map(f => <div key={f} className="flex items-center gap-2 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" />{f}</div>)}
              <div className="flex justify-between font-medium pt-3 border-t border-white/5"><span>Price</span><span>$199/person</span></div>
              <button onClick={() => setBooked(true)} className="w-full h-12 rounded-xl bg-amber-500 text-black font-semibold hover:bg-amber-400 flex items-center justify-center gap-2">Book Meet & Greet <ArrowRight className="w-4 h-4" /></button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}