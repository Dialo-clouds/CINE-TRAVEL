"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Search, Plane, Check, User, Calendar, Clock, MapPin, QrCode } from "lucide-react";
import Link from "next/link";

export default function CheckInPage() {
  const [reference, setReference] = useState("");
  const [lastName, setLastName] = useState("");
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState("");
  const [checkedIn, setCheckedIn] = useState(false);

  const handleSearch = async () => {
    setError("");
    const { data } = await supabase
      .from("bookings")
      .select("*, passengers(*)")
      .eq("booking_reference", reference.toUpperCase())
      .single();

    if (!data) {
      setError("Booking not found. Check your reference number.");
      return;
    }

    setBooking(data);
  };

  const handleCheckIn = async (passengerId: string) => {
    await supabase.from("passengers").update({ check_in_status: true }).eq("id", passengerId);
    setCheckedIn(true);
    // Refresh booking data
    const { data } = await supabase.from("bookings").select("*, passengers(*)").eq("id", booking.id).single();
    if (data) setBooking(data);
  };

  return (
    <div className="px-6 py-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-light mb-2">Online Check-in</h1>
      <p className="text-gray-400 mb-8">Check in 24 hours before your flight.</p>

      {!booking ? (
        <div className="rounded-2xl border border-white/5 bg-[#111] p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Booking Reference</label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="e.g. CT123ABC"
                className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white uppercase placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter passenger last name"
                className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button onClick={handleSearch} className="w-full h-12 rounded-xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition-colors flex items-center justify-center gap-2">
              <Search className="w-4 h-4" /> Find Booking
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-[#111] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="font-mono text-amber-500">{booking.booking_reference}</span>
                <h3 className="text-lg font-medium mt-1">Check-in</h3>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${booking.status === "confirmed" ? "bg-emerald-500/10 text-emerald-400" : "bg-gray-500/10 text-gray-400"}`}>
                {booking.status}
              </span>
            </div>

            <div className="space-y-3">
              {booking.passengers?.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <User className="w-10 h-10 text-gray-400 bg-white/5 rounded-full p-2" />
                    <div>
                      <p className="font-medium">{p.first_name} {p.last_name}</p>
                      <p className="text-xs text-gray-500">Passport: {p.passport_number}</p>
                    </div>
                  </div>
                  {p.check_in_status ? (
                    <div className="text-right">
                      <span className="text-emerald-400 text-sm flex items-center gap-1"><Check className="w-4 h-4" /> Checked In</span>
                      <Link href={`/customer/boarding-pass/${p.id}`} className="text-xs text-amber-500 hover:underline block mt-1">
                        View Boarding Pass →
                      </Link>
                    </div>
                  ) : (
                    <button onClick={() => handleCheckIn(p.id)} className="px-4 py-2 rounded-lg bg-amber-500 text-black text-sm font-medium hover:bg-amber-400">
                      Check In
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {checkedIn && (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
              <Check className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium">Checked In Successfully!</h3>
              <p className="text-gray-400 text-sm mt-1">Your boarding pass is ready.</p>
              <Link href="/customer/trips" className="inline-block mt-4 px-6 py-3 bg-amber-500 text-black rounded-full text-sm font-medium">
                View My Trips
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
