"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Car, MapPin, Clock, ArrowRight } from "lucide-react";

export default function ChauffeurPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <Car className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-3xl font-light">Chauffeur Service</h1>
            <p className="text-gray-500 mt-2">Premium door-to-door luxury transfers.</p>
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="Pickup Address" className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" />
            <input type="text" placeholder="Drop-off Address" className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none" />
              <input type="time" className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none" />
            </div>
            <div className="p-4 rounded-xl border border-white/5 flex justify-between"><span className="text-sm text-gray-400">Estimated Price</span><span className="text-lg font-light">From $120</span></div>
            <button className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center justify-center gap-2">Book Chauffeur <ArrowRight className="w-4 h-4" /></button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}