"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";

export function NewsletterInline() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    setSubscribed(true);
    setLoading(false);
  };

  if (subscribed) {
    return (
      <div className="flex items-center gap-2 text-emerald-400 text-sm">
        <Check className="w-4 h-4" /> Subscribed!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 h-10 rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none" />
      <button type="submit" disabled={loading} className="px-4 h-10 rounded-xl bg-white text-black text-sm font-medium hover:bg-gray-200 disabled:opacity-50 flex items-center gap-1">
        {loading ? "..." : "Subscribe"} <ArrowRight className="w-3 h-3" />
      </button>
    </form>
  );
}