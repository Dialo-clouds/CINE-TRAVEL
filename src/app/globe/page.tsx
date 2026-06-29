"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import { MapPin, ArrowRight } from "lucide-react";

const destinations = [
  { name: "PATAGONIA", slug: "patagonia", score: 94 },
  { name: "KYOTO", slug: "kyoto", score: 97 },
  { name: "SAHARA", slug: "sahara", score: 91 },
  { name: "ICELAND", slug: "iceland", score: 95 },
];

export default function GlobePage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Hero-style background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="text-xs text-white/60 uppercase tracking-[0.2em]">Orbital View</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light mb-4">Globe</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Explore Earth as a wireframe sculpture. Drag to rotate, scroll to zoom.
          </p>
        </motion.div>

        {/* Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex justify-center mb-12"
        >
          <RotatingEarth width={700} height={500} className="max-w-full" />
        </motion.div>

        {/* Destination Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="backdrop-blur-3xl bg-black/50 border border-white/10 rounded-2xl p-6">
            <p className="text-xs text-white/40 uppercase tracking-[0.2em] mb-4">Explore Destinations</p>
            <div className="space-y-2">
              {destinations.map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/destination/${dest.slug}`}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">{dest.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">{dest.score}</span>
                    <ArrowRight className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Back link */}
        <div className="text-center mt-12">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-sm text-white/50 hover:text-white hover:border-white/20 transition-all">
            Return to Observatory
          </Link>
        </div>
      </div>
    </main>
  );
}
