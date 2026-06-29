"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useBookingStore } from "@/lib/store/booking-store";
import { ArrowRight, Plus, Trash2, User, Mail, AlertCircle, FileText } from "lucide-react";

const nationalities = ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan", "Brazil", "Argentina", "Chile", "India", "Other"];

export default function PassengersPage() {
  const router = useRouter();
  const { passengers, addPassenger, updatePassenger, removePassenger, setStep, searchParams } = useBookingStore();
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});

  const handleContinue = () => {
    setStep(3);
    router.push("/book/seats");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-light">Passenger Details</h1>
              <p className="text-gray-500 text-sm mt-1">{searchParams.passengers} passenger(s)</p>
            </div>
            {passengers.length < searchParams.passengers && (
              <button onClick={addPassenger} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-sm hover:border-white/20"><Plus className="w-4 h-4" /> Add Passenger</button>
            )}
          </div>
          <div className="space-y-8">
            {passengers.map((passenger, index) => (
              <motion.div key={passenger.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium flex items-center gap-2"><User className="w-4 h-4 text-gray-400" /> Passenger {index + 1}</h3>
                  {passengers.length > 1 && <button onClick={() => removePassenger(passenger.id)} className="text-red-400 text-sm"><Trash2 className="w-3 h-3 inline" /> Remove</button>}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label="First Name" value={passenger.firstName} onChange={(v) => updatePassenger(passenger.id, { firstName: v })} />
                  <InputField label="Last Name" value={passenger.lastName} onChange={(v) => updatePassenger(passenger.id, { lastName: v })} />
                  <InputField label="Date of Birth" type="date" value={passenger.dateOfBirth} onChange={(v) => updatePassenger(passenger.id, { dateOfBirth: v })} />
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Nationality</label>
                    <select value={passenger.nationality} onChange={(e) => updatePassenger(passenger.id, { nationality: e.target.value })} className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none">
                      <option value="" className="bg-black">Select nationality</option>
                      {nationalities.map((n) => <option key={n} value={n} className="bg-black">{n}</option>)}
                    </select>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-6">
                  <h4 className="text-sm text-gray-400 mb-4 flex items-center gap-2"><FileText className="w-4 h-4" /> Passport</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="Passport Number" value={passenger.passportNumber} onChange={(v) => updatePassenger(passenger.id, { passportNumber: v })} placeholder="AB123456" />
                    <InputField label="Expiry Date" type="date" value={passenger.passportExpiry} onChange={(v) => updatePassenger(passenger.id, { passportExpiry: v })} />
                  </div>
                </div>
                <div className="border-t border-white/5 pt-6">
                  <h4 className="text-sm text-gray-400 mb-4 flex items-center gap-2"><Mail className="w-4 h-4" /> Contact</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="Email" type="email" value={passenger.email} onChange={(v) => updatePassenger(passenger.id, { email: v })} />
                    <InputField label="Phone" type="tel" value={passenger.phone} onChange={(v) => updatePassenger(passenger.id, { phone: v })} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            <Link href="/book/flights" className="text-sm text-gray-500 hover:text-white">Back to Flights</Link>
            <button onClick={handleContinue} className="px-8 py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center gap-2">Continue to Seats <ArrowRight className="w-4 h-4" /></button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-2">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20" />
    </div>
  );
}
