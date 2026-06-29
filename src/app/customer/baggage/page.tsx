"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Check, Clock, Truck, MapPin, Plane, Search } from "lucide-react";

const mockBaggage = [
  {
    id: "BAG001",
    tagNumber: "CT-BG-48291",
    flightNumber: "AR1824",
    passenger: "John Doe",
    status: "loaded",
    location: "Aircraft Cargo Hold",
    lastUpdate: "2 minutes ago",
    timeline: [
      { status: "Checked In", location: "Buenos Aires (EZE)", time: "06:30 AM", done: true },
      { status: "Security Screening", location: "EZE Terminal A", time: "06:45 AM", done: true },
      { status: "Loaded on Aircraft", location: "Aircraft AR1824", time: "07:50 AM", done: true },
      { status: "In Transit", location: "En Route to FTE", time: "08:30 AM", done: false },
      { status: "Arrived", location: "El Calafate (FTE)", time: "11:45 AM", done: false },
      { status: "Ready for Collection", location: "FTE Baggage Claim", time: "12:00 PM", done: false },
    ],
  },
  {
    id: "BAG002",
    tagNumber: "CT-BG-48292",
    flightNumber: "AR1824",
    passenger: "John Doe",
    status: "checked",
    location: "EZE Baggage Handling",
    lastUpdate: "1 hour ago",
    timeline: [
      { status: "Checked In", location: "Buenos Aires (EZE)", time: "06:30 AM", done: true },
      { status: "Security Screening", location: "EZE Terminal A", time: "06:45 AM", done: true },
      { status: "Loaded on Aircraft", location: "Aircraft AR1824", time: "07:50 AM", done: false },
      { status: "In Transit", location: "En Route to FTE", time: "08:30 AM", done: false },
      { status: "Arrived", location: "El Calafate (FTE)", time: "11:45 AM", done: false },
      { status: "Ready for Collection", location: "FTE Baggage Claim", time: "12:00 PM", done: false },
    ],
  },
];

export default function BaggageTrackerPage() {
  const [searchTag, setSearchTag] = useState("");
  const [trackedBag, setTrackedBag] = useState<any>(null);

  const handleSearch = () => {
    const found = mockBaggage.find(b => b.tagNumber.toLowerCase() === searchTag.toLowerCase());
    setTrackedBag(found || null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light mb-2">Baggage Tracker</h1>
          <p className="text-gray-500 mb-8">Track your luggage in real-time.</p>

          {/* Search */}
          <div className="flex gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                placeholder="Enter baggage tag number (e.g. CT-BG-48291)"
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <button onClick={handleSearch} className="px-6 h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Search className="w-4 h-4" /> Track
            </button>
          </div>

          {/* Quick Lookup */}
          {!trackedBag && (
            <div className="space-y-2 mb-8">
              <p className="text-xs text-gray-600 mb-2">Quick lookup:</p>
              {mockBaggage.map(b => (
                <button key={b.id} onClick={() => { setSearchTag(b.tagNumber); setTrackedBag(b); }} className="block w-full p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 text-left transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-mono text-sm">{b.tagNumber}</p>
                        <p className="text-xs text-gray-500">{b.passenger} · {b.flightNumber}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">{b.status}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Tracking Result */}
          {trackedBag && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/5 bg-white/[0.01] p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-mono text-lg">{trackedBag.tagNumber}</p>
                  <p className="text-sm text-gray-500">{trackedBag.passenger} · Flight {trackedBag.flightNumber}</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 uppercase tracking-wider">{trackedBag.status}</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-6">
                <MapPin className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm font-medium">{trackedBag.location}</p>
                  <p className="text-xs text-gray-500">Updated {trackedBag.lastUpdate}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative pl-6">
                <div className="absolute left-2.5 top-2 bottom-2 w-px bg-white/10" />
                {trackedBag.timeline.map((step: any, i: number) => (
                  <div key={i} className="relative pb-6 last:pb-0">
                    <div className={`absolute -left-6 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      step.done ? "border-emerald-400 bg-emerald-400/10" : "border-white/10 bg-black"
                    }`}>
                      {step.done && <Check className="w-3 h-3 text-emerald-400" />}
                    </div>
                    <div className={step.done ? "" : "opacity-40"}>
                      <p className="text-sm font-medium">{step.status}</p>
                      <p className="text-xs text-gray-500">{step.location} · {step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
