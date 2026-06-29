"use client";

import { motion } from "framer-motion";
import { Camera, MapPin, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

const stories = [
  { title: "Chasing the Aurora in Iceland", author: "Elena Vasquez", location: "Reykjavik, Iceland", image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=600&q=80", excerpt: "The northern lights danced across the sky like a celestial script written in green and purple light...", likes: 234 },
  { title: "48 Hours in Kyoto During Sakura", author: "Yuki Tanaka", location: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80", excerpt: "Cherry blossoms fell like pink snow as I walked the Philosopher's Path at dawn...", likes: 189 },
  { title: "The Silence of the Sahara", author: "Marcus Chen", location: "Merzouga, Morocco", image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=600&q=80", excerpt: "The dunes stretched to infinity, their curves sculpted by winds that have traveled a thousand miles...", likes: 312 },
  { title: "Patagonia: Where the Earth Ends", author: "Sofia Rossi", location: "El Chalten, Argentina", image: "https://images.unsplash.com/photo-1531844251246-9a1bfaae09fc?w=600&q=80", excerpt: "Fitz Roy pierced the sky like a granite cathedral built for ancient gods...", likes: 456 },
];

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-light">Travel Stories</h1>
            <p className="text-gray-500 mt-4">Cinematic tales from our community of explorers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((story, i) => (
              <motion.div key={story.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all">
                <div className="relative h-48 overflow-hidden" style={{ backgroundImage: `url(${story.image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-light">{story.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span>{story.author}</span>
                      <MapPin className="w-3 h-3" />{story.location}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-400 leading-relaxed">{story.excerpt}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="flex items-center gap-1 text-xs text-gray-500"><Heart className="w-3 h-3 text-red-400" />{story.likes}</span>
                    <span className="text-xs text-amber-400 flex items-center gap-1">Read more <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}