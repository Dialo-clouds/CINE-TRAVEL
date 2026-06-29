"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building, BarChart3, Shield, Headphones, Plane, Users, Globe, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const benefits = [
  { icon: BarChart3, title: "Travel Analytics", desc: "Detailed reporting and spending insights" },
  { icon: Shield, title: "Dedicated Support", desc: "24/7 corporate travel desk" },
  { icon: Globe, title: "Global Network", desc: "Access to 150+ destinations worldwide" },
  { icon: Users, title: "Flexible Policies", desc: "Customizable travel policies per department" },
  { icon: Plane, title: "Priority Services", desc: "Priority check-in, boarding, and upgrades" },
  { icon: BarChart3, title: "Volume Discounts", desc: "Save up to 25% on corporate bookings" },
];

const plans = [
  { name: "Starter", price: "Free", minBookings: "Up to 50/year", features: ["Basic reporting", "Email support", "Standard rates"] },
  { name: "Business", price: "$999/year", minBookings: "Up to 500/year", features: ["Advanced analytics", "Priority support", "5% volume discount", "Dedicated account manager"] },
  { name: "Enterprise", price: "Custom", minBookings: "Unlimited", features: ["Custom analytics dashboard", "24/7 dedicated team", "Up to 25% discount", "API integration", "Custom travel policies"] },
];

export default function CorporatePage() {
  const [formData, setFormData] = useState({ company: "", name: "", email: "", phone: "", travelers: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center p-8">
          <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4"><Building className="w-10 h-10 text-blue-400" /></div>
          <h2 className="text-2xl font-light">Thank You!</h2>
          <p className="text-gray-500 mt-2">Our corporate team will reach out within 48 hours.</p>
          <Link href="/" className="inline-block mt-6 px-6 py-3 bg-white text-black rounded-full text-sm font-medium">Return Home</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-light mb-4">CineTravel Corporate</h1>
            <p className="text-gray-400 max-w-xl mx-auto">Streamline your company's travel with dedicated support, volume discounts, and powerful analytics.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-xl border border-white/5 bg-white/[0.01] text-center">
                <b.icon className="w-8 h-8 text-white/30 mx-auto mb-3" />
                <h3 className="font-medium text-sm">{b.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {plans.map((plan, i) => (
              <div key={plan.name} className={`p-8 rounded-2xl border ${i === 1 ? "border-white/20 bg-white/[0.03]" : "border-white/5 bg-white/[0.01]"}`}>
                <h3 className="text-xl font-light">{plan.name}</h3>
                <p className="text-3xl font-light mt-2">{plan.price}</p>
                <p className="text-xs text-gray-500 mt-1">{plan.minBookings}</p>
                <ul className="mt-6 space-y-2">
                  {plan.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-gray-400"><Check className="w-4 h-4 text-emerald-400" />{f}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-light text-center mb-8">Get Started</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Company Name" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" required />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" required />
                <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" />
                <input type="number" placeholder="Annual Travelers" value={formData.travelers} onChange={(e) => setFormData({...formData, travelers: e.target.value})} className="h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" />
              </div>
              <button type="submit" className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center justify-center gap-2">Submit <ArrowRight className="w-4 h-4" /></button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
