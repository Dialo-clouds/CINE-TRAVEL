"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { checkInPassenger } from "@/lib/services/booking-service";
import { Search, Check, User, Plane } from "lucide-react";

export default function CheckInPage() {
  const [bookingRef, setBookingRef] = useState("");
  const [booking, setBooking] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [staffUser, setStaffUser] = useState<any>(null);

  useState(() => {
    supabase.auth.getUser().then(({ data }) => setStaffUser(data.user));
  });

  const handleSearch = async () => {
    const { data } = await supabase.from("bookings")
      .select("*, passengers(*), flight:flights(*, airline:airlines(*))")
      .eq("booking_reference", bookingRef.toUpperCase()).single();
    if (data) { setBooking(data); setMessage(""); }
    else { setMessage("Booking not found"); setBooking(null); }
  };

  const handleCheckIn = async (passengerId: string) => {
    if (!staffUser) return;
    try {
      await checkInPassenger(booking.id, passengerId, staffUser.id);
      handleSearch();
    } catch (err) { setMessage("Check-in failed"); }
  };

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-light mb-8">Passenger Check-In</h1>
        <div className="flex gap-3 mb-8">
          <input type="text" value={bookingRef} onChange={(e) => setBookingRef(e.target.value)} placeholder="Booking reference (CT...)" className="flex-1 h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white uppercase placeholder:text-gray-600 focus:outline-none" onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
          <button onClick={handleSearch} className="px-6 h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center gap-2"><Search className="w-4 h-4" /> Search</button>
        </div>
        {message && <p className="text-red-400 text-sm mb-4">{message}</p>}
        {booking && (
          <div className="rounded-xl border border-white/5 bg-white/[0.01] p-6">
            <div className="flex justify-between mb-6">
              <div><p className="font-mono text-sm">{booking.booking_reference}</p><p className="text-sm text-gray-400">{booking.flight?.airline?.name} · {booking.flight?.flight_number}</p></div>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">{booking.status}</span>
            </div>
            <div className="space-y-3">
              {booking.passengers?.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <User className="w-8 h-8 text-gray-400 bg-white/5 rounded-full p-1.5" />
                    <div><p className="font-medium">{p.first_name} {p.last_name}</p><p className="text-xs text-gray-500">Passport: {p.passport_number}</p></div>
                  </div>
                  {p.check_in_status ? (
                    <span className="flex items-center gap-1 text-emerald-400 text-sm"><Check className="w-4 h-4" /> Checked In</span>
                  ) : (
                    <button onClick={() => handleCheckIn(p.id)} className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200">Check In</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}