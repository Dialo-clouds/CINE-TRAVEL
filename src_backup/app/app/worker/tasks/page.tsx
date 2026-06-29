"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { cn } from "@/lib/utils";
import {
  ClipboardCheck,
  Search,
  Filter,
  Plus,
  Check,
  X,
  Clock,
  AlertTriangle,
  Star,
  Calendar,
  User,
  Tag,
  MoreHorizontal,
  ArrowUpDown,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Paperclip,
  RotateCcw,
} from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  type: "Curation" | "Quality" | "Media" | "Support" | "Content";
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Pending" | "In Progress" | "Review" | "Completed" | "Rejected";
  deadline: string;
  assignee: string;
  createdAt: string;
  tags: string[];
  comments: number;
  attachments: number;
}

const tasksData: Task[] = [
  {
    id: 1,
    title: "Review Destination: Faroe Islands",
    description: "Verify all submitted information, check image quality, and approve CineScore rating for the new Faroe Islands destination entry.",
    type: "Curation",
    priority: "High",
    status: "In Progress",
    deadline: "2026-10-25",
    assignee: "You",
    createdAt: "2026-10-22",
    tags: ["destination", "review", "new"],
    comments: 3,
    attachments: 5,
  },
  {
    id: 2,
    title: "Verify CineScore: Patagonia Updated",
    description: "Cross-reference the updated CineScore factors against community votes and expert reviews for Patagonia.",
    type: "Quality",
    priority: "Medium",
    status: "Pending",
    deadline: "2026-10-26",
    assignee: "You",
    createdAt: "2026-10-23",
    tags: ["cinescore", "verification"],
    comments: 1,
    attachments: 2,
  },
  {
    id: 3,
    title: "Process Photo Essay: Kyoto Autumn",
    description: "Review and optimize 15 new photos submitted for the Kyoto destination page. Apply cinematic grading.",
    type: "Media",
    priority: "Low",
    status: "Pending",
    deadline: "2026-10-28",
    assignee: "Team",
    createdAt: "2026-10-23",
    tags: ["photos", "kyoto", "optimization"],
    comments: 0,
    attachments: 15,
  },
  {
    id: 4,
    title: "Respond to Report #4829 - Inappropriate Content",
    description: "User reported inappropriate comment on Sahara storyboard. Review and take action per moderation guidelines.",
    type: "Support",
    priority: "Critical",
    status: "In Progress",
    deadline: "2026-10-24",
    assignee: "You",
    createdAt: "2026-10-24",
    tags: ["report", "moderation", "urgent"],
    comments: 8,
    attachments: 3,
  },
  {
    id: 5,
    title: "Update Destination: Iceland Seasonal Info",
    description: "Update Iceland destination with current aurora forecast, seasonal pricing, and new eco-lodge openings.",
    type: "Content",
    priority: "Medium",
    status: "Completed",
    deadline: "2026-10-20",
    assignee: "You",
    createdAt: "2026-10-18",
    tags: ["iceland", "update", "seasonal"],
    comments: 2,
    attachments: 1,
  },
  {
    id: 6,
    title: "Moderate Review: Sahara Desert Experience",
    description: "New user review for Sahara needs moderation check for authenticity and guideline compliance.",
    type: "Curation",
    priority: "Low",
    status: "Pending",
    deadline: "2026-10-30",
    assignee: "Team",
    createdAt: "2026-10-24",
    tags: ["review", "moderation", "sahara"],
    comments: 0,
    attachments: 0,
  },
  {
    id: 7,
    title: "Optimize Globe Data: New Light Pillars",
    description: "Add 12 new destination coordinates to the 3D globe visualization with correct light pillar heights.",
    type: "Content",
    priority: "High",
    status: "Review",
    deadline: "2026-10-25",
    assignee: "You",
    createdAt: "2026-10-21",
    tags: ["globe", "3d", "coordinates"],
    comments: 5,
    attachments: 1,
  },
  {
    id: 8,
    title: "Fix Broken Image Links: Namibia Gallery",
    description: "Several images in the Namibia photo essay returning 404. Re-upload from backup and verify CDN distribution.",
    type: "Media",
    priority: "Critical",
    status: "Pending",
    deadline: "2026-10-24",
    assignee: "You",
    createdAt: "2026-10-24",
    tags: ["bug", "images", "cdn"],
    comments: 4,
    attachments: 8,
  },
];

const statusColors: Record<string, string> = {
  "Pending": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Review": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Completed": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Rejected": "bg-red-500/10 text-red-400 border-red-500/20",
};

const priorityColors: Record<string, string> = {
  "Critical": "bg-red-500/10 text-red-400",
  "High": "bg-orange-500/10 text-orange-400",
  "Medium": "bg-yellow-500/10 text-yellow-400",
  "Low": "bg-blue-500/10 text-blue-400",
};

const typeIcons: Record<string, any> = {
  "Curation": ClipboardCheck,
  "Quality": Star,
  "Media": Eye,
  "Support": MessageSquare,
  "Content": FileText,
};

export default function WorkerTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sortBy, setSortBy] = useState<string>("deadline");

  const handleStatusChange = (taskId: number, newStatus: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus as Task["status"] } : t));
  };

  const filteredTasks = tasks
    .filter(t => {
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
      if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "deadline") return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      if (sortBy === "priority") {
        const order = { "Critical": 0, "High": 1, "Medium": 2, "Low": 3 };
        return (order[a.priority] || 4) - (order[b.priority] || 4);
      }
      return 0;
    });

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === "Pending").length,
    inProgress: tasks.filter(t => t.status === "In Progress").length,
    completed: tasks.filter(t => t.status === "Completed").length,
    critical: tasks.filter(t => t.priority === "Critical").length,
  };

  return (
    <DashboardShell type="worker">
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light">Task Manager</h1>
            <p className="text-gray-400 mt-1">{stats.total} tasks · {stats.pending} pending · {stats.critical} critical</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
            <Plus className="w-4 h-4" /> New Task
          </button>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: "Total", value: stats.total, color: "text-white" },
            { label: "Pending", value: stats.pending, color: "text-yellow-400" },
            { label: "In Progress", value: stats.inProgress, color: "text-blue-400" },
            { label: "Completed", value: stats.completed, color: "text-emerald-400" },
            { label: "Critical", value: stats.critical, color: "text-red-400" },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-xl border border-white/5 bg-black/50 text-center">
              <p className={`text-2xl font-light ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/20"
          >
            <option value="all" className="bg-black">All Statuses</option>
            <option value="Pending" className="bg-black">Pending</option>
            <option value="In Progress" className="bg-black">In Progress</option>
            <option value="Review" className="bg-black">Review</option>
            <option value="Completed" className="bg-black">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/20"
          >
            <option value="all" className="bg-black">All Priorities</option>
            <option value="Critical" className="bg-black">Critical</option>
            <option value="High" className="bg-black">High</option>
            <option value="Medium" className="bg-black">Medium</option>
            <option value="Low" className="bg-black">Low</option>
          </select>

          <button
            onClick={() => setSortBy(sortBy === "deadline" ? "priority" : "deadline")}
            className="flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            Sort: {sortBy === "deadline" ? "Deadline" : "Priority"}
          </button>
        </div>

        {/* Task List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task Cards - Left 2/3 */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={cn(
                    "p-5 rounded-xl border bg-black/50 backdrop-blur-xl cursor-pointer transition-all duration-300",
                    selectedTask?.id === task.id ? "border-white/20" : "border-white/5 hover:border-white/10"
                  )}
                  onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-2 h-2 rounded-full", 
                        task.priority === "Critical" ? "bg-red-400 animate-pulse" :
                        task.priority === "High" ? "bg-orange-400" :
                        task.priority === "Medium" ? "bg-yellow-400" : "bg-blue-400"
                      )} />
                      <div>
                        <h3 className="text-sm font-medium">{task.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">#{task.id} · Created {task.createdAt}</p>
                      </div>
                    </div>
                    <span className={cn("text-xs px-2.5 py-1 rounded-full border", statusColors[task.status])}>
                      {task.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Due: {task.deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {task.assignee}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> {task.comments}
                    </span>
                    {task.attachments > 0 && (
                      <span className="flex items-center gap-1">
                        <Paperclip className="w-3 h-3" /> {task.attachments}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full", priorityColors[task.priority])}>
                      {task.priority}
                    </span>
                    {task.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {selectedTask?.id === task.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
                          <p className="text-sm text-gray-400">{task.description}</p>
                          
                          <div className="flex gap-2">
                            {task.status !== "Completed" && (
                              <>
                                {task.status === "Pending" && (
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleStatusChange(task.id, "In Progress"); }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-xs hover:bg-blue-500/20 transition-colors"
                                  >
                                    <RotateCcw className="w-3 h-3" /> Start Task
                                  </button>
                                )}
                                {task.status === "In Progress" && (
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleStatusChange(task.id, "Review"); }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-lg text-xs hover:bg-purple-500/20 transition-colors"
                                  >
                                    <Eye className="w-3 h-3" /> Submit for Review
                                  </button>
                                )}
                                {task.status === "Review" && (
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleStatusChange(task.id, "Completed"); }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs hover:bg-emerald-500/20 transition-colors"
                                  >
                                    <Check className="w-3 h-3" /> Approve
                                  </button>
                                )}
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleStatusChange(task.id, "Rejected"); }}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs hover:bg-red-500/20 transition-colors"
                                >
                                  <X className="w-3 h-3" /> Reject
                                </button>
                              </>
                            )}
                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-gray-400 rounded-lg text-xs hover:bg-white/10 transition-colors">
                              <Edit className="w-3 h-3" /> Edit
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Task Detail Panel - Right 1/3 */}
          <div className="space-y-4">
            <div className="p-6 rounded-xl border border-white/5 bg-black/50">
              <h3 className="text-lg font-light mb-4">Quick Stats</h3>
              <div className="space-y-3">
                {[
                  { label: "Completion Rate", value: "87%", color: "bg-emerald-400" },
                  { label: "Avg Response Time", value: "2.4h", color: "bg-blue-400" },
                  { label: "Tasks This Week", value: "23", color: "bg-purple-400" },
                  { label: "Overdue", value: "2", color: "bg-red-400" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{stat.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{stat.value}</span>
                      <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="p-6 rounded-xl border border-white/5 bg-black/50">
              <h3 className="text-lg font-light mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: "Task #4 escalated to Critical", time: "5 min ago", color: "bg-red-400" },
                  { action: "Task #5 marked as Completed", time: "1 hour ago", color: "bg-emerald-400" },
                  { action: "New task assigned: #8", time: "2 hours ago", color: "bg-blue-400" },
                  { action: "Task #1 deadline approaching", time: "3 hours ago", color: "bg-yellow-400" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${activity.color} mt-1.5 shrink-0`} />
                    <div>
                      <p className="text-sm text-gray-300">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
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
