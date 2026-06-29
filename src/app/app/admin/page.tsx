"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatsCard } from "@/components/dashboard/stats-card";
import { cn } from "@/lib/utils";
import {
  Users,
  Globe,
  Sparkles,
  BookOpen,
  TrendingUp,
  Activity,
  Shield,
  HardDrive,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  AlertTriangle,
} from "lucide-react";

const adminStats = [
  { title: "Total Users", value: "2,847", change: 12.5, icon: <Users className="w-5 h-5 text-blue-400" /> },
  { title: "Active Destinations", value: "156", change: 8.3, icon: <Globe className="w-5 h-5 text-emerald-400" /> },
  { title: "AI Generations", value: "12,430", change: 24.7, icon: <Sparkles className="w-5 h-5 text-purple-400" /> },
  { title: "Field Reports", value: "3,201", change: -2.1, icon: <BookOpen className="w-5 h-5 text-orange-400" /> },
];

const recentUsers = [
  { name: "Elena Vasquez", email: "elena@explorer.com", role: "Explorer", status: "Active", joined: "2 hours ago" },
  { name: "Marcus Chen", email: "marcus@nomad.com", role: "Curator", status: "Active", joined: "5 hours ago" },
  { name: "Yuki Tanaka", email: "yuki@wanderer.jp", role: "Explorer", status: "Pending", joined: "1 day ago" },
  { name: "Sofia Rossi", email: "sofia@viaggio.it", role: "Admin", status: "Active", joined: "2 days ago" },
  { name: "Kai Mueller", email: "kai@reise.de", role: "Explorer", status: "Suspended", joined: "3 days ago" },
];

const pendingContent = [
  { title: "New Destination: Faroe Islands", submittedBy: "Marcus Chen", type: "Destination", date: "1 hour ago" },
  { title: "CineScore Update: Sahara", submittedBy: "Elena Vasquez", type: "Rating", date: "3 hours ago" },
  { title: "Photo Essay: Iceland Aurora", submittedBy: "Yuki Tanaka", type: "Media", date: "5 hours ago" },
];

const systemHealth = [
  { metric: "API Latency", value: "45ms", status: "good" },
  { metric: "Database", value: "98.2%", status: "good" },
  { metric: "Storage", value: "67%", status: "warning" },
  { metric: "Edge Functions", value: "100%", status: "good" },
];

export default function AdminDashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <DashboardShell type="admin">
      <div className="p-6 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light">Admin Command Center</h1>
            <p className="text-gray-400 mt-1">Platform overview and management.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition-colors">
              <Download className="w-4 h-4" /> Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              <Plus className="w-4 h-4" /> Add Content
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {adminStats.map((stat, i) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Users */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-light">Recent Users</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-48 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20"
                  />
                </div>
                <button className="p-2 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-white/5 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="text-left p-4 text-xs text-gray-400 font-medium uppercase tracking-wider">User</th>
                    <th className="text-left p-4 text-xs text-gray-400 font-medium uppercase tracking-wider">Role</th>
                    <th className="text-left p-4 text-xs text-gray-400 font-medium uppercase tracking-wider">Status</th>
                    <th className="text-left p-4 text-xs text-gray-400 font-medium uppercase tracking-wider">Joined</th>
                    <th className="text-right p-4 text-xs text-gray-400 font-medium uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium">
                            {user.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300">{user.role}</span>
                      </td>
                      <td className="p-4">
                        <span className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          user.status === "Active" && "bg-emerald-500/10 text-emerald-400",
                          user.status === "Pending" && "bg-yellow-500/10 text-yellow-400",
                          user.status === "Suspended" && "bg-red-500/10 text-red-400"
                        )}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-400">{user.joined}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 hover:bg-white/10 rounded transition-colors"><Edit className="w-4 h-4 text-gray-400" /></button>
                          <button className="p-1.5 hover:bg-white/10 rounded transition-colors"><Trash2 className="w-4 h-4 text-gray-400" /></button>
                          <button className="p-1.5 hover:bg-white/10 rounded transition-colors"><MoreHorizontal className="w-4 h-4 text-gray-400" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Pending Content */}
            <div>
              <h2 className="text-xl font-light mb-4">Pending Review</h2>
              <div className="space-y-2">
                {pendingContent.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl border border-white/5 bg-black/50 hover:border-white/10 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400">Pending</span>
                    </div>
                    <p className="text-xs text-gray-500">by {item.submittedBy} · {item.date}</p>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs hover:bg-emerald-500/20 transition-colors">
                        <Check className="w-3 h-3" /> Approve
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs hover:bg-red-500/20 transition-colors">
                        <X className="w-3 h-3" /> Reject
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div>
              <h2 className="text-xl font-light mb-4">System Health</h2>
              <div className="rounded-xl border border-white/5 bg-black/50 p-4 space-y-3">
                {systemHealth.map((item) => (
                  <div key={item.metric} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{item.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.value}</span>
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        item.status === "good" && "bg-emerald-400",
                        item.status === "warning" && "bg-yellow-400",
                        item.status === "critical" && "bg-red-400"
                      )} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
