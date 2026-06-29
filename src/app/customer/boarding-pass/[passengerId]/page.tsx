"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase/client";
import { Plane, Calendar, Clock, MapPin, User, QrCode, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BoardingPassPage({ params }: { params: Promise<{ passengerId: string }> }) {
  const { passengerId } = use(params);
  const [passenger, setPassenger] = useState<any>(null);
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const { data: p } = await supabase.from("passengers").select("*").eq("id", passengerId).single();
      if (p) {
        setPassenger(p);
        const { data: b } = await supabase.from("bookings").select("*").eq("id", p.booking_id).single();
        if (b) setBooking(b);
      }
    }
    load();
  }, [passengerId]);

  if (!passenger) {
    return <div className="flex justify-center py-20"><div className="w-10 h-10 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" /></div>;
  }

  const ticketNumber = "TKT" + passengerId.substring(0, 8).toUpperCase();

  return (
    <div className="px-6 py-8 max-w-md mx-auto">
      <Link href="/customer/checkin" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div className="rounded-2xl overflow-hidden border-2 border-amber-500/30 bg-[#111]">
        <div className="bg-amber-500 text-black p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">Boarding Pass</p>
            <p className="text-lg font-bold mt-1">CINETRAVEL AIRLINES</p>
          </div>
          <Plane className="w-8 h-8" />
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">Passenger</p>
              <p className="font-bold text-lg">{passenger.first_name} {passenger.last_name}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase">Seat</p>
              <p className="font-bold text-lg text-amber-500">{passenger.seat_number || "22A"}</p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Flight</span>
              <span className="font-medium">{booking?.flight_number || "AR1824"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Boarding</span>
              <span className="font-medium text-amber-500">08:00 AM</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Gate</span>
              <span className="font-medium">B12</span>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 text-center">
            <div className="w-32 h-32 bg-white rounded-xl mx-auto flex items-center justify-center">
              <QrCode className="w-20 h-20 text-black" />
            </div>
            <p className="text-xs text-gray-500 mt-2 font-mono">{ticketNumber}</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-6 space-y-2">
        <button className="w-full h-12 rounded-xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition-colors">
          Add to Apple Wallet
        </button>
        <button className="w-full h-12 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors">
          Download PDF
        </button>
      </div>
    </div>
  );
}