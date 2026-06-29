"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const generateMonthData = (year: number, month: number) => {
  const days: any[] = [];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      price: Math.floor(Math.random() * 200) + 200,
      available: Math.random() > 0.2,
    });
  }
  return days;
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function PriceCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear] = useState(2026);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const days = generateMonthData(currentYear, currentMonth);

  const getPriceColor = (price: number) => {
    if (price < 250) return "text-emerald-400";
    if (price < 350) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light mb-2">Price Calendar</h1>
          <p className="text-gray-500 mb-8">Find the cheapest days to fly.</p>

          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setCurrentMonth(m => m > 0 ? m - 1 : 11)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">←</button>
            <h2 className="text-xl font-light">{MONTHS[currentMonth]} {currentYear}</h2>
            <button onClick={() => setCurrentMonth(m => m < 11 ? m + 1 : 0)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">→</button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
              <div key={d} className="text-center text-xs text-gray-600 py-2">{d}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.01 }}
                onClick={() => day && setSelectedDate(day.day)}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-all ${
                  !day ? "bg-transparent" :
                  selectedDate === day.day ? "bg-white text-black" :
                  !day.available ? "bg-white/5 text-gray-600 cursor-not-allowed" :
                  "bg-white/[0.02] hover:bg-white/10 cursor-pointer"
                }`}
              >
                {day && (
                  <>
                    <span>{day.day}</span>
                    <span className={`text-[0.5rem] ${getPriceColor(day.price)}`}>${day.price}</span>
                  </>
                )}
              </motion.button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-6 text-xs text-gray-500">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-emerald-400/30" /> Cheapest</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-yellow-400/30" /> Moderate</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-400/30" /> Expensive</div>
          </div>

          {selectedDate && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
              <p className="text-sm">Selected: {MONTHS[currentMonth]} {selectedDate}, {currentYear}</p>
              <p className="text-lg font-light mt-1">From ${days.find(d => d?.day === selectedDate)?.price || "—"}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
