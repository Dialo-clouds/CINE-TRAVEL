"use client";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { motion } from "framer-motion";
import { FileText, Edit, Eye, Star } from "lucide-react";

const contentItems = [
  { id: 1, title: "Patagonia Destination Page", type: "Destination", views: 12430, rating: 4.9, lastEdited: "3 days ago", status: "Live" },
  { id: 2, title: "Kyoto Photo Essay", type: "Media", views: 8921, rating: 4.8, lastEdited: "1 week ago", status: "Live" },
  { id: 3, title: "Sahara Experience Guide", type: "Content", views: 5670, rating: 4.7, lastEdited: "2 days ago", status: "Draft" },
  { id: 4, title: "Iceland Seasonal Update", type: "Content", views: 3450, rating: 4.6, lastEdited: "5 hours ago", status: "Review" },
];

export default function WorkerContentPage() {
  return (
    <DashboardShell type="worker">
      <div className="p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light">Content Manager</h1>
          <p className="text-gray-400 mt-1">Manage and edit platform content.</p>
        </motion.div>

        <div className="rounded-xl border border-white/5 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="text-left p-4 text-xs text-gray-400 uppercase tracking-wider">Title</th>
                <th className="text-left p-4 text-xs text-gray-400 uppercase tracking-wider">Type</th>
                <th className="text-left p-4 text-xs text-gray-400 uppercase tracking-wider">Views</th>
                <th className="text-left p-4 text-xs text-gray-400 uppercase tracking-wider">Rating</th>
                <th className="text-left p-4 text-xs text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-right p-4 text-xs text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contentItems.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="p-4 text-sm">{item.title}</td>
                  <td className="p-4"><span className="text-xs px-2 py-1 rounded-full bg-white/5">{item.type}</span></td>
                  <td className="p-4 text-sm text-gray-400">{item.views.toLocaleString()}</td>
                  <td className="p-4 text-sm">{item.rating}</td>
                  <td className="p-4"><span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">{item.status}</span></td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 hover:bg-white/10 rounded"><Edit className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-white/10 rounded"><Eye className="w-4 h-4" /></button>
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
