"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Upload, Clock, Check, ArrowRight } from "lucide-react";

const claims = [
  { id: 1, type: "Trip Cancellation", date: "2026-06-15", status: "In Review", amount: 1200 },
  { id: 2, type: "Lost Baggage", date: "2026-06-10", status: "Approved", amount: 500 },
];

export default function ClaimsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light mb-8">Insurance Claims</h1>
          <div className="space-y-3 mb-8">
            {claims.map(c => (
              <div key={c.id} className="p-5 rounded-xl border border-white/5 flex items-center justify-between">
                <div><p className="font-medium">{c.type}</p><p className="text-xs text-gray-500">{c.date}</p></div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${c.status === "Approved" ? "bg-emerald-500/10 text-emerald-400" : "bg-yellow-500/10 text-yellow-400"}`}>{c.status}</span>
                  <p className="text-sm mt-1">${c.amount}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full h-12 rounded-xl border-2 border-dashed border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm flex items-center justify-center gap-2"><Upload className="w-4 h-4" /> File New Claim</button>
        </motion.div>
      </div>
    </div>
  );
}