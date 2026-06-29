"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Globe, LayoutDashboard, Ticket, User, Settings, LogOut, Plane, Search, Bell, Package, Menu, X, ChevronDown } from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/customer", icon: LayoutDashboard },
  { label: "My Bookings", href: "/customer/bookings", icon: Ticket },
  { label: "Flight Tracker", href: "/customer/track", icon: Search },
  { label: "Baggage", href: "/customer/baggage", icon: Package },
  { label: "Check-in", href: "/customer/checkin", icon: Plane },
  { label: "Notifications", href: "/customer/notifications", icon: Bell },
  { label: "Profile", href: "/customer/profile", icon: User },
  { label: "Settings", href: "/customer/settings", icon: Settings },
];

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-56 border-r border-white/[0.04] flex-col shrink-0">
        <Link href="/" className="flex items-center gap-2 px-5 py-4 border-b border-white/[0.04]">
          <Globe className="w-5 h-5 text-white/50" />
          <span className="text-base font-light tracking-wide">CineTravel</span>
        </Link>
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? "bg-white/[0.06] text-white" : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"}`}>
                <link.icon className="w-4 h-4" />{link.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/[0.04] px-4 py-3">
          <p className="text-xs text-gray-600 truncate px-1 mb-2">{user?.email}</p>
          <button onClick={handleSignOut} className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-gray-500 hover:text-gray-300 w-full"><LogOut className="w-3.5 h-3.5" /> Sign Out</button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <Link href="/" className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-white/50" />
          <span className="text-sm font-light">CineTravel</span>
        </Link>
        <button onClick={handleSignOut} className="p-1"><LogOut className="w-4 h-4 text-gray-400" /></button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-black border-r border-white/5 p-4 pt-16 overflow-y-auto">
            <nav className="space-y-0.5">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${isActive ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`}>
                    <link.icon className="w-4 h-4" />{link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-14 md:pt-0">{children}</main>
    </div>
  );
}