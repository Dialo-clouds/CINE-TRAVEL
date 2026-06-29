"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Plane, ArrowRight } from "lucide-react";

export default function AlertsPage() {
  const [email, setEmail] = useState("");
  const [route, setRoute] = useState("");
  const [price, setPrice] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-10">
            <Bell className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h1 className="text-3xl font-light">Fare Alerts</h1>
            <p className="text-gray-500 mt-2">Get notified when prices drop.</p>
          </div>
          {submitted ? (
            <div className="text-center p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <p className="text-emerald-400 text-lg">Alert Created!</p>
              <p className="text-gray-400 text-sm mt-2">We'll email you when prices drop below ${price}.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" required />
              <input type="text" value={route} onChange={(e) => setRoute(e.target.value)} placeholder="Route (e.g. EZE to FTE)" className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" required />
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Target price ($)" className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" required />
              <button type="submit" className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center justify-center gap-2">Create Alert <ArrowRight className="w-4 h-4" /></button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}