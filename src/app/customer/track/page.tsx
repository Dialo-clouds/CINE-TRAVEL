"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plane, Search, Clock, MapPin, ArrowRight, Wifi, WifiOff } from "lucide-react";

const mockFlights = [
  { id: "AR1824", airline: "Aerolineas Argentinas", from: "EZE", to: "FTE", dep: "08:30", arr: "11:45", status: "in_air", progress: 65, gate: "B12", terminal: "A" },
  { id: "LA4452", airline: "LATAM Airlines", from: "SCL", to: "PUQ", dep: "14:20", arr: "17:50", status: "scheduled", progress: 0, gate: "C4", terminal: "B" },
  { id: "EK502", airline: "Emirates", from: "DXB", to: "LHR", dep: "03:15", arr: "07:45", status: "landed", progress: 100, gate: "A22", terminal: "C" },
];

const statusColors: Record<string, string> = {
  scheduled: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  boarding: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  in_air: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  landed: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  delayed: "bg-red-500/10 text-red-400 border-red-500/20",
  cancelled: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

const statusLabels: Record<string, string> = {
  scheduled: "Scheduled",
  boarding: "Boarding",
  in_air: "In Flight",
  landed: "Landed",
  delayed: "Delayed",
  cancelled: "Cancelled",
};

export default function FlightTrackerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFlight, setSelectedFlight] = useState<any>(null);

  const filtered = searchQuery
    ? mockFlights.filter(f => f.id.toLowerCase().includes(searchQuery.toLowerCase()) || f.airline.toLowerCase().includes(searchQuery.toLowerCase()))
    : mockFlights;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-2">Real-time Tracking</p>
            <h1 className="text-4xl font-light">Flight Status</h1>
            <p className="text-gray-500 mt-2">Track any flight in real-time.</p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by flight number or airline..."
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20"
            />
          </div>

          {/* Flight List */}
          <div className="space-y-3">
            {filtered.map((flight, i) => (
              <motion.div
                key={flight.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedFlight(selectedFlight?.id === flight.id ? null : flight)}
                className={`p-6 rounded-xl border cursor-pointer transition-all ${
                  selectedFlight?.id === flight.id ? "border-white/20 bg-white/[0.02]" : "border-white/5 bg-white/[0.01] hover:border-white/10"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Plane className={`w-5 h-5 ${flight.status === "in_air" ? "text-emerald-400 animate-pulse" : "text-gray-400"}`} />
                    <div>
                      <p className="font-medium">{flight.airline}</p>
                      <p className="text-xs text-gray-500">{flight.id}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full border ${statusColors[flight.status]}`}>
                    {statusLabels[flight.status]}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-xl font-light">{flight.dep}</p>
                    <p className="text-xs text-gray-500">{flight.from}</p>
                  </div>
                  
                  <div className="flex-1 mx-6">
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${flight.status === "in_air" ? "bg-emerald-400" : flight.status === "landed" ? "bg-purple-400" : "bg-white/20"}`}
                        style={{ width: `${flight.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[0.5rem] text-gray-600">{flight.from}</span>
                      <span className="text-[0.5rem] text-gray-600">{flight.to}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-xl font-light">{flight.arr}</p>
                    <p className="text-xs text-gray-500">{flight.to}</p>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedFlight?.id === flight.id && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Gate</p>
                      <p className="text-lg font-medium">{flight.gate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Terminal</p>
                      <p className="text-lg font-medium">{flight.terminal}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">WiFi</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Wifi className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-emerald-400">Available</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
