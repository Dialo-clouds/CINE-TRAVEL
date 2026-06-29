"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { ArrowRight, Sparkles, Send, MapPin } from "lucide-react";

const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const MOCK_STORYBOARD = {
  title: "PATAGONIA EXPEDITION",
  subtitle: "A 5-Day Cinematic Journey",
  scenes: [
    { day: 1, title: "THE LONG DAWN", description: "First light catches the eastern face of Fitz Roy. Mist rises from glacial lakes like breath from a sleeping giant.", activities: ["Dawn approach to Laguna de los Tres", "Breakfast at Refugio Poincenot", "Afternoon reconnaissance"], visualDirection: "The pale blue light of a Tarkovsky dawn.", accommodation: "Glass-and-concrete refuge" },
    { day: 2, title: "CATHEDRAL OF ICE", description: "The Perito Moreno glacier reveals itself through mist.", activities: ["Ice trekking", "Sunset photography"], visualDirection: "Herzog's encounters. Blue never photographed.", accommodation: "Eco-lodge facing ice field" },
    { day: 3, title: "THE SOUTHERN CROSS", description: "Camp at the edge of the steppe. No artificial light for 200km.", activities: ["Wild camping", "Night sky photography"], visualDirection: "Kubrick's star gate, but still.", accommodation: "Expedition tent" },
  ],
};

export default function AuteurPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyboard, setStoryboard] = useState<any>(null);
  const [expandedScene, setExpandedScene] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 2500));
    setStoryboard(MOCK_STORYBOARD);
    setIsGenerating(false);
  };

  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Robot Background */}
      <div className="absolute inset-0 z-0 opacity-70">
        <InteractiveRobotSpline scene={ROBOT_SCENE_URL} className="absolute inset-0" />
      </div>
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex flex-col">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
            <Sparkles className="w-4 h-4 text-white/70" />
            <span className="text-xs text-white/60 uppercase tracking-[0.2em]">AI Studio</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light mb-4">The Auteur</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">Describe the journey you seek. AI composes a cinematic storyboard.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-12">
          <div className="backdrop-blur-3xl bg-black/50 border border-white/10 rounded-2xl p-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your expedition..."
              className="w-full bg-transparent text-white placeholder:text-white/20 resize-none focus:outline-none text-lg leading-relaxed min-h-[100px]"
              rows={3}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleGenerate(); } }}
            />
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <div className="flex flex-wrap gap-2">
                {["Mist and temples", "Desert silence", "Glacier cabins"].map((s) => (
                  <button key={s} onClick={() => setPrompt(s)} className="text-xs text-white/30 hover:text-white/50 px-3 py-1.5 rounded-full border border-white/5">{s}</button>
                ))}
              </div>
              <button onClick={handleGenerate} disabled={!prompt.trim() || isGenerating} className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 disabled:opacity-30 transition-all">
                {isGenerating ? "Composing..." : "Generate Storyboard"} <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isGenerating && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-16">
              <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }} className="w-20 h-20 rounded-full border-2 border-blue-500/30 flex items-center justify-center mb-6" style={{ boxShadow: "0 0 40px rgba(59,130,246,0.15)" }}>
                <Sparkles className="w-8 h-8 text-blue-400" />
              </motion.div>
              <p className="text-white/60 text-sm">Composing your storyboard...</p>
              <div className="mt-4 w-64 h-0.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div className="h-full bg-blue-500" animate={{ width: ["0%", "40%", "70%", "90%", "100%"] }} transition={{ duration: 2.5 }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!storyboard && !isGenerating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col items-center py-12">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white/20" />
            </motion.div>
            <p className="text-white/20 text-sm">Describe your vision above to begin</p>
          </motion.div>
        )}

        <AnimatePresence>
          {storyboard && !isGenerating && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-10 text-center">
                <p className="text-blue-400 text-xs uppercase tracking-[0.3em] mb-2">Storyboard Generated</p>
                <h2 className="text-4xl md:text-5xl font-light mb-2">{storyboard.title}</h2>
                <p className="text-white/40 text-sm uppercase tracking-wider">{storyboard.subtitle}</p>
              </div>
              <div className="relative pl-12">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-blue-500/10 to-transparent" />
                {storyboard.scenes.map((scene: any, index: number) => (
                  <motion.div key={scene.day} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="relative mb-8">
                    <div className="absolute -left-12 top-0 w-10 h-10 rounded-full border-2 border-white/20 bg-black flex items-center justify-center">
                      <span className="text-sm text-white font-medium">{scene.day}</span>
                    </div>
                    <div className="backdrop-blur-3xl bg-black/50 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
                      <button onClick={() => setExpandedScene(expandedScene === index ? null : index)} className="w-full p-6 text-left">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs text-blue-400 uppercase tracking-[0.2em] mb-2">DAY {scene.day}</p>
                            <h3 className="text-2xl font-medium">{scene.title}</h3>
                            <p className="text-gray-400 mt-2 text-sm">{scene.description}</p>
                          </div>
                          <svg className={`w-5 h-5 text-white/30 mt-2 transition-transform ${expandedScene === index ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </button>
                      {expandedScene === index && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="overflow-hidden">
                          <div className="px-6 pb-6 space-y-4 border-t border-white/5 pt-4">
                            <div>
                              <p className="text-xs text-white/40 uppercase tracking-[0.2em] mb-2">Activities</p>
                              {scene.activities.map((a: string) => (
                                <div key={a} className="flex items-center gap-2 text-sm text-gray-400 mb-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" />{a}</div>
                              ))}
                            </div>
                            <p className="text-sm text-blue-300 italic">{scene.visualDirection}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500"><MapPin className="w-4 h-4 text-white/40" />{scene.accommodation}</div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-4 mt-12 justify-center">
                <button className="px-6 py-3 bg-white text-black rounded-full text-sm font-medium">Export Storyboard</button>
                <button onClick={() => { setStoryboard(null); setPrompt(""); }} className="px-6 py-3 border border-white/10 rounded-full text-sm text-white/50 hover:text-white">Start New</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
