"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Globe,
  Sparkles,
  BookOpen,
  Users,
  Settings,
  BarChart3,
  FileText,
  Image,
  MessageSquare,
  Shield,
  HardDrive,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  LogOut,
  User,
  Briefcase,
  ClipboardCheck,
  TrendingUp,
  Activity,
} from "lucide-react";

interface DashboardShellProps {
  children: React.ReactNode;
  type?: "user" | "admin" | "worker";
}

const userNav = [
  { label: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { label: "Explore", href: "/explore", icon: Globe },
  { label: "AI Planner", href: "/auteur", icon: Sparkles },
  { label: "Journal", href: "/journal", icon: BookOpen },
  { label: "Director's Circle", href: "/directors-circle", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

const adminNav = [
  { label: "Overview", href: "/app/admin", icon: BarChart3 },
  { label: "Users", href: "/app/admin/users", icon: Users },
  { label: "Content", href: "/app/admin/content", icon: FileText },
  { label: "Analytics", href: "/app/admin/analytics", icon: TrendingUp },
  { label: "Media", href: "/app/admin/media", icon: Image },
  { label: "Reports", href: "/app/admin/reports", icon: Shield },
  { label: "Settings", href: "/settings", icon: Settings },
];

const workerNav = [
  { label: "Tasks", href: "/app/worker/tasks", icon: ClipboardCheck },
  { label: "Curation", href: "/app/worker/curation", icon: Image },
  { label: "Content", href: "/app/worker/content", icon: FileText },
  { label: "Messages", href: "/app/worker/messages", icon: MessageSquare },
  { label: "Activity", href: "/app/worker/activity", icon: Activity },
];

export function DashboardShell({ children, type = "user" }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = type === "admin" ? adminNav : type === "worker" ? workerNav : userNav;

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "hidden md:flex flex-col border-r border-white/5 bg-black/50 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[260px]"
      )}>
        {/* Logo */}
        <div className="flex items-center gap-3 h-16 px-4 border-b border-white/5">
          <Globe className="w-7 h-7 text-white shrink-0" />
          {!collapsed && (
            <span className="text-lg font-bold">CineTravel</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center h-10 border-t border-white/5 text-gray-400 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between h-16 px-6 border-b border-white/5 bg-black/50 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-400" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">Explorer</p>
                <p className="text-xs text-gray-400 capitalize">{type}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed left-0 top-0 bottom-0 w-[260px] bg-black border-r border-white/5 z-50 md:hidden"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <Globe className="w-7 h-7 text-white" />
                  <span className="text-lg font-bold">CineTravel</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="px-3 py-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                        isActive ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
