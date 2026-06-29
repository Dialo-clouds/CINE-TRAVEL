"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { ArrowRight, Sparkles, Send, ChevronDown, MapPin, Camera, Star } from "lucide-react";

const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const EXAMPLE_PROMPTS = [
  "A solo journey through Patagonia in October. Ancient ice, brutalist refuges, the silence of the steppe under the Southern Cross.",
  "Mist-shrouded forests with ancient stone temples where monks walk at dawn. The sound of bells across the valley.",
  "Abandoned industrial structures being reclaimed by desert sand. Silence. Rust. Vast emptiness. Photography at golden hour.",
];

const MOCK_STORYBOARD = {
  title: "PATAGONIA EXPEDITION",
  subtitle: "A 5-Day Cinematic Journey",
  scenes: [
    {
      day: 1,
      title: "THE LONG DAWN",
      description: "First light catches the eastern face of Fitz Roy. Mist rises from glacial lakes like breath from a sleeping giant.",
      activities: ["Dawn approach to Laguna de los Tres", "Breakfast at Refugio Poincenot", "Afternoon reconnaissance"],
      visualDirection: "The pale blue light of a Tarkovsky dawn. Long static wide shots. Silence broken only by distant icefall.",
      accommodation: "Glass-and-concrete refuge over a glacial stream",
    },
    {
      day: 2,
      title: "CATHEDRAL OF ICE",
      description: "The Perito Moreno glacier reveals itself through mist. A 60-meter wall of compressed millennia speaks in cracks and groans.",
      activities: ["Ice trekking on the glacier plateau", "Whiskey with glacial ice at sunset", "Photography from the southern catwalk"],
      visualDirection: "Herzog's encounters. Blue that has never been photographed. Scale that cannot be conveyed.",
      accommodation: "Eco-lodge with floor-to-ceiling windows facing the ice field",
    },
    {
      day: 3,
      title: "THE SOUTHERN CROSS",
      description: "Camp at the edge of the steppe. No artificial light for 200km. The Milky Way casts shadows on the ground.",
      activities: ["Wild camping on the Patagonian steppe", "Night sky photography and constellation mapping", "Mate ritual at the campfire"],
      visualDirection: "Kubrick's star gate, but still. Time-lapse of the rotating sky. The tent as a tiny beacon of warmth.",
      accommodation: "Expedition tent, rated to -10 degrees C",
    },
  ],
};

export function AuteurSection() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyboard, setStoryboard] = useState<any>(null);
  const [expandedScene, setExpandedScene] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setStoryboard(MOCK_STORYBOARD);
    setIsGenerating(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Robot Background - More visible now */}
      <div className="absolute inset-0 z-0 opacity-70">
        <InteractiveRobotSpline scene={ROBOT_SCENE_URL} className="absolute inset-0" />
      </div>

      {/* Dark overlay - lighter for better robot visibility */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
            <Sparkles className="w-4 h-4 text-white/70" />
            <span className="text-xs text-white/60 uppercase tracking-[0.2em]">AI Studio</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light mb-4">The Auteur</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Describe the journey you seek. The AI will compose a cinematic storyboard of your expedition.
          </p>
        </motion.div>

        {/* Prompt Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="backdrop-blur-3xl bg-black/50 border border-white/10 rounded-2xl p-6">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your expedition..."
              className="w-full bg-transparent text-white placeholder:text-white/20 resize-none focus:outline-none text-lg leading-relaxed min-h-[100px]"
              rows={3}
            />
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROMPTS.map((suggestion) => (
                  <button
                    key={suggestion.slice(0, 30)}
                    onClick={() => setPrompt(suggestion)}
                    className="text-xs text-white/30 hover:text-white/50 transition-colors px-3 py-1.5 rounded-full border border-white/5 hover:border-white/20"
                  >
                    {suggestion.slice(0, 40)}...
                  </button>
                ))}
              </div>
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0 ml-4"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Composing...
                  </>
                ) : (
                  <>
                    Generate Storyboard
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-full border-2 border-blue-500/30 flex items-center justify-center mb-6"
                style={{ boxShadow: "0 0 40px rgba(59,130,246,0.15)" }}
              >
                <Sparkles className="w-8 h-8 text-blue-400" />
              </motion.div>
              <p className="text-white/60 text-sm">Composing your storyboard...</p>
              <div className="mt-4 w-64 h-0.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500"
                  animate={{ width: ["0%", "40%", "70%", "90%", "100%"] }}
                  transition={{ duration: 2.5, times: [0, 0.3, 0.6, 0.8, 1] }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!storyboard && !isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center mb-4"
            >
              <Sparkles className="w-6 h-6 text-white/20" />
            </motion.div>
            <p className="text-white/20 text-sm">Describe your vision above to begin</p>
          </motion.div>
        )}

        {/* Storyboard Result */}
        <AnimatePresence>
          {storyboard && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-10 text-center">
                <p className="text-blue-400 text-xs uppercase tracking-[0.3em] mb-2">Storyboard Generated</p>
                <h2 className="text-4xl md:text-5xl font-light mb-2">{storyboard.title}</h2>
                <p className="text-white/40 text-sm uppercase tracking-wider">{storyboard.subtitle}</p>
              </div>

              {/* Timeline */}
              <div className="relative pl-12">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-blue-500/10 to-transparent" />

                {storyboard.scenes.map((scene: any, index: number) => (
                  <motion.div
                    key={scene.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative mb-8"
                  >
                    <div className="absolute -left-12 top-0 w-10 h-10 rounded-full border-2 border-white/20 bg-black flex items-center justify-center">
                      <span className="text-sm text-white font-medium">{scene.day}</span>
                    </div>

                    <div className="backdrop-blur-3xl bg-black/50 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500">
                      <button
                        onClick={() => setExpandedScene(expandedScene === index ? null : index)}
                        className="w-full p-6 text-left"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs text-blue-400 uppercase tracking-[0.2em] mb-2">DAY {scene.day}</p>
                            <h3 className="text-2xl font-medium">{scene.title}</h3>
                            <p className="text-gray-400 mt-2 text-sm leading-relaxed">{scene.description}</p>
                          </div>
                          <motion.svg
                            animate={{ rotate: expandedScene === index ? 180 : 0 }}
                            className="w-5 h-5 text-white/30 mt-2 shrink-0"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                          </motion.svg>
                        </div>
                      </button>

                      <AnimatePresence>
                        {expandedScene === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 space-y-4 border-t border-white/5 pt-4">
                              <div>
                                <p className="text-xs text-white/40 uppercase tracking-[0.2em] mb-2">Activities</p>
                                {scene.activities.map((activity: string) => (
                                  <div key={activity} className="flex items-center gap-2 text-sm text-gray-400 mb-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    {activity}
                                  </div>
                                ))}
                              </div>
                              <div>
                                <p className="text-xs text-white/40 uppercase tracking-[0.2em] mb-2">Visual Direction</p>
                                <p className="text-sm text-blue-300 italic">{scene.visualDirection}</p>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <MapPin className="w-4 h-4 text-white/40" />
                                {scene.accommodation}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4 mt-12 justify-center">
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-all">
                  <Camera className="w-4 h-4" />
                  Export Storyboard
                </button>
                <button
                  onClick={() => {
                    setStoryboard(null);
                    setPrompt("");
                  }}
                  className="px-6 py-3 border border-white/10 rounded-full text-sm text-white/50 hover:text-white hover:border-white/20 transition-all"
                >
                  Start New
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
