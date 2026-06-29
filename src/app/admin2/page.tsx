"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Users, Plane, DollarSign, Ticket } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, flights: 0, bookings: 0, revenue: 0 });
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { count: users } = await supabase.from("profiles").select("*", { count: "exact", head: true });
      const { count: flights } = await supabase.from("flights").select("*", { count: "exact", head: true });
      const { count: bookings } = await supabase.from("bookings").select("*", { count: "exact", head: true });
      const { data: payments } = await supabase.from("payments").select("amount").eq("status", "succeeded");
      const revenue = payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;
      setStats({ users: users || 0, flights: flights || 0, bookings: bookings || 0, revenue });
    }
    load();
  }, []);

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-light mb-2">Admin Command Center</h1>
        <p className="text-gray-400 mb-8">Platform overview and management</p>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Users", value: stats.users, icon: Users, color: "text-blue-400" },
            { label: "Active Flights", value: stats.flights, icon: Plane, color: "text-purple-400" },
            { label: "Total Bookings", value: stats.bookings, icon: Ticket, color: "text-emerald-400" },
            { label: "Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "text-yellow-400" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-xl border border-white/5 bg-black/50">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
              <p className="text-3xl font-light">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
