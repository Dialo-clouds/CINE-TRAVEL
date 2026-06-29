"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, RefreshCw } from "lucide-react";

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "ARS", name: "Argentine Peso", symbol: "$" },
  { code: "CLP", name: "Chilean Peso", symbol: "$" },
  { code: "AUD", name: "Australian Dollar", symbol: "$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "$" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
];

// Mock exchange rates (relative to USD)
const rates: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, AED: 3.67, ARS: 850, CLP: 950, AUD: 1.53, CAD: 1.36, BRL: 4.95,
};

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("ARS");
  const [result, setResult] = useState(0);

  useEffect(() => {
    const usdAmount = amount / rates[from];
    setResult(usdAmount * rates[to]);
  }, [amount, from, to]);

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light text-center mb-8">Currency Converter</h1>

          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-2">Amount</label>
              <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white text-lg focus:outline-none" />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-2">From</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none">
                {currencies.map(c => <option key={c.code} value={c.code} className="bg-black">{c.code} - {c.name}</option>)}
              </select>
            </div>

            <div className="flex justify-center">
              <button onClick={swap} className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                <ArrowRightLeft className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-2">To</label>
              <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none">
                {currencies.map(c => <option key={c.code} value={c.code} className="bg-black">{c.code} - {c.name}</option>)}
              </select>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <p className="text-xs text-gray-500 mb-1">{amount} {from} =</p>
              <p className="text-3xl font-light">{result.toFixed(2)} {to}</p>
              <p className="text-[0.5rem] text-gray-600 mt-2 flex items-center justify-center gap-1"><RefreshCw className="w-3 h-3" /> Rates updated daily</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
