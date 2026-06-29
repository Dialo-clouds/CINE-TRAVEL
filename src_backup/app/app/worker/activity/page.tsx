"use client";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { motion } from "framer-motion";
import { Activity, Check, Clock, Star, MessageSquare, FileText, Image, User } from "lucide-react";

const activities = [
  { id: 1, action: "Approved Faroe Islands destination", type: "curation", time: "10 minutes ago", user: "You" },
  { id: 2, action: "Completed task #5: Iceland update", type: "task", time: "1 hour ago", user: "You" },
  { id: 3, action: "Elena Vasquez submitted photo essay", type: "submission", time: "2 hours ago", user: "Elena Vasquez" },
  { id: 4, action: "Marcus Chen requested review for Patagonia", type: "request", time: "3 hours ago", user: "Marcus Chen" },
  { id: 5, action: "Admin updated platform guidelines", type: "system", time: "5 hours ago", user: "Admin" },
  { id: 6, action: "Rejected review #2849 - guideline violation", type: "moderation", time: "6 hours ago", user: "You" },
];

const typeIcons: Record<string, any> = {
  curation: Check,
  task: FileText,
  submission: Image,
  request: MessageSquare,
  system: Activity,
  moderation: Star,
};

const typeColors: Record<string, string> = {
  curation: "text-emerald-400 bg-emerald-500/10",
  task: "text-blue-400 bg-blue-500/10",
  submission: "text-purple-400 bg-purple-500/10",
  request: "text-yellow-400 bg-yellow-500/10",
  system: "text-gray-400 bg-gray-500/10",
  moderation: "text-orange-400 bg-orange-500/10",
};

export default function WorkerActivityPage() {
  return (
    <DashboardShell type="worker">
      <div className="p-6 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-light">Activity Log</h1>
          <p className="text-gray-400 mt-1">Track all worker actions and platform events.</p>
        </motion.div>

        <div className="relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-white/5" />
          {activities.map((activity, i) => {
            const Icon = typeIcons[activity.type] || Activity;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative pb-6 last:pb-0"
              >
                <div className={`absolute -left-8 p-1.5 rounded-full ${typeColors[activity.type]}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-black/50">
                  <p className="text-sm">{activity.action}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {activity.time}</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {activity.user}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}
