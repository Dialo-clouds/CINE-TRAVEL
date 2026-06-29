"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plane, Map, Calendar, Shield, ArrowRight } from "lucide-react";

export default function BookPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-light mb-4">Book a Flight</h1>
          <p className="text-gray-400 mb-12">Choose your booking type.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/book/flights" className="group p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] transition-all">
              <Plane className="w-10 h-10 text-white/20 group-hover:text-white/60 transition-colors mb-6" />
              <h3 className="text-xl font-light mb-2">One Way / Round Trip</h3>
              <p className="text-sm text-gray-500">Search for direct and connecting flights to your destination.</p>
              <span className="inline-flex items-center gap-2 text-sm text-white/40 mt-4 group-hover:text-white/70">Get Started <ArrowRight className="w-4 h-4" /></span>
            </Link>

            <Link href="/book/multi" className="group p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] transition-all">
              <Map className="w-10 h-10 text-white/20 group-hover:text-white/60 transition-colors mb-6" />
              <h3 className="text-xl font-light mb-2">Multi-City</h3>
              <p className="text-sm text-gray-500">Build a custom itinerary with up to 6 stops across multiple cities.</p>
              <span className="inline-flex items-center gap-2 text-sm text-white/40 mt-4 group-hover:text-white/70">Plan Route <ArrowRight className="w-4 h-4" /></span>
            </Link>

            <Link href="/book/calendar" className="group p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] transition-all">
              <Calendar className="w-10 h-10 text-white/20 group-hover:text-white/60 transition-colors mb-6" />
              <h3 className="text-xl font-light mb-2">Price Calendar</h3>
              <p className="text-sm text-gray-500">Find the cheapest dates to fly with our interactive price calendar.</p>
              <span className="inline-flex items-center gap-2 text-sm text-white/40 mt-4 group-hover:text-white/70">View Prices <ArrowRight className="w-4 h-4" /></span>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
