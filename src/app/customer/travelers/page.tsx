"use client";

import { Users, Plus, User } from "lucide-react";

const travelers = [
  { name: "You (Primary)", email: "c75474667@gmail.com", passport: "AB123456" },
];

export default function TravelersPage() {
  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-light mb-2">Saved Travelers</h1>
      <p className="text-gray-400 mb-8">Quick-book for family and frequent companions.</p>

      <div className="space-y-3">
        {travelers.map((t, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/5 bg-[#111] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="w-10 h-10 text-gray-400 bg-white/5 rounded-full p-2" />
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-xs text-gray-500">{t.email} · Passport: {t.passport}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full h-12 rounded-xl border border-dashed border-white/10 text-gray-400 hover:text-white text-sm flex items-center justify-center gap-2">
        <Plus className="w-4 h-4" /> Add Traveler
      </button>
    </div>
  );
}
