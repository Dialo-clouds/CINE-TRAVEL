"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatsCard } from "@/components/dashboard/stats-card";
import { cn } from "@/lib/utils";
import {
  ClipboardCheck,
  Image,
  FileText,
  MessageSquare,
  Check,
  X,
  Clock,
  AlertTriangle,
  Star,
  Search,
  Filter,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";

const workerStats = [
  { title: "Tasks Completed", value: 147, change: 15, icon: <ClipboardCheck className="w-5 h-5 text-emerald-400" /> },
  { title: "Pending Tasks", value: 23, change: -5, icon: <Clock className="w-5 h-5 text-yellow-400" /> },
  { title: "Content Reviewed", value: 89, change: 22, icon: <FileText className="w-5 h-5 text-blue-400" /> },
  { title: "Avg Rating", value: "4.8", change: 3, icon: <Star className="w-5 h-5 text-purple-400" /> },
];

const tasks = [
  { id: 1, title: "Review Destination: Faroe Islands", type: "Curation", priority: "High", status: "In Progress", deadline: "2 hours", assignee: "You" },
  { id: 2, title: "Verify CineScore: Patagonia", type: "Quality", priority: "Medium", status: "Pending", deadline: "5 hours", assignee: "You" },
  { id: 3, title: "Process Photo Essay: Kyoto", type: "Media", priority: "Low", status: "Pending", deadline: "1 day", assignee: "Team" },
  { id: 4, title: "Respond to Report #4829", type: "Support", priority: "High", status: "In Progress", deadline: "1 hour", assignee: "You" },
  { id: 5, title: "Update Destination: Iceland", type: "Content", priority: "Medium", status: "Completed", deadline: "Done", assignee: "You" },
  { id: 6, title: "Moderate Review: Sahara", type: "Curation", priority: "Low", status: "Pending", deadline: "3 days", assignee: "Team" },
];

export default function WorkerDashboardPage() {
  const [filter, setFilter] = useState("all");

  const filteredTasks = filter === "all" ? tasks : tasks.filter(t => t.status.toLowerCase().replace(" ", "-") === filter.toLowerCase());

  return (
    <DashboardShell type="worker">
      <div className="p-6 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light">Worker Station</h1>
            <p className="text-gray-400 mt-1">Task management and content curation.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" placeholder="Search tasks..." className="w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workerStats.map((stat, i) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2">
          {["all", "pending", "in-progress", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-full text-sm capitalize transition-colors",
                filter === f ? "bg-white text-black" : "border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              )}
            >
              {f.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div className="rounded-xl border border-white/5 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="text-left p-4 text-xs text-gray-400 font-medium uppercase tracking-wider">Task</th>
                <th className="text-left p-4 text-xs text-gray-400 font-medium uppercase tracking-wider">Type</th>
                <th className="text-left p-4 text-xs text-gray-400 font-medium uppercase tracking-wider">Priority</th>
                <th className="text-left p-4 text-xs text-gray-400 font-medium uppercase tracking-wider">Status</th>
                <th className="text-left p-4 text-xs text-gray-400 font-medium uppercase tracking-wider">Deadline</th>
                <th className="text-right p-4 text-xs text-gray-400 font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, i) => (
                <tr key={task.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-gray-500">Assigned to: {task.assignee}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300">{task.type}</span>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      task.priority === "High" && "bg-red-500/10 text-red-400",
                      task.priority === "Medium" && "bg-yellow-500/10 text-yellow-400",
                      task.priority === "Low" && "bg-blue-500/10 text-blue-400"
                    )}>{task.priority}</span>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      task.status === "Completed" && "bg-emerald-500/10 text-emerald-400",
                      task.status === "In Progress" && "bg-blue-500/10 text-blue-400",
                      task.status === "Pending" && "bg-yellow-500/10 text-yellow-400"
                    )}>{task.status}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-400">{task.deadline}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-emerald-500/10 rounded transition-colors"><Check className="w-4 h-4 text-emerald-400" /></button>
                      <button className="p-1.5 hover:bg-red-500/10 rounded transition-colors"><X className="w-4 h-4 text-red-400" /></button>
                      <button className="p-1.5 hover:bg-white/10 rounded transition-colors"><MoreHorizontal className="w-4 h-4 text-gray-400" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
