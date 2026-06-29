"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plane, Navigation, Clock, Gauge } from "lucide-react";

export default function LiveFlightMapPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setProgress(p => (p + 0.5) % 100), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light mb-8">Live Flight Map</h1>

          <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-gray-900 to-black h-80 mb-6 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, rgba(59,130,246,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(147,51,234,0.1) 0%, transparent 50%)" }} />
            <div className="relative z-10 text-center">
              <Plane className="w-16 h-16 text-blue-400 mx-auto" style={{ transform: `rotate(${progress * 3.6}deg)` }} />
              <p className="text-sm text-gray-400 mt-4">AR1824 • Buenos Aires → El Calafate</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Navigation, label: "Altitude", value: "38,000 ft" },
              { icon: Gauge, label: "Speed", value: "543 mph" },
              { icon: Clock, label: "Time Remaining", value: "1h 45m" },
            ].map(stat => (
              <div key={stat.label} className="p-4 rounded-xl border border-white/5 text-center">
                <stat.icon className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                <p className="text-lg font-light">{stat.value}</p>
                <p className="text-[0.5rem] text-gray-500 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full bg-blue-400 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}