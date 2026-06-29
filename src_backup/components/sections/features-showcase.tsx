"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Sparkles, Globe, BookOpen, Camera, Compass, ChartSpline } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Sparkles,
    title: "AI Storyboard Generator",
    description: "Describe your vision. The Auteur AI composes a cinematic storyboard with scenes, visual direction, and curated experiences.",
    href: "/auteur",
    color: "#D4AF37",
  },
  {
    icon: Globe,
    title: "Orbital Globe",
    description: "Explore Earth as a wireframe sculpture. Aurora light pillars mark destinations. Flight paths arc across oceans.",
    href: "/globe",
    color: "#38BDF8",
  },
  {
    icon: BookOpen,
    title: "Field Notes Journal",
    description: "Capture moments with cinematic grade. Photos, audio, and prose compile into a designed expedition report.",
    href: "/journal",
    color: "#10B981",
  },
  {
    icon: Camera,
    title: "CineScore Rating",
    description: "Every destination rated on photogenic density, golden hour quality, and architectural significance.",
    href: "/explore",
    color: "#FB923C",
  },
  {
    icon: Compass,
    title: "Atmosphere Browser",
    description: "Search by feeling. Ethereal mist. Brutalist concrete. Verdant wilderness. Find your mood.",
    href: "/explore",
    color: "#8B5CF6",
  },
  {
    icon: ChartSpline,
    title: "Golden Ratio Budget",
    description: "Visualize trip costs as a golden spiral. Every allocation is a creative decision.",
    href: "/budget",
    color: "#EC4899",
  },
];

export function FeaturesShowcase() {
  return (
    <section className="relative py-32 px-6 bg-[#070B14]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 mb-6">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-mono text-[#D4AF37]/80 uppercase tracking-[0.3em]">
              The Platform
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-[-0.03em] font-semibold mb-4">
            Cinematic Tools for
            <br />
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#E8C547] bg-clip-text text-transparent">
              Modern Explorers
            </span>
          </h2>
          <p className="text-[#F8FAFC]/40 max-w-xl mx-auto text-lg">
            Every feature is designed with the visual grammar of film and the precision of aerospace engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link href={feature.href}>
                <Card className="group h-full border-[#D4AF37]/5 hover:border-[#D4AF37]/20 transition-all duration-500 hover:-translate-y-1">
                  <CardHeader>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-500"
                      style={{
                        backgroundColor: `${feature.color}10`,
                        border: `1px solid ${feature.color}20`,
                      }}
                    >
                      <feature.icon
                        className="w-6 h-6 transition-colors duration-500"
                        style={{ color: feature.color }}
                      />
                    </div>
                    <CardTitle className="text-xl group-hover:text-[#D4AF37] transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
