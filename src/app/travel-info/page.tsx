"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, FileText, Syringe, CreditCard, AlertCircle, Check, Search } from "lucide-react";

const countries = [
  { name: "Argentina", code: "AR", visa: "Visa-free for 90 days", passport: "6 months validity", vaccine: "None required", currency: "ARS - Argentine Peso", tips: "Best time: Oct-Mar for Patagonia" },
  { name: "Chile", code: "CL", visa: "Visa-free for 90 days", passport: "6 months validity", vaccine: "None required", currency: "CLP - Chilean Peso", tips: "Entry fee for Punta Arenas" },
  { name: "United Arab Emirates", code: "AE", visa: "Visa on arrival for 30 days", passport: "6 months validity", vaccine: "None required", currency: "AED - UAE Dirham", tips: "Modest dress recommended" },
  { name: "United Kingdom", code: "GB", visa: "Visa-free for 6 months", passport: "Valid for duration", vaccine: "None required", currency: "GBP - Pound Sterling", tips: "ETA required from 2025" },
  { name: "Japan", code: "JP", visa: "Visa-free for 90 days", passport: "Valid for duration", vaccine: "None required", currency: "JPY - Japanese Yen", tips: "Visit Japan Web registration" },
  { name: "United States", code: "US", visa: "ESTA required", passport: "6 months validity", vaccine: "None required", currency: "USD - US Dollar", tips: "ESTA valid for 2 years" },
  { name: "Australia", code: "AU", visa: "eVisitor required", passport: "6 months validity", vaccine: "None required", currency: "AUD - Australian Dollar", tips: "Strict biosecurity laws" },
];

export default function TravelInfoPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = search ? countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase())) : countries;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-4">Before You Fly</p>
            <h1 className="text-5xl font-light">Travel Requirements</h1>
            <p className="text-gray-500 mt-4">Visa, passport, and health information by destination.</p>
          </div>

          <div className="relative mb-8 max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search country..." className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none" />
          </div>

          <div className="space-y-3">
            {filtered.map((country) => (
              <motion.div key={country.code} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelected(selected === country.code ? null : country.code)}
                className={`rounded-xl border cursor-pointer transition-all ${selected === country.code ? "border-white/20 bg-white/[0.02]" : "border-white/5 bg-white/[0.01] hover:border-white/10"}`}>
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Globe className="w-5 h-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium">{country.name}</h3>
                      <p className="text-xs text-gray-500">{country.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-emerald-400"><Check className="w-3 h-3" />{country.visa.split(" ")[0]}</span>
                  </div>
                </div>
                {selected === country.code && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-5 border-t border-white/5 pt-4 grid grid-cols-2 gap-4">
                    <div><p className="text-xs text-gray-500">Visa</p><p className="text-sm">{country.visa}</p></div>
                    <div><p className="text-xs text-gray-500">Passport</p><p className="text-sm">{country.passport}</p></div>
                    <div><p className="text-xs text-gray-500">Vaccines</p><p className="text-sm">{country.vaccine}</p></div>
                    <div><p className="text-xs text-gray-500">Currency</p><p className="text-sm">{country.currency}</p></div>
                    <div className="col-span-2"><p className="text-xs text-gray-500">Travel Tips</p><p className="text-sm">{country.tips}</p></div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
