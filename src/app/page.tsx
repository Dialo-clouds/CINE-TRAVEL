"use client";

import { useEffect, useState } from "react";
import { HeroOdyssey } from "@/components/ui/hero-odyssey";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { ArrowRight, Star, Sparkles, Globe, BookOpen, Camera, Compass, ChartSpline } from "lucide-react";

const UNSPLASH: Record<string, string> = {
  patagonia: "https://images.unsplash.com/photo-1531844251246-9a1bfaae09fc?w=800&q=80",
  kyoto: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
  sahara: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&q=80",
  iceland: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80",
  namibia: "https://images.unsplash.com/photo-1571077325458-2bd6b0d2ad7c?w=800&q=80",
};

const FALLBACK = [
  { id: "1", name: "PATAGONIA", slug: "patagonia", cinescore: 94, description_short: "Where granite cathedrals meet ancient ice.", location: { country: "Chile / Argentina" } },
  { id: "2", name: "KYOTO", slug: "kyoto", cinescore: 97, description_short: "Ten thousand whispers in the mist.", location: { country: "Japan" } },
  { id: "3", name: "SAHARA", slug: "sahara", cinescore: 91, description_short: "Ocean of silence. Sea of light.", location: { country: "Morocco" } },
  { id: "4", name: "ICELAND", slug: "iceland", cinescore: 95, description_short: "Where the Earth is still being born.", location: { country: "Iceland" } },
];

const features = [
  { icon: Sparkles, title: "AI Storyboard Generator", description: "Describe your vision. AI composes a cinematic storyboard.", href: "/auteur" },
  { icon: Globe, title: "Orbital Globe", description: "Explore Earth as a wireframe sculpture.", href: "/globe" },
  { icon: BookOpen, title: "Field Notes Journal", description: "Capture moments with cinematic grade.", href: "/journal" },
  { icon: Camera, title: "CineScore Rating", description: "Photogenic density. Visual integrity.", href: "/explore" },
  { icon: Compass, title: "Atmosphere Browser", description: "Search by feeling. Find your mood.", href: "/explore" },
  { icon: ChartSpline, title: "Golden Ratio Budget", description: "Budget as composition.", href: "/budget" },
];

export default function LandingPage() {
  const [destinations, setDestinations] = useState(FALLBACK);

  useEffect(() => {
    supabase.from("destinations").select("*").eq("status", "live").order("cinescore", { ascending: false }).limit(4)
      .then(({ data }) => { if (data?.length) setDestinations(data as any); })
      .catch(() => {});
  }, []);

  return (
    <main className="relative bg-black text-white overflow-hidden">
      <HeroOdyssey />

      <section className="relative py-16 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
              <Sparkles className="w-4 h-4 text-white/70" />
              <span className="text-xs text-white/60 uppercase tracking-[0.2em]">The Platform</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-tight">
              Cinematic Tools for<br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent">Modern Explorers</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link href={f.href} className="block p-6 rounded-xl border border-white/5 bg-black/50 backdrop-blur-xl hover:border-white/10 hover:-translate-y-1 transition-all duration-300">
                  <f.icon className="w-8 h-8 text-white/40 mb-4" />
                  <h3 className="text-lg font-medium mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-400">{f.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
              <Star className="w-4 h-4 text-white/70" />
              <span className="text-xs text-white/60 uppercase tracking-[0.2em]">Curated Destinations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-tight">Featured Expeditions</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {destinations.map((dest: any, i: number) => (
              <motion.div key={dest.slug} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link href={`/destination/${dest.slug}`} className="block group overflow-hidden rounded-xl border border-white/5 bg-black/50 hover:border-white/10 transition-all">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${UNSPLASH[dest.slug] || UNSPLASH.patagonia})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-sm">
                      <span className="text-white text-sm font-medium">{dest.cinescore}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium group-hover:text-blue-400 transition-colors">{dest.name}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{dest.location?.country}</p>
                    <p className="text-sm text-gray-400 mt-2">{dest.description_short}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/explore" className="px-8 py-4 border border-white/10 rounded-full text-sm text-white/50 hover:text-white transition-colors inline-flex items-center gap-2">
              View All Destinations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-32 px-4 md:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-6">Ready to Explore?</h2>
          <Link href="/explore" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
            Enter the Observatory <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      <footer className="border-t border-white/5 py-12 text-center">
        <p className="text-lg font-medium">CineTravel AI</p>
        <p className="text-xs text-white/20 mt-1">All expeditions begin with a single frame.</p>
      </footer>
    </main>
  );
}


