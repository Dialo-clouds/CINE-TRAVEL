"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Users, Shield, Search, MapPin, TrendingDown, TrendingUp, Minus } from "lucide-react";

const airports = [
  { code: "DXB", name: "Dubai International", security: 12, checkin: 8, immigration: 15, trend: "down", reports: 23 },
  { code: "LHR", name: "London Heathrow", security: 25, checkin: 15, immigration: 30, trend: "up", reports: 45 },
  { code: "EZE", name: "Buenos Aires Ezeiza", security: 10, checkin: 5, immigration: 8, trend: "same", reports: 12 },
  { code: "JFK", name: "New York JFK", security: 35, checkin: 20, immigration: 40, trend: "up", reports: 67 },
  { code: "SCL", name: "Santiago International", security: 8, checkin: 5, immigration: 6, trend: "down", reports: 9 },
  { code: "NRT", name: "Tokyo Narita", security: 15, checkin: 10, immigration: 12, trend: "same", reports: 31 },
];

const getWaitColor = (minutes: number) => {
  if (minutes <= 10) return "text-emerald-400";
  if (minutes <= 25) return "text-yellow-400";
  return "text-red-400";
};

const getTrendIcon = (trend: string) => {
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-emerald-400" />;
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-red-400" />;
  return <Minus className="w-4 h-4 text-yellow-400" />;
};

export default function WaitTimesPage() {
  const [search, setSearch] = useState("");
  const [selectedAirport, setSelectedAirport] = useState<string | null>(null);

  const filtered = search ? airports.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.code.toLowerCase().includes(search.toLowerCase())) : airports;

  const handleReport = () => {
    alert("Thank you! Your report helps other travelers.");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <Clock className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h1 className="text-3xl font-light">Airport Wait Times</h1>
            <p className="text-gray-500 mt-2">Crowd-sourced real-time security and check-in wait times.</p>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search airport..." className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none" />
          </div>

          <div className="space-y-3 mb-8">
            {filtered.map((airport, i) => (
              <motion.div key={airport.code} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedAirport(selectedAirport === airport.code ? null : airport.code)}
                className={`rounded-xl border cursor-pointer transition-all ${selectedAirport === airport.code ? "border-white/20 bg-white/[0.02]" : "border-white/5 hover:border-white/10"}`}>
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="font-medium">{airport.name}</p>
                      <p className="text-xs text-gray-500">{airport.code} · {airport.reports} recent reports</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getTrendIcon(airport.trend)}
                    <div className="text-right">
                      <p className={`text-lg font-medium ${getWaitColor(airport.security)}`}>{airport.security} min</p>
                      <p className="text-[0.5rem] text-gray-500 uppercase">Security</p>
                    </div>
                  </div>
                </div>

                {selectedAirport === airport.code && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-5 border-t border-white/5 pt-4 grid grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-lg bg-white/[0.02]">
                      <p className={`text-xl font-light ${getWaitColor(airport.security)}`}>{airport.security}m</p>
                      <p className="text-[0.5rem] text-gray-500 uppercase">Security</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/[0.02]">
                      <p className={`text-xl font-light ${getWaitColor(airport.checkin)}`}>{airport.checkin}m</p>
                      <p className="text-[0.5rem] text-gray-500 uppercase">Check-in</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/[0.02]">
                      <p className={`text-xl font-light ${getWaitColor(airport.immigration)}`}>{airport.immigration}m</p>
                      <p className="text-[0.5rem] text-gray-500 uppercase">Immigration</p>
                    </div>
                    <div className="col-span-3">
                      <button onClick={handleReport} className="w-full h-10 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white hover:border-white/20 flex items-center justify-center gap-2">
                        <Users className="w-3 h-3" /> Report Current Wait Time
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={handleReport} className="px-6 py-3 rounded-full border border-white/10 text-sm text-gray-400 hover:text-white flex items-center gap-2 mx-auto">
              <Users className="w-4 h-4" /> Report Wait Time at Your Airport
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}