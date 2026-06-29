"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Plane, MapPin, Search } from "lucide-react";

const routes = [
  { from: "DXB", fromCity: "Dubai", to: "LHR", toCity: "London", duration: "7h 15m", flights: 4, price: 580 },
  { from: "DXB", fromCity: "Dubai", to: "JFK", toCity: "New York", duration: "14h 30m", flights: 3, price: 890 },
  { from: "DXB", fromCity: "Dubai", to: "SYD", toCity: "Sydney", duration: "13h 45m", flights: 2, price: 950 },
  { from: "EZE", fromCity: "Buenos Aires", to: "FTE", toCity: "El Calafate", duration: "3h 15m", flights: 2, price: 342 },
  { from: "SCL", fromCity: "Santiago", to: "PUQ", toCity: "Punta Arenas", duration: "3h 20m", flights: 2, price: 198 },
  { from: "LHR", fromCity: "London", to: "DXB", toCity: "Dubai", duration: "7h 00m", flights: 4, price: 620 },
  { from: "JFK", fromCity: "New York", to: "LHR", toCity: "London", duration: "7h 30m", flights: 5, price: 450 },
  { from: "NRT", fromCity: "Tokyo", to: "DXB", toCity: "Dubai", duration: "11h 00m", flights: 2, price: 780 },
];

const airports = [...new Set(routes.flatMap(r => [r.from, r.to]))].map(code => {
  const route = routes.find(r => r.from === code || r.to === code);
  return { code, city: code === route?.from ? route.fromCity : route?.toCity };
});

export default function RoutesPage() {
  const [filter, setFilter] = useState("");
  const [selectedFrom, setSelectedFrom] = useState<string | null>(null);

  const filtered = selectedFrom ? routes.filter(r => r.from === selectedFrom) : routes;
  const searchFiltered = filter ? filtered.filter(r => r.fromCity.toLowerCase().includes(filter.toLowerCase()) || r.toCity.toLowerCase().includes(filter.toLowerCase()) || r.from.includes(filter.toUpperCase()) || r.to.includes(filter.toUpperCase())) : filtered;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-4">Our Network</p>
            <h1 className="text-5xl font-light">Route Map</h1>
            <p className="text-gray-500 mt-4">Explore our global network of destinations.</p>
          </div>

          {/* Airport Quick Select */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <button onClick={() => setSelectedFrom(null)} className={`px-4 py-2 rounded-full text-xs transition-colors ${!selectedFrom ? "bg-white text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>All Routes</button>
            {airports.map(a => (
              <button key={a.code} onClick={() => setSelectedFrom(a.code)} className={`px-4 py-2 rounded-full text-xs transition-colors ${selectedFrom === a.code ? "bg-white text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>{a.city} ({a.code})</button>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-8 max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search routes..." className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none" />
          </div>

          {/* Routes List */}
          <div className="space-y-3">
            {searchFiltered.map((route, i) => (
              <motion.div key={`${route.from}-${route.to}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="p-5 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Plane className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{route.fromCity}</span>
                      <span className="text-gray-600">({route.from})</span>
                      <span className="text-gray-600">→</span>
                      <span className="font-medium">{route.toCity}</span>
                      <span className="text-gray-600">({route.to})</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{route.duration} · {route.flights} flights/week</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-light">From ${route.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
