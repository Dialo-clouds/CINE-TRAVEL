"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { supabase } from "@/lib/supabase/client";
import {
    Globe,
    Star,
    Sparkles,
    Camera,
    BookOpen,
    Compass,
    Map,
    Cloud,
    Mountain,
    Sun,
} from "lucide-react";

const UNSPLASH: Record<string, string> = {
  patagonia: "https://images.unsplash.com/photo-1531844251246-9a1bfaae09fc?w=800&q=80",
  kyoto: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
  sahara: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&q=80",
  iceland: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80",
  namibia: "https://images.unsplash.com/photo-1571077325458-2bd6b0d2ad7c?w=800&q=80",
  norway: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
  jordan: "https://images.unsplash.com/photo-1578913060184-4fa64c5c6a8b?w=800&q=80",
  bolivia: "https://images.unsplash.com/photo-1528643812267-5a1edb2b2751?w=800&q=80",
};

const FALLBACK_DESTINATIONS: BentoItem[] = [
  {
    title: "Patagonia",
    meta: "CineScore 94",
    description: "Where granite cathedrals meet ancient ice. Glaciers calve into milky turquoise lakes under the Southern Cross.",
    icon: <Mountain className="w-4 h-4 text-blue-400" />,
    status: "Featured",
    tags: ["Grandiose", "Solitary", "Glaciers"],
    colSpan: 2,
    hasPersistentHover: true,
    cta: "Explore Expedition",
  },
  {
    title: "Kyoto",
    meta: "CineScore 97",
    description: "Ten thousand whispers in the mist. Ancient temples emerge from bamboo groves like ships from fog.",
    icon: <Cloud className="w-4 h-4 text-purple-400" />,
    status: "Top Rated",
    tags: ["Ethereal", "Verdant", "Temples"],
    cta: "Explore Expedition",
  },
  {
    title: "Sahara",
    meta: "CineScore 91",
    description: "Ocean of silence. Sea of light. The Milky Way so bright it casts shadows on the sand.",
    icon: <Sun className="w-4 h-4 text-orange-400" />,
    status: "Remote",
    tags: ["Solitary", "Brutal", "Desert"],
    cta: "Explore Expedition",
  },
  {
    title: "Iceland",
    meta: "CineScore 95",
    description: "Where the Earth is still being born. Volcanoes erupt beneath glaciers. The aurora dances overhead.",
    icon: <Globe className="w-4 h-4 text-emerald-400" />,
    status: "Popular",
    tags: ["Ethereal", "Grandiose", "Aurora"],
    colSpan: 2,
    cta: "Explore Expedition",
  },
  {
    title: "Namibia",
    meta: "CineScore 89",
    description: "The oldest desert on Earth. Dead trees stand frozen in time at Deadvlei under the Southern Cross.",
    icon: <Camera className="w-4 h-4 text-yellow-400" />,
    status: "Hidden",
    tags: ["Solitary", "Brutal", "Dunes"],
    cta: "Explore Expedition",
  },
  {
    title: "Norwegian Fjords",
    meta: "CineScore 92",
    description: "Glass cabins perched above fjords. Waterfalls plunge into canyons carved by ancient ice.",
    icon: <Map className="w-4 h-4 text-cyan-400" />,
    status: "Trending",
    tags: ["Grandiose", "Verdant", "Fjords"],
    cta: "Explore Expedition",
  },
];

const FEATURES: BentoItem[] = [
  {
    title: "AI Storyboard Generator",
    meta: "New",
    description: "Describe your vision. The Auteur AI composes a cinematic storyboard with scenes, visual direction, and curated experiences.",
    icon: <Sparkles className="w-4 h-4 text-blue-400" />,
    status: "AI-Powered",
    tags: ["Storyboards", "Planning", "AI"],
    colSpan: 2,
    hasPersistentHover: true,
    cta: "Try AI Planner",
  },
  {
    title: "Orbital Globe",
    meta: "Interactive",
    description: "Explore Earth as a wireframe sculpture with aurora light pillars marking destinations.",
    icon: <Globe className="w-4 h-4 text-emerald-400" />,
    status: "3D",
    tags: ["Globe", "Interactive", "Maps"],
    cta: "Open Globe",
  },
  {
    title: "Field Notes Journal",
    meta: "12 entries",
    description: "Capture moments with cinematic grade. Photos, audio, and prose compile into a designed expedition report.",
    icon: <BookOpen className="w-4 h-4 text-purple-400" />,
    status: "Updated",
    tags: ["Journal", "Photos", "Export"],
    cta: "View Journal",
  },
  {
    title: "CineScore Rating",
    meta: "Proprietary",
    description: "Every destination rated on photogenic density, golden hour quality, and architectural significance.",
    icon: <Star className="w-4 h-4 text-yellow-400" />,
    status: "Unique",
    tags: ["Ratings", "Visual", "Quality"],
    cta: "Learn More",
  },
  {
    title: "Atmosphere Browser",
    meta: "New",
    description: "Search by feeling. Ethereal mist. Brutalist concrete. Verdant wilderness. Find destinations that match your mood.",
    icon: <Compass className="w-4 h-4 text-orange-400" />,
    status: "Beta",
    tags: ["Search", "Mood", "Discovery"],
    cta: "Browse",
  },
];

export default function ExplorePage() {
  const [destinations, setDestinations] = useState<BentoItem[]>(FALLBACK_DESTINATIONS);

  useEffect(() => {
    supabase
      .from("destinations")
      .select("*")
      .eq("status", "live")
      .order("cinescore", { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (data?.length) {
          const mapped: BentoItem[] = data.map((d: any) => ({
            title: d.name,
            meta: `CineScore ${d.cinescore}`,
            description: d.description_short || "",
            icon: <Star className="w-4 h-4 text-blue-400" />,
            status: "Live",
            tags: d.atmosphere_tags || [],
            colSpan: 1 as number,
            cta: "Explore Expedition",
          }));
          if (mapped.length > 0 && mapped[0]) {
            mapped[0].colSpan = 2;
            mapped[0].hasPersistentHover = true;
          }
          setDestinations(mapped);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
            <Globe className="w-4 h-4 text-white/70" />
            <span className="text-xs text-white/60 uppercase tracking-[0.2em]">Discover</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light mb-4">Explore</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Curated destinations and cinematic tools for the modern explorer. Every destination rated on visual integrity.
          </p>
        </motion.div>

        {/* Destination Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Star className="w-5 h-5 text-white/50" />
            <h2 className="text-2xl font-light">Featured Destinations</h2>
          </div>
          <BentoGrid items={destinations} />
        </motion.div>

        {/* Platform Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-5 h-5 text-white/50" />
            <h2 className="text-2xl font-light">Platform Features</h2>
          </div>
          <BentoGrid items={FEATURES} />
        </motion.div>

        {/* Back link */}
        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-sm text-white/50 hover:text-white hover:border-white/20 transition-all"
          >
            Return to Observatory
          </Link>
        </div>
      </div>
    </main>
  );
}
