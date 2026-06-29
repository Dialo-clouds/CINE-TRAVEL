"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Plane, Calendar, Mail, Phone, Building, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GroupBookingPage() {
  const [passengers, setPassengers] = useState(10);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center p-8">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-light">Request Submitted!</h2>
          <p className="text-gray-500 mt-2">Our group booking team will contact you within 24 hours.</p>
          <Link href="/" className="inline-block mt-6 px-6 py-3 bg-white text-black rounded-full text-sm font-medium">Return Home</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light mb-2">Group Booking</h1>
          <p className="text-gray-500 mb-8">For groups of 10 or more passengers. Special rates available.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2"><Users className="w-4 h-4" /> Passengers</h3>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setPassengers(Math.max(10, passengers - 1))} className="p-2 hover:bg-white/5 rounded-lg text-xl">-</button>
                  <span className="text-2xl font-light w-12 text-center">{passengers}</span>
                  <button type="button" onClick={() => setPassengers(passengers + 1)} className="p-2 hover:bg-white/5 rounded-lg text-xl">+</button>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-4">
              <h3 className="font-medium flex items-center gap-2"><Plane className="w-4 h-4" /> Flight Details</h3>
              <div className="grid grid-cols-3 gap-3">
                <input type="text" placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" required />
                <input type="text" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" required />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none" required />
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-4">
              <h3 className="font-medium flex items-center gap-2"><Building className="w-4 h-4" /> Contact Information</h3>
              <input type="text" placeholder="Company/Organization (optional)" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" />
              <div className="grid grid-cols-2 gap-3">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" required />
                <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" required />
              </div>
            </div>

            <button type="submit" className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center justify-center gap-2">Submit Request <ArrowRight className="w-4 h-4" /></button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
