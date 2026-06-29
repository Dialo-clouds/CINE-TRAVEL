"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Upload, Check, ArrowRight } from "lucide-react";

export default function StudentFaresPage() {
  const [verified, setVerified] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-10">
            <GraduationCap className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h1 className="text-3xl font-light">Student Fares</h1>
            <p className="text-gray-500 mt-2">Save up to 20% with verified student status.</p>
          </div>

          {verified ? (
            <div className="text-center p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <Check className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <p className="text-emerald-400 text-lg">Verified!</p>
              <p className="text-gray-400 text-sm mt-2">Your student discount is now active. Save 20% on all bookings.</p>
              <button className="mt-6 w-full h-12 rounded-xl bg-white text-black font-medium flex items-center justify-center gap-2">Book with Discount <ArrowRight className="w-4 h-4" /></button>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-4">
              <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center">
                <Upload className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                <p className="text-sm text-gray-400">Upload Student ID or Enrollment Letter</p>
                <p className="text-xs text-gray-600 mt-1">PDF, JPG, or PNG up to 5MB</p>
              </div>
              <input type="text" placeholder="University/College Name" className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" />
              <input type="date" placeholder="Expected Graduation" className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none" />
              <button onClick={() => setVerified(true)} className="w-full h-12 rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-400 flex items-center justify-center gap-2"><GraduationCap className="w-4 h-4" /> Verify Student Status</button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}