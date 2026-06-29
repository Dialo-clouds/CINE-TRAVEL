"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Globe, BookOpen, Sparkles, Star, Map, ArrowRight, LogOut } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-white" />
          <span className="text-lg font-medium">CineTravel</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">{user?.email}</span>
          <button onClick={handleSignOut} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <h1 className="text-4xl font-light">Welcome back, Explorer.</h1>
          <p className="text-gray-400 mt-2">Your cinematic expeditions await.</p>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { label: "AI Planner", icon: Sparkles, href: "/auteur" },
            { label: "Explore", icon: Globe, href: "/explore" },
            { label: "Journal", icon: BookOpen, href: "/journal" },
            { label: "Globe", icon: Map, href: "/globe" },
          ].map((action) => (
            <Link key={action.label} href={action.href}
              className="flex flex-col items-center gap-3 p-6 rounded-xl border border-white/5 bg-black/50 hover:border-white/10 hover:bg-white/5 transition-all text-center">
              <action.icon className="w-8 h-8 text-white/60" />
              <span className="text-sm">{action.label}</span>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { value: "3", label: "Expeditions" },
            { value: "5", label: "Countries" },
            { value: "94", label: "CineScore" },
            { value: "2", label: "Storyboards" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-xl border border-white/5 bg-black/50 text-center">
              <p className="text-3xl font-light">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent */}
        <div className="p-8 rounded-xl border border-white/5 bg-black/50">
          <h2 className="text-xl font-light mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { title: "AI Storyboard Generated", desc: "Patagonia Expedition — 5 scenes", time: "2 hours ago" },
              { title: "Field Note Added", desc: "The Long Dawn — Fitz Roy at sunrise", time: "5 hours ago" },
              { title: "Destination Saved", desc: "Iceland added to favorites", time: "1 day ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <span className="text-xs text-gray-600">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">Return Home</Link>
        </div>
      </div>
    </main>
  );
}
