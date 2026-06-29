"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { cn } from "@/lib/utils";
import {
  Image,
  Check,
  X,
  Star,
  Eye,
  MessageSquare,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Filter,
  Search,
} from "lucide-react";

interface CurationItem {
  id: number;
  title: string;
  type: "Destination" | "Photo Essay" | "Review" | "Rating" | "Comment";
  submittedBy: string;
  submittedAt: string;
  status: "Pending" | "Approved" | "Rejected";
  preview: string;
  details: string;
  score?: number;
}

const curationQueue: CurationItem[] = [
  {
    id: 1,
    title: "Faroe Islands — New Destination",
    type: "Destination",
    submittedBy: "Marcus Chen",
    submittedAt: "2 hours ago",
    status: "Pending",
    preview: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80",
    details: "Complete destination entry with 15 photos, seasonal data, 8 experiences, and 4 accommodation options. CineScore proposed: 88.",
    score: 88,
  },
  {
    id: 2,
    title: "Iceland Aurora — Photo Essay",
    type: "Photo Essay",
    submittedBy: "Elena Vasquez",
    submittedAt: "5 hours ago",
    status: "Pending",
    preview: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=400&q=80",
    details: "12 new aurora photographs taken in September 2026. Graded with cinematic color profile. All images meet resolution requirements.",
  },
  {
    id: 3,
    title: "Sahara Desert — User Review",
    type: "Review",
    submittedBy: "Anonymous Explorer",
    submittedAt: "8 hours ago",
    status: "Pending",
    preview: "",
    details: "5-star review mentioning a local guide. Needs verification for authenticity and potential promotional content check.",
  },
  {
    id: 4,
    title: "Patagonia CineScore Update",
    type: "Rating",
    submittedBy: "Yuki Tanaka",
    submittedAt: "1 day ago",
    status: "Pending",
    preview: "https://images.unsplash.com/photo-1531844251246-9a1bfaae09fc?w=400&q=80",
    details: "Proposal to update photogenic density from 92 to 95 based on new community votes. 47 new votes received in Q3 2026.",
    score: 95,
  },
  {
    id: 5,
    title: "Kyoto Storyboard Comment",
    type: "Comment",
    submittedBy: "Sofia Rossi",
    submittedAt: "1 day ago",
    status: "Pending",
    preview: "",
    details: "Comment flagged by 3 users for containing external promotional link. Review for community guideline violation.",
  },
  {
    id: 6,
    title: "Norwegian Fjords — Photo Update",
    type: "Photo Essay",
    submittedBy: "Kai Mueller",
    submittedAt: "2 days ago",
    status: "Approved",
    preview: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80",
    details: "8 new winter photos added to the fjord collection. Professionally graded and optimized.",
  },
];

const typeColors: Record<string, string> = {
  "Destination": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Photo Essay": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Review": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Rating": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Comment": "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

export default function WorkerCurationPage() {
  const [items, setItems] = useState<CurationItem[]>(curationQueue);
  const [filter, setFilter] = useState<string>("Pending");
  const [selectedItem, setSelectedItem] = useState<CurationItem | null>(null);

  const handleAction = (id: number, action: "Approved" | "Rejected") => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: action } : item));
    if (selectedItem?.id === id) setSelectedItem(null);
  };

  const filteredItems = items.filter(item => filter === "all" ? true : item.status === filter);

  const pendingCount = items.filter(i => i.status === "Pending").length;

  return (
    <DashboardShell type="worker">
      <div className="p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light">Content Curation</h1>
            <p className="text-gray-400 mt-1">{pendingCount} items pending review</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" placeholder="Search..." className="w-48 pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none" />
            </div>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex gap-2">
          {["Pending", "Approved", "Rejected", "all"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-colors",
                filter === f ? "bg-white text-black" : "border border-white/10 text-gray-400 hover:text-white"
              )}
            >
              {f === "all" ? "All" : f}
              {f === "Pending" && ` (${pendingCount})`}
            </button>
          ))}
        </div>

        {/* Curation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={cn(
                  "rounded-xl border bg-black/50 backdrop-blur-xl overflow-hidden cursor-pointer transition-all",
                  selectedItem?.id === item.id ? "border-white/20" : "border-white/5 hover:border-white/10"
                )}
                onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
              >
                {item.preview && (
                  <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${item.preview})` }} />
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn("text-xs px-2 py-1 rounded-full border", typeColors[item.type])}>
                      {item.type}
                    </span>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      item.status === "Approved" && "bg-emerald-500/10 text-emerald-400",
                      item.status === "Rejected" && "bg-red-500/10 text-red-400",
                      item.status === "Pending" && "bg-yellow-500/10 text-yellow-400"
                    )}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">by {item.submittedBy} · {item.submittedAt}</p>
                  {item.score && (
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-400">{item.score}</span>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                {item.status === "Pending" && (
                  <div className="flex border-t border-white/5">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleAction(item.id, "Approved"); }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-emerald-400 hover:bg-emerald-500/10 transition-colors text-sm"
                    >
                      <Check className="w-4 h-4" /> Approve
                    </button>
                    <div className="w-px bg-white/5" />
                    <button
                      onClick={(e) => { e.stopPropagation(); handleAction(item.id, "Rejected"); }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-red-400 hover:bg-red-500/10 transition-colors text-sm"
                    >
                      <X className="w-4 h-4" /> Reject
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </DashboardShell>
  );
}
