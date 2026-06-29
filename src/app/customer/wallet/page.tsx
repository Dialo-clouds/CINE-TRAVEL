"use client";

import { CreditCard, Plus, Gift } from "lucide-react";

export default function WalletPage() {
  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-light mb-2">Travel Wallet</h1>
      <p className="text-gray-400 mb-8">Saved payment methods and vouchers.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Saved Cards */}
        <div className="rounded-2xl border border-white/5 bg-[#111] p-6">
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-500" /> Saved Cards
          </h2>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-3">
            <p className="text-sm">•••• 4242</p>
            <p className="text-xs text-gray-500">Expires 12/28</p>
          </div>
          <button className="w-full h-10 rounded-xl border border-dashed border-white/10 text-gray-400 hover:text-white text-sm flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Add New Card
          </button>
        </div>

        {/* Vouchers */}
        <div className="rounded-2xl border border-white/5 bg-[#111] p-6">
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-500" /> Vouchers & Credits
          </h2>
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 mb-3">
            <p className="text-emerald-400 font-medium">$50 Travel Credit</p>
            <p className="text-xs text-gray-500">Expires Dec 2026</p>
          </div>
          <p className="text-xs text-gray-500 text-center">No more vouchers</p>
        </div>
      </div>
    </div>
  );
}
