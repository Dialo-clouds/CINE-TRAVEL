"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check, Plane, Gift, Star, TrendingUp, Globe, ArrowRight } from "lucide-react";

const preferences = [
  { id: "deals", icon: Gift, label: "Flight Deals", desc: "Exclusive discounts and promo codes" },
  { id: "travel_tips", icon: Star, label: "Travel Tips", desc: "Destination guides and packing tips" },
  { id: "new_routes", icon: Plane, label: "New Routes", desc: "Be first to know about new destinations" },
  { id: "premium", icon: Globe, label: "Premium Offers", desc: "VIP experiences and upgrades" },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(["deals", "travel_tips"]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const prefs: Record<string, boolean> = {};
    preferences.forEach(p => { prefs[p.id] = selected.includes(p.id); });

    await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, preferences: prefs }),
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <Mail className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h1 className="text-5xl font-light">Newsletter</h1>
            <p className="text-gray-500 mt-4 max-w-md mx-auto">Get curated travel inspiration, exclusive flight deals, and destination guides delivered to your inbox.</p>
          </div>

          {submitted ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center p-12 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <Check className="w-20 h-20 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-2xl font-light">You're In!</h2>
              <p className="text-gray-400 mt-2">Welcome to the CineTravel community.</p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-8 space-y-4">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" required />
              </div>

              <div>
                <h3 className="text-lg font-light mb-4">I'm interested in:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {preferences.map((pref) => (
                    <button key={pref.id} onClick={() => toggle(pref.id)} className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${selected.includes(pref.id) ? "border-blue-500/50 bg-blue-500/5" : "border-white/5 hover:border-white/10"}`}>
                      <pref.icon className={`w-6 h-6 ${selected.includes(pref.id) ? "text-blue-400" : "text-gray-500"}`} />
                      <div><p className="text-sm font-medium">{pref.label}</p><p className="text-[0.5rem] text-gray-500">{pref.desc}</p></div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { value: "50K+", label: "Subscribers" },
                  { value: "Weekly", label: "Frequency" },
                  { value: "Free", label: "Forever" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl border border-white/5">
                    <p className="text-2xl font-light text-blue-400">{stat.value}</p>
                    <p className="text-[0.5rem] text-gray-500 uppercase mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <button onClick={handleSubmit} disabled={loading} className="w-full h-14 rounded-xl bg-white text-black font-medium hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center gap-2 text-lg">
                {loading ? "Subscribing..." : "Subscribe Now"} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}