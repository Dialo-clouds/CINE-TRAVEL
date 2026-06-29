"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Globe, ClipboardCheck, Plane, DoorOpen, LogOut, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const links = [
    { label: "Overview", href: "/employee", icon: Users },
    { label: "Check-In", href: "/employee/checkin", icon: ClipboardCheck },
    { label: "Flights", href: "/employee/flights", icon: Plane },
    { label: "Boarding", href: "/employee/boarding", icon: DoorOpen },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="w-64 border-r border-white/5 p-6 flex flex-col bg-black/50">
        <Link href="/" className="flex items-center gap-3 mb-10">
          <Globe className="w-6 h-6 text-blue-400" />
          <span className="text-lg font-medium">CineTravel <span className="text-xs text-blue-400">STAFF</span></span>
        </Link>
        <nav className="flex-1 space-y-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${pathname === link.href ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
              <link.icon className="w-4 h-4" /> {link.label}
            </Link>
          ))}
        </nav>
        <button onClick={() => supabase.auth.signOut().then(() => window.location.href = "/")} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mt-auto">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
