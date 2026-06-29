"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Cloud, CloudRain, Snowflake, Wind, Thermometer, Droplets, Search } from "lucide-react";

const destinations = [
  { city: "Dubai", country: "UAE", temp: 35, condition: "Sunny", humidity: 45, wind: 12, icon: Sun, forecast: [{ day: "Tue", temp: 36 }, { day: "Wed", temp: 34 }, { day: "Thu", temp: 37 }, { day: "Fri", temp: 35 }, { day: "Sat", temp: 33 }] },
  { city: "El Calafate", country: "Argentina", temp: 8, condition: "Partly Cloudy", humidity: 60, wind: 25, icon: Wind, forecast: [{ day: "Tue", temp: 9 }, { day: "Wed", temp: 7 }, { day: "Thu", temp: 6 }, { day: "Fri", temp: 10 }, { day: "Sat", temp: 8 }] },
  { city: "London", country: "UK", temp: 12, condition: "Light Rain", humidity: 75, wind: 15, icon: CloudRain, forecast: [{ day: "Tue", temp: 13 }, { day: "Wed", temp: 11 }, { day: "Thu", temp: 14 }, { day: "Fri", temp: 12 }, { day: "Sat", temp: 10 }] },
  { city: "Tokyo", country: "Japan", temp: 22, condition: "Clear", humidity: 55, wind: 8, icon: Sun, forecast: [{ day: "Tue", temp: 23 }, { day: "Wed", temp: 21 }, { day: "Thu", temp: 24 }, { day: "Fri", temp: 22 }, { day: "Sat", temp: 20 }] },
  { city: "Reykjavik", country: "Iceland", temp: -2, condition: "Snow", humidity: 80, wind: 30, icon: Snowflake, forecast: [{ day: "Tue", temp: -1 }, { day: "Wed", temp: -3 }, { day: "Thu", temp: 0 }, { day: "Fri", temp: -2 }, { day: "Sat", temp: -4 }] },
  { city: "Sydney", country: "Australia", temp: 28, condition: "Sunny", humidity: 50, wind: 10, icon: Sun, forecast: [{ day: "Tue", temp: 29 }, { day: "Wed", temp: 27 }, { day: "Thu", temp: 30 }, { day: "Fri", temp: 28 }, { day: "Sat", temp: 26 }] },
];

export default function WeatherPage() {
  const [search, setSearch] = useState("");

  const filtered = search ? destinations.filter(d => d.city.toLowerCase().includes(search.toLowerCase())) : destinations;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-4">Plan Ahead</p>
            <h1 className="text-5xl font-light">Destination Weather</h1>
            <p className="text-gray-500 mt-4">Check weather conditions at your destination.</p>
          </div>

          <div className="relative mb-8 max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search city..." className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((dest, i) => (
              <motion.div key={dest.city} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-white/5 bg-white/[0.01] p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-lg">{dest.city}</h3>
                    <p className="text-xs text-gray-500">{dest.country}</p>
                  </div>
                  <dest.icon className="w-8 h-8 text-white/40" />
                </div>
                <div className="flex items-end gap-2 mb-4">
                  <p className="text-4xl font-light">{dest.temp}°</p>
                  <p className="text-sm text-gray-400 mb-1">{dest.condition}</p>
                </div>
                <div className="flex gap-4 mb-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Droplets className="w-3 h-3" />{dest.humidity}%</span>
                  <span className="flex items-center gap-1"><Wind className="w-3 h-3" />{dest.wind} km/h</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-3">
                  {dest.forecast.map((f, j) => (
                    <div key={j} className="text-center">
                      <p className="text-[0.5rem] text-gray-600">{f.day}</p>
                      <p className="text-sm">{f.temp}°</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
