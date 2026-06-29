"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Package, Plus, Minus, ArrowRight, Scale, Luggage } from "lucide-react";
import Link from "next/link";

export default function BaggageCalculatorPage() {
  const router = useRouter();
  const [bags, setBags] = useState([{ id: 1, weight: 23, type: "checked" }]);
  const [cabinClass, setCabinClass] = useState("economy");

  const baggageAllowance: Record<string, { checked: number; cabin: number; maxWeight: number }> = {
    economy: { checked: 1, cabin: 1, maxWeight: 23 },
    premium: { checked: 2, cabin: 1, maxWeight: 23 },
    business: { checked: 2, cabin: 2, maxWeight: 32 },
    first: { checked: 3, cabin: 2, maxWeight: 32 },
  };

  const allowance = baggageAllowance[cabinClass];
  const extraBags = Math.max(0, bags.filter(b => b.type === "checked").length - allowance.checked);
  const overweightBags = bags.filter(b => b.weight > allowance.maxWeight).length;
  const totalFee = (extraBags * 50) + (overweightBags * 75);

  const addBag = () => setBags([...bags, { id: Date.now(), weight: 23, type: "checked" }]);
  const removeBag = (id: number) => setBags(bags.filter(b => b.id !== id));
  const updateBag = (id: number, field: string, value: any) => setBags(bags.map(b => b.id === id ? { ...b, [field]: value } : b));

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light mb-2">Baggage Calculator</h1>
          <p className="text-gray-500 mb-8">Calculate baggage allowance and fees.</p>

          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Cabin Class</label>
            <select value={cabinClass} onChange={(e) => setCabinClass(e.target.value)} className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none">
              {Object.keys(baggageAllowance).map(c => <option key={c} value={c} className="bg-black capitalize">{c.replace("_", " ")}</option>)}
            </select>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-2"><Luggage className="w-4 h-4" /> Your Bags</h3>
              <button onClick={addBag} className="flex items-center gap-1 text-sm text-white/60 hover:text-white"><Plus className="w-4 h-4" /> Add Bag</button>
            </div>
            <div className="space-y-3">
              {bags.map((bag, i) => (
                <div key={bag.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02]">
                  <Package className="w-5 h-5 text-gray-400" />
                  <span className="text-sm w-16">Bag {i + 1}</span>
                  <select value={bag.type} onChange={(e) => updateBag(bag.id, "type", e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white focus:outline-none">
                    <option value="checked" className="bg-black">Checked</option>
                    <option value="cabin" className="bg-black">Cabin</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateBag(bag.id, "weight", Math.max(1, bag.weight - 1))} className="p-1 hover:bg-white/5 rounded"><Minus className="w-3 h-3" /></button>
                    <span className="text-sm w-12 text-center">{bag.weight}kg</span>
                    <button onClick={() => updateBag(bag.id, "weight", bag.weight + 1)} className="p-1 hover:bg-white/5 rounded"><Plus className="w-3 h-3" /></button>
                  </div>
                  <button onClick={() => removeBag(bag.id)} className="ml-auto text-red-400 hover:text-red-300 text-xs">Remove</button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 mb-8">
            <h3 className="font-medium mb-4 flex items-center gap-2"><Scale className="w-4 h-4" /> Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400"><span>Allowance ({cabinClass})</span><span>{allowance.checked} checked + {allowance.cabin} cabin</span></div>
              {extraBags > 0 && <div className="flex justify-between text-amber-400"><span>Extra bags ({extraBags}x)</span><span>${extraBags * 50}</span></div>}
              {overweightBags > 0 && <div className="flex justify-between text-red-400"><span>Overweight ({overweightBags}x)</span><span>${overweightBags * 75}</span></div>}
              <div className="flex justify-between font-medium pt-2 border-t border-white/5"><span>Total Fee</span><span className={totalFee > 0 ? "text-amber-400" : "text-emerald-400"}>{totalFee > 0 ? `$${totalFee}` : "Free"}</span></div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/book" className="flex-1 h-12 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white flex items-center justify-center">Back</Link>
            <button onClick={() => router.push("/book/passengers")} className="flex-1 h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center justify-center gap-2">Continue <ArrowRight className="w-4 h-4" /></button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
