"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Gift, Copy, Check, Share2 } from "lucide-react";

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "CINE-JOHN-2026";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <Gift className="w-16 h-16 text-amber-400 mx-auto mb-6" />
            <h1 className="text-5xl font-light">Refer & Earn</h1>
            <p className="text-gray-500 mt-4">Share CineTravel with friends and earn 2,000 Privilege Club points each.</p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-8 text-center space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center"><Users className="w-8 h-8 text-amber-400" /></div>
              <div className="text-left">
                <p className="text-2xl font-light">2,000 pts</p>
                <p className="text-sm text-gray-500">per successful referral</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-xs text-gray-500 mb-2">Your Referral Code</p>
              <div className="flex items-center justify-center gap-3">
                <p className="font-mono text-xl">{referralCode}</p>
                <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                  {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5 text-gray-400" />}
                </button>
              </div>
            </div>

            <button className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" /> Share Your Link
            </button>
          </div>

          <div className="mt-8 p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h3 className="font-medium mb-4">How it works</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs">1</span>Share your referral code with friends</div>
              <div className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs">2</span>They sign up and book their first flight</div>
              <div className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs">3</span>You both earn 2,000 Privilege Club points</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}