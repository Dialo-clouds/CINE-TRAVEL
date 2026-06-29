"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { ArrowRight, Sparkles, Map, Compass, Globe } from "lucide-react";
import Link from "next/link";

const SplineScene = lazy(() =>
  import("@/components/ui/splite").then((mod) => ({ default: mod.SplineScene }))
);

export function PremiumHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#070B14]">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#38BDF8]/3 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/3 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 mb-8">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-mono text-[#D4AF37]/80 uppercase tracking-[0.3em]">
                Cinematic Exploration Platform
              </span>
            </div>

            <h1 className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em] font-semibold mb-6">
              <span className="bg-gradient-to-b from-[#F8FAFC] to-[#F8FAFC]/70 bg-clip-text text-transparent">
                CineTravel
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#E8C547] bg-clip-text text-transparent">
                AI
              </span>
            </h1>

            <p className="text-lg text-[#F8FAFC]/50 max-w-lg leading-relaxed mb-10">
              Discover destinations like scenes from a film. AI-curated
              storyboards, an orbital globe, and expedition planning that
              feels like art direction.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/explore"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#D4AF37] text-[#070B14] font-medium text-sm overflow-hidden transition-all duration-500 hover:bg-[#E8C547] hover:shadow-lg hover:shadow-[#D4AF37]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Begin Exploration
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="/auteur"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#D4AF37]/20 text-[#F8FAFC]/60 text-sm hover:border-[#D4AF37]/40 hover:text-[#F8FAFC] transition-all duration-500"
              >
                <Sparkles className="w-4 h-4" />
                AI Planner
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-[#D4AF37]/5">
              {[
                { value: "100+", label: "Destinations" },
                { value: "94", label: "Avg CineScore" },
                { value: "AI", label: "Storyboard Gen" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl text-[#D4AF37]">
                    {stat.value}
                  </p>
                  <p className="text-[0.6rem] font-mono text-[#F8FAFC]/30 uppercase tracking-[0.2em] mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: 3D Scene + Spotlight Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="w-full h-[550px] relative overflow-hidden border-[#D4AF37]/10">
              {/* Spotlight effect on hover */}
              <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />

              <div className="flex flex-col h-full">
                {/* Top: 3D Scene */}
                <div className="flex-1 relative">
                  <Suspense
                    fallback={
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />
                          <p className="text-[#F8FAFC]/30 text-xs font-mono">
                            Loading 3D Scene...
                          </p>
                        </div>
                      </div>
                    }
                  >
                    <SplineScene
                      scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                      className="w-full h-full"
                    />
                  </Suspense>
                </div>

                {/* Bottom: Feature pills */}
                <div className="p-6 flex gap-3 border-t border-[#D4AF37]/5">
                  {[
                    { icon: Globe, label: "3D Globe" },
                    { icon: Map, label: "Storyboards" },
                    { icon: Compass, label: "Explore" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/10 text-xs text-[#F8FAFC]/50 hover:border-[#D4AF37]/30 hover:text-[#F8FAFC] transition-all cursor-pointer"
                    >
                      <item.icon className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37]/40 to-transparent" />
          <span className="text-[0.5rem] font-mono text-[#D4AF37]/30 uppercase tracking-[0.3em]">
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
