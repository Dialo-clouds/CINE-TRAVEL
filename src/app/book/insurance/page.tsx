"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Shield, Check, ArrowRight, Umbrella, Heart, Luggage, Plane } from "lucide-react";

const plans = [
  {
    id: "basic",
    name: "Basic Protection",
    price: 29,
    icon: Umbrella,
    coverage: [
      "Trip cancellation up to $1,000",
      "Travel delay: $200/day",
      "Lost baggage: $500",
    ],
    color: "border-blue-500/20 bg-blue-500/5",
    iconColor: "text-blue-400",
  },
  {
    id: "standard",
    name: "Standard Cover",
    price: 59,
    icon: Shield,
    coverage: [
      "Trip cancellation up to $3,000",
      "Travel delay: $500/day",
      "Lost baggage: $1,500",
      "Medical expenses: $50,000",
      "Emergency evacuation",
    ],
    color: "border-amber-500/20 bg-amber-500/5",
    iconColor: "text-amber-400",
    recommended: true,
  },
  {
    id: "premium",
    name: "Premium Guard",
    price: 99,
    icon: Heart,
    coverage: [
      "Trip cancellation up to $10,000",
      "Travel delay: $1,000/day",
      "Lost baggage: $3,000",
      "Medical expenses: $500,000",
      "Emergency evacuation",
      "Cancel for any reason",
      "24/7 concierge service",
    ],
    color: "border-purple-500/20 bg-purple-500/5",
    iconColor: "text-purple-400",
  },
];

export default function InsurancePage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light mb-2">Travel Insurance</h1>
          <p className="text-gray-500 mb-8">Protect your journey with comprehensive coverage.</p>

          <div className="space-y-4 mb-8">
            {plans.map((plan) => (
              <motion.button
                key={plan.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full p-6 rounded-xl border text-left transition-all relative overflow-hidden ${
                  selectedPlan === plan.id ? `${plan.color} border-2` : "border-white/5 bg-white/[0.01] hover:border-white/10"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[0.5rem] uppercase tracking-wider font-medium">
                    Recommended
                  </div>
                )}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <plan.icon className={`w-8 h-8 ${plan.iconColor}`} />
                    <div>
                      <h3 className="font-medium text-lg">{plan.name}</h3>
                      <div className="mt-2 space-y-1">
                        {plan.coverage.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                            <Check className="w-3 h-3 text-emerald-400" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-2xl font-light">${plan.price}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {selectedPlan && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
              <button onClick={() => router.push('/book/payment')} className="flex-1 h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                Add & Continue <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => router.push('/book/payment')} className="px-6 h-12 rounded-xl border border-white/10 text-gray-400 hover:text-white text-sm transition-colors">
                Skip
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

