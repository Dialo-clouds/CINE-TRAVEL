"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Plane, Gift, Check } from "lucide-react";

export function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Show after 10 seconds
    const dismissed = localStorage.getItem("newsletter-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setShow(true), 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem("newsletter-dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSubscribed(true);
      setTimeout(() => { setShow(false); localStorage.setItem("newsletter-dismissed", "true"); }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl">
            <button onClick={handleDismiss} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>

            {subscribed ? (
              <div className="text-center py-4">
                <Check className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-light">Welcome Aboard!</h3>
                <p className="text-gray-400 text-sm mt-2">Check your inbox for a confirmation.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <Plane className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-xl font-light">Join Our Newsletter</h3>
                  <p className="text-gray-400 text-sm mt-2">Get exclusive flight deals, travel tips, and destination inspiration.</p>
                </div>

                <div className="flex gap-2 mb-6 justify-center">
                  {[
                    { icon: Gift, label: "Exclusive Deals" },
                    { icon: Plane, label: "New Routes" },
                    { icon: Mail, label: "Travel Tips" },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <item.icon className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                      <p className="text-[0.5rem] text-gray-500">{item.label}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none" required />
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                  <button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? "Subscribing..." : "Subscribe Now"} <Mail className="w-4 h-4" />
                  </button>
                </form>

                <p className="text-[0.5rem] text-gray-600 text-center mt-4">No spam. Unsubscribe anytime. We respect your privacy.</p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}