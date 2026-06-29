"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Plane, Ticket, User, ArrowRight, Plus, Search, Package, Bell, Shield, Calendar, Map, RefreshCw, FileText, Printer, Scan, Clock } from "lucide-react";

export default function CustomerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        supabase.from("bookings").select("*").eq("user_id", data.user.id).order("created_at", { ascending: false }).limit(5)
          .then(({ data: bookingData }) => { if (bookingData) setBookings(bookingData); setLoading(false); });
      } else { setLoading(false); }
    });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full py-32"><div className="w-6 h-6 border-2 border-white/10 border-t-white rounded-full animate-spin" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-10 py-12">
      <div className="mb-10">
        <p className="text-[0.65rem] text-gray-600 uppercase tracking-[0.25em] mb-3">Dashboard</p>
        <h1 className="text-4xl font-light tracking-tight">Welcome{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : " back"}</h1>
        <p className="text-sm text-gray-600 mt-2">Manage your expeditions and bookings.</p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-8">
        <Link href="/book" className="group p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.01] transition-all">
          <Plane className="w-6 h-6 text-white/20 group-hover:text-white/50 transition-colors mb-2" /><h3 className="text-xs font-medium">Book Flight</h3>
        </Link>
        <Link href="/book/multi" className="group p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.01] transition-all">
          <Map className="w-6 h-6 text-white/20 group-hover:text-white/50 transition-colors mb-2" /><h3 className="text-xs font-medium">Multi-City</h3>
        </Link>
        <Link href="/book/calendar" className="group p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.01] transition-all">
          <Calendar className="w-6 h-6 text-white/20 group-hover:text-white/50 transition-colors mb-2" /><h3 className="text-xs font-medium">Price Calendar</h3>
        </Link>
        <Link href="/book/insurance" className="group p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.01] transition-all">
          <Shield className="w-6 h-6 text-white/20 group-hover:text-white/50 transition-colors mb-2" /><h3 className="text-xs font-medium">Insurance</h3>
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-8">
        <Link href="/customer/track" className="group p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.01] transition-all">
          <Search className="w-6 h-6 text-white/20 group-hover:text-white/50 transition-colors mb-2" /><h3 className="text-xs font-medium">Flight Status</h3>
        </Link>
        <Link href="/customer/baggage" className="group p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.01] transition-all">
          <Package className="w-6 h-6 text-white/20 group-hover:text-white/50 transition-colors mb-2" /><h3 className="text-xs font-medium">Baggage</h3>
        </Link>
        <Link href="/customer/notifications" className="group p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.01] transition-all">
          <Bell className="w-6 h-6 text-white/20 group-hover:text-white/50 transition-colors mb-2" /><h3 className="text-xs font-medium">Notifications</h3>
        </Link>
        <Link href="/customer/profile" className="group p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.01] transition-all">
          <User className="w-6 h-6 text-white/20 group-hover:text-white/50 transition-colors mb-2" /><h3 className="text-xs font-medium">Profile</h3>
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-12">
        <Link href="/customer/rebook" className="group p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-all">
          <RefreshCw className="w-6 h-6 text-white/20 group-hover:text-white/50 mb-2" /><h3 className="text-xs font-medium">Rebooking</h3>
        </Link>
        <Link href="/customer/claims" className="group p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-all">
          <FileText className="w-6 h-6 text-white/20 group-hover:text-white/50 mb-2" /><h3 className="text-xs font-medium">Claims</h3>
        </Link>
        <Link href="/customer/lost-found" className="group p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-all">
          <Package className="w-6 h-6 text-white/20 group-hover:text-white/50 mb-2" /><h3 className="text-xs font-medium">Lost & Found</h3>
        </Link>
        <Link href="/customer/baggage-tag" className="group p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-all"><Printer className="w-6 h-6 text-white/20 group-hover:text-white/50 mb-2" /><h3 className="text-xs font-medium">Bag Tags</h3></Link><Link href="/customer/document-scanner" className="group p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-all"><Scan className="w-6 h-6 text-white/20 group-hover:text-white/50 mb-2" /><h3 className="text-xs font-medium">Doc Scanner</h3></Link><Link href="/travel-info/wait-times" className="group p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-all"><Clock className="w-6 h-6 text-white/20 group-hover:text-white/50 mb-2" /><h3 className="text-xs font-medium">Wait Times</h3></Link><Link href="/customer/accessibility" className="group p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-all">
          <Shield className="w-6 h-6 text-white/20 group-hover:text-white/50 mb-2" /><h3 className="text-xs font-medium">Accessibility</h3>
        </Link>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-light">Recent Bookings</h2>
        {bookings.length > 0 && <Link href="/customer/bookings" className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>}
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 rounded-xl border border-white/[0.04]">
          <Ticket className="w-10 h-10 text-white/[0.03] mx-auto mb-4" />
          <p className="text-gray-600 text-sm">No bookings yet</p>
          <Link href="/book" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-white text-black rounded-full text-xs font-medium hover:bg-gray-200 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Book Your First Flight
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {bookings.map((b) => (
            <div key={b.id} className="p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-all flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Plane className="w-8 h-8 text-white/10" />
                <div><p className="font-mono text-xs text-gray-500">{b.booking_reference}</p><p className="text-xs text-gray-600 mt-0.5">{b.seat_class} · {b.total_passengers} passenger(s)</p></div>
              </div>
              <div className="text-right">
                <span className={`text-[0.6rem] px-2 py-1 rounded-full uppercase tracking-wider ${b.status === "confirmed" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-gray-400"}`}>{b.status}</span>
                <p className="text-sm mt-1.5">${b.total_amount}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
