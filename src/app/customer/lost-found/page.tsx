"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, MapPin, Clock, Check } from "lucide-react";

const items = [
  { id: 1, item: "Black Rimowa suitcase", location: "DXB Terminal 3", date: "2026-06-20", status: "Searching" },
  { id: 2, item: "iPad Pro 12.9\"", location: "Flight AR1824 Seat 22A", date: "2026-06-18", status: "Found" },
];

export default function LostFoundPage() {
  const [reportId] = useState("LF-2026-0842");

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light mb-2">Lost & Found</h1>
          <p className="text-gray-500 mb-8">Report and track lost items.</p>

          <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 mb-8">
            <p className="text-sm text-blue-400">Active Report: <span className="font-mono">{reportId}</span></p>
          </div>

          <div className="space-y-3 mb-8">
            {items.map(item => (
              <div key={item.id} className="p-5 rounded-xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="font-medium">{item.item}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1"><MapPin className="w-3 h-3" />{item.location} <Clock className="w-3 h-3" />{item.date}</div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${item.status === "Found" ? "bg-emerald-500/10 text-emerald-400" : "bg-yellow-500/10 text-yellow-400"}`}>{item.status}</span>
              </div>
            ))}
          </div>

          <button className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center justify-center gap-2"><Search className="w-4 h-4" /> Report Lost Item</button>
        </motion.div>
      </div>
    </div>
  );
}