"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Bell, Globe, Shield, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const router = useRouter();

  return (
    <div className="px-6 py-8 max-w-2xl">
      <h1 className="text-3xl font-light mb-8">Settings</h1>

      <div className="space-y-4">
        <div className="rounded-xl border border-white/5 bg-[#111] p-6">
          <h3 className="font-medium mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-amber-500" /> Notifications</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Push Notifications</p>
              <p className="text-xs text-gray-500">Flight updates, check-in reminders</p>
            </div>
            <button onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full transition-colors ${notifications ? "bg-amber-500" : "bg-white/10"}`}>
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifications ? "translate-x-6" : "translate-x-0.5"}`} />
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#111] p-6">
          <h3 className="font-medium mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-amber-500" /> Language & Currency</h3>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Language</span>
            <span>English</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-400">Currency</span>
            <span>USD ($)</span>
          </div>
        </div>

        <button
          onClick={async () => { await supabase.auth.signOut(); router.push("/"); }}
          className="w-full h-12 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/5 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );
}
