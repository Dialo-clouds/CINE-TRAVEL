"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useBookingStore, Passenger } from "@/lib/store/booking-store";
import { ArrowRight, Plus, Trash2, User, Passport, Mail, Phone, AlertCircle } from "lucide-react";

const nationalities = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany",
  "France", "Japan", "Brazil", "Argentina", "Chile", "Mexico", "Spain",
  "Italy", "Netherlands", "Sweden", "Norway", "Denmark", "India", "Other"
];

export default function PassengersPage() {
  const router = useRouter();
  const { passengers, addPassenger, updatePassenger, removePassenger, setStep, searchParams } = useBookingStore();
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});

  const validate = () => {
    const errs: Record<string, Record<string, string>> = {};
    let valid = true;

    passengers.forEach((p) => {
      errs[p.id] = {};
      if (!p.firstName) { errs[p.id].firstName = "Required"; valid = false; }
      if (!p.lastName) { errs[p.id].lastName = "Required"; valid = false; }
      if (!p.dateOfBirth) { errs[p.id].dateOfBirth = "Required"; valid = false; }
      if (!p.passportNumber) { errs[p.id].passportNumber = "Required"; valid = false; }
      if (!p.passportExpiry) { errs[p.id].passportExpiry = "Required"; valid = false; }
      if (!p.email) { errs[p.id].email = "Required"; valid = false; }
      if (!p.phone) { errs[p.id].phone = "Required"; valid = false; }
    });

    setErrors(errs);
    return valid;
  };

  const handleContinue = () => {
    if (validate()) {
      setStep(3);
      router.push("/book/payment");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light">Passenger Details</h1>
            <p className="text-gray-400 text-sm mt-1">
              {searchParams.passengers} passenger{searchParams.passengers > 1 ? "s" : ""} · Please provide passport information
            </p>
          </div>
          {passengers.length < searchParams.passengers && (
            <button onClick={addPassenger} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-sm hover:border-white/20 transition-colors">
              <Plus className="w-4 h-4" /> Add Passenger
            </button>
          )}
        </div>

        <div className="space-y-8">
          {passengers.map((passenger, index) => (
            <motion.div
              key={passenger.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-6 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  Passenger {index + 1}
                </h3>
                {passengers.length > 1 && (
                  <button onClick={() => removePassenger(passenger.id)} className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                )}
              </div>

              {/* Personal Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField label="First Name" value={passenger.firstName} onChange={(v) => updatePassenger(passenger.id, { firstName: v })} error={errors[passenger.id]?.firstName} />
                <InputField label="Last Name" value={passenger.lastName} onChange={(v) => updatePassenger(passenger.id, { lastName: v })} error={errors[passenger.id]?.lastName} />
                <InputField label="Date of Birth" type="date" value={passenger.dateOfBirth} onChange={(v) => updatePassenger(passenger.id, { dateOfBirth: v })} error={errors[passenger.id]?.dateOfBirth} />
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nationality</label>
                  <select
                    value={passenger.nationality}
                    onChange={(e) => updatePassenger(passenger.id, { nationality: e.target.value })}
                    className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none focus:border-white/20"
                  >
                    <option value="" className="bg-black">Select nationality</option>
                    {nationalities.map((n) => (
                      <option key={n} value={n} className="bg-black">{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Passport Info */}
              <div className="border-t border-white/5 pt-6">
                <h4 className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                  <Passport className="w-4 h-4" /> Passport / Travel Document
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label="Passport Number" value={passenger.passportNumber} onChange={(v) => updatePassenger(passenger.id, { passportNumber: v })} error={errors[passenger.id]?.passportNumber} placeholder="AB123456" />
                  <InputField label="Expiry Date" type="date" value={passenger.passportExpiry} onChange={(v) => updatePassenger(passenger.id, { passportExpiry: v })} error={errors[passenger.id]?.passportExpiry} />
                </div>
              </div>

              {/* Contact */}
              <div className="border-t border-white/5 pt-6">
                <h4 className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Contact Information
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label="Email" type="email" value={passenger.email} onChange={(v) => updatePassenger(passenger.id, { email: v })} error={errors[passenger.id]?.email} />
                  <InputField label="Phone" type="tel" value={passenger.phone} onChange={(v) => updatePassenger(passenger.id, { phone: v })} error={errors[passenger.id]?.phone} />
                  <InputField label="Emergency Contact Name" value={passenger.emergencyContact} onChange={(v) => updatePassenger(passenger.id, { emergencyContact: v })} />
                  <InputField label="Emergency Contact Phone" type="tel" value={passenger.emergencyPhone} onChange={(v) => updatePassenger(passenger.id, { emergencyPhone: v })} />
                </div>
              </div>

              {/* Preferences */}
              <div className="border-t border-white/5 pt-6">
                <h4 className="text-sm text-gray-400 mb-4">Preferences</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Seat Preference</label>
                    <select
                      value={passenger.seatPreference}
                      onChange={(e) => updatePassenger(passenger.id, { seatPreference: e.target.value as any })}
                      className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none"
                    >
                      <option value="any" className="bg-black">No preference</option>
                      <option value="window" className="bg-black">Window</option>
                      <option value="aisle" className="bg-black">Aisle</option>
                      <option value="middle" className="bg-black">Middle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Meal Preference</label>
                    <select
                      value={passenger.mealPreference}
                      onChange={(e) => updatePassenger(passenger.id, { mealPreference: e.target.value as any })}
                      className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none"
                    >
                      <option value="regular" className="bg-black">Regular</option>
                      <option value="vegetarian" className="bg-black">Vegetarian</option>
                      <option value="vegan" className="bg-black">Vegan</option>
                      <option value="halal" className="bg-black">Halal</option>
                      <option value="kosher" className="bg-black">Kosher</option>
                      <option value="none" className="bg-black">No meal</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm text-gray-400 mb-2">Special Requests</label>
                  <textarea
                    value={passenger.specialRequests}
                    onChange={(e) => updatePassenger(passenger.id, { specialRequests: e.target.value })}
                    placeholder="Any special requirements..."
                    className="w-full h-20 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button onClick={() => router.push("/book/flights")} className="text-sm text-gray-500 hover:text-white transition-colors">
            Back to Flights
          </button>
          <button onClick={handleContinue} className="px-8 py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
            Continue to Payment
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function InputField({ label, value, onChange, error, type = "text", placeholder }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20"
      />
      {error && (
        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}
