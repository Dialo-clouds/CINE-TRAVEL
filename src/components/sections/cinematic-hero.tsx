"use client";

import { GLSLHills } from "@/components/ui/glsl-hills";
import Link from "next/link";
import { ArrowRight, Sparkles, Star, Globe, Map, Compass } from "lucide-react";

export function CinematicHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#070B14]">
      {/* GLSL Animated Hills Background */}
      <GLSLHills
        width="100vw"
        height="100vh"
        speed={0.2}
        colorTop="#D4AF37"
        colorBottom="#070B14"
        cameraZ={100}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070B14]/80 via-transparent to-[#070B14] pointer-events-none z-[2]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#070B14_80%)] pointer-events-none z-[2]" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
        {/* Trust Badge */}
        <div className="mb-8 animate-[fadeInDown_0.8s_ease-out]">
          <div className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37]/5 backdrop-blur-md border border-[#D4AF37]/20 rounded-full">
            <Star className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm text-[#D4AF37]/80 font-mono tracking-wide">
              The Cinematic Exploration Platform
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center space-y-2 max-w-6xl mx-auto">
          <h1 className="font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] tracking-[-0.04em] font-semibold animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            <span className="bg-gradient-to-b from-[#F8FAFC] to-[#F8FAFC]/60 bg-clip-text text-transparent">
              CineTravel
            </span>
          </h1>
          <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.9] tracking-[-0.03em] font-semibold animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#E8C547] to-[#D4AF37] bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              AI
            </span>
          </h2>
        </div>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-[#F8FAFC]/50 max-w-xl text-center leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
          Discover destinations like scenes from a film. AI-curated storyboards, 
          an orbital globe, and expedition planning that feels like art direction.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-3 mt-8 animate-[fadeInUp_0.8s_ease-out_0.7s_both]">
          {[
            { icon: Globe, label: "3D Globe" },
            { icon: Map, label: "Storyboards" },
            { icon: Compass, label: "Explore" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/10 bg-[#D4AF37]/5 text-xs text-[#F8FAFC]/60"
            >
              <item.icon className="w-3.5 h-3.5 text-[#D4AF37]" />
              {item.label}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-[fadeInUp_0.8s_ease-out_0.9s_both]">
          <Link
            href="/explore"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#D4AF37] text-[#070B14] font-semibold text-sm overflow-hidden transition-all duration-500 hover:bg-[#E8C547] hover:shadow-xl hover:shadow-[#D4AF37]/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Begin Exploration</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/auteur"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#F8FAFC]/60 text-sm hover:border-[#D4AF37]/40 hover:text-[#F8FAFC] transition-all duration-500 backdrop-blur-sm"
          >
            AI Planner
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-[fadeIn_1s_ease-out_1.5s_both]">
        <div className="flex flex-col items-center gap-2 animate-[bounce_2s_ease-in-out_infinite]">
          <div className="w-px h-16 bg-gradient-to-b from-[#D4AF37]/60 to-transparent" />
          <span className="text-[0.5rem] font-mono text-[#D4AF37]/40 uppercase tracking-[0.3em]">Scroll</span>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
