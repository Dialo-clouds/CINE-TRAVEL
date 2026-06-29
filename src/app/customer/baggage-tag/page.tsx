"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Printer, QrCode, Download, Plane, MapPin, User, Check } from "lucide-react";

export default function BaggageTagPage() {
  const [bookingRef, setBookingRef] = useState("");
  const [found, setFound] = useState(false);
  const [printed, setPrinted] = useState(false);

  const handleSearch = () => {
    if (bookingRef.trim()) setFound(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <Printer className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-3xl font-light">Baggage Tag Printing</h1>
            <p className="text-gray-500 mt-2">Print your baggage tags at home and skip the queue.</p>
          </div>

          {!found ? (
            <div className="space-y-4">
              <input type="text" value={bookingRef} onChange={(e) => setBookingRef(e.target.value)} placeholder="Booking Reference (e.g. CT-ABC123)" className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white uppercase placeholder:text-gray-600 focus:outline-none" />
              <button onClick={handleSearch} className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200">Find Booking</button>
            </div>
          ) : printed ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <Check className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-xl font-light">Tags Printed!</h2>
              <p className="text-gray-400 text-sm mt-2">Attach tags to your bags before arriving at the airport.</p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="rounded-2xl border-2 border-dashed border-white/10 p-8 text-center">
                <div className="border-2 border-white/20 rounded-xl p-6 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Plane className="w-8 h-8" />
                    <QrCode className="w-16 h-16" />
                  </div>
                  <div className="text-left space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Passenger</span><span>John Doe</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Flight</span><span>AR1824</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">From</span><span className="flex items-center gap-1"><MapPin className="w-3 h-3" />EZE</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">To</span><span className="flex items-center gap-1"><MapPin className="w-3 h-3" />FTE</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Weight</span><span>23kg max</span></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Baggage Tag Preview</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {["Bag 1 of 1", "23 kg", "Economy", "Checked"].map((info) => (
                  <div key={info} className="p-3 rounded-xl border border-white/5 text-center text-sm text-gray-400">{info}</div>
                ))}
              </div>

              <button onClick={() => setPrinted(true)} className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center justify-center gap-2">
                <Printer className="w-4 h-4" /> Print Baggage Tags
              </button>
              <button className="w-full h-12 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}