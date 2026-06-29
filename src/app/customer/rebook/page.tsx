"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Search, ArrowRight, AlertCircle } from "lucide-react";

export default function RebookPage() {
  const [bookingRef, setBookingRef] = useState("");
  const [found, setFound] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-10">
            <RefreshCw className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h1 className="text-3xl font-light">Self-Service Rebooking</h1>
            <p className="text-gray-500 mt-2">Automatically rebook cancelled or delayed flights.</p>
          </div>
          <div className="space-y-4">
            <input type="text" value={bookingRef} onChange={(e) => setBookingRef(e.target.value)} placeholder="Booking Reference" className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white uppercase placeholder:text-gray-600 focus:outline-none" />
            <button onClick={() => setFound(true)} className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center justify-center gap-2"><Search className="w-4 h-4" /> Find Booking</button>
            {found && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-2xl border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400"><AlertCircle className="w-4 h-4" /><span className="text-sm">Your flight has been delayed by 2 hours</span></div>
                <p className="text-sm text-gray-400">Alternative flights available:</p>
                {["AR1826 - 10:30 AM ($0 change fee)", "LA4454 - 11:45 AM ($0 change fee)", "AR1830 - 2:15 PM ($0 change fee)"].map(f => (
                  <button key={f} className="w-full p-3 rounded-lg border border-white/5 text-left text-sm hover:border-white/10 transition-all">{f}</button>
                ))}
                <button className="w-full h-10 rounded-xl bg-white text-black text-sm font-medium flex items-center justify-center gap-2">Confirm Rebook <ArrowRight className="w-4 h-4" /></button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}