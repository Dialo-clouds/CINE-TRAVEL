"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Plane, Users, ClipboardCheck, Clock } from "lucide-react";

export default function EmployeeDashboard() {
  const [stats, setStats] = useState({ flights: 0, passengers: 0, checkins: 0, pending: 0 });
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: flights } = await supabase.from("flights").select("id", { count: "exact" }).eq("status", "scheduled");
      const { data: passengers } = await supabase.from("passengers").select("id", { count: "exact" });
      const { data: checkins } = await supabase.from("check_ins").select("id", { count: "exact" });
      setStats({
        flights: flights?.length || 0,
        passengers: passengers?.length || 0,
        checkins: checkins?.length || 0,
        pending: (passengers?.length || 0) - (checkins?.length || 0),
      });
    }
    load();
  }, []);

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-light mb-2">Staff Dashboard</h1>
        <p className="text-gray-400 mb-8">Airport operations overview</p>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Flights", value: stats.flights, icon: Plane, color: "text-blue-400" },
            { label: "Total Passengers", value: stats.passengers, icon: Users, color: "text-purple-400" },
            { label: "Checked In", value: stats.checkins, icon: ClipboardCheck, color: "text-emerald-400" },
            { label: "Pending Check-In", value: stats.pending, icon: Clock, color: "text-yellow-400" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-xl border border-white/5 bg-black/50">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
              <p className="text-3xl font-light">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-xl border border-white/5 bg-black/50">
            <h3 className="font-medium mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: "Process Check-In", href: "/employee/checkin" },
                { label: "View Flight Schedule", href: "/employee/flights" },
                { label: "Manage Boarding", href: "/employee/boarding" },
              ].map((action) => (
                <a key={action.label} href={action.href} className="block p-3 rounded-lg hover:bg-white/5 transition-colors text-sm">
                  {action.label} →
                </a>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-xl border border-white/5 bg-black/50">
            <h3 className="font-medium mb-4">Today's Schedule</h3>
            <p className="text-sm text-gray-500">No flights scheduled for today</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
