"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Armchair, Coffee } from "lucide-react";

const ROWS = 30;
const COLS = 6; // A-F
const COL_LETTERS = ["A", "B", "C", "D", "E", "F"];

const generateSeats = () => {
  const seats: any[] = [];
  for (let row = 1; row <= ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const isBusiness = row <= 4;
      const isExit = row === 12 || row === 13;
      const isOccupied = Math.random() < 0.3;
      seats.push({
        id: `${row}${COL_LETTERS[col]}`,
        row,
        col: COL_LETTERS[col],
        isBusiness,
        isExit,
        isOccupied,
        price: isBusiness ? 150 : 25,
        hasExtraLegroom: isExit || row === 1,
      });
    }
  }
  return seats;
};

export default function SeatSelectionPage() {
  const router = useRouter();
  const [seats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [passengerCount] = useState(2);

  const toggleSeat = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat?.isOccupied) return;

    setSelectedSeats(prev => {
      if (prev.includes(seatId)) return prev.filter(s => s !== seatId);
      if (prev.length >= passengerCount) return [...prev.slice(1), seatId];
      return [...prev, seatId];
    });
  };

  const totalPrice = selectedSeats.reduce((sum, seatId) => {
    const seat = seats.find(s => s.id === seatId);
    return sum + (seat?.price || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light mb-2">Select Your Seats</h1>
          <p className="text-gray-500 mb-2">Choose {passengerCount} seat{passengerCount > 1 ? "s" : ""} for your flight.</p>

          {/* Legend */}
          <div className="flex gap-6 mb-8 text-xs">
            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded border border-white/10 bg-white/5" /> Available</div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-blue-500" /> Selected</div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-white/5 cursor-not-allowed" /> Occupied</div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded border border-amber-500/30 bg-amber-500/5" /> Extra Legroom</div>
          </div>

          {/* Cabin */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-8 mb-8">
            {/* Plane outline */}
            <div className="relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 uppercase tracking-[0.2em]">Front</div>
              
              {/* Business Class */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Coffee className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-amber-400 uppercase tracking-[0.2em]">Business Class</span>
                </div>
                <div className="space-y-1.5">
                  {Array.from({ length: 4 }, (_, row) => (
                    <div key={row} className="flex justify-center gap-4">
                      <div className="flex gap-1">{COL_LETTERS.slice(0, 2).map(col => {
                        const seat = seats.find(s => s.row === row + 1 && s.col === col)!;
                        return <SeatButton key={seat.id} seat={seat} isSelected={selectedSeats.includes(seat.id)} onClick={() => toggleSeat(seat.id)} />;
                      })}</div>
                      <div className="w-6" />
                      <div className="flex gap-1">{COL_LETTERS.slice(2, 4).map(col => {
                        const seat = seats.find(s => s.row === row + 1 && s.col === col)!;
                        return <SeatButton key={seat.id} seat={seat} isSelected={selectedSeats.includes(seat.id)} onClick={() => toggleSeat(seat.id)} />;
                      })}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Economy */}
              <div>
                <div className="flex items-center gap-2 mb-3 mt-8">
                  <Armchair className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-400 uppercase tracking-[0.2em]">Economy</span>
                </div>
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {Array.from({ length: 26 }, (_, row) => (
                    <div key={row + 5} className={`flex justify-center gap-4 ${row === 7 || row === 8 ? "mt-4 pt-4 border-t border-white/5" : ""}`}>
                      <div className="flex gap-1">{COL_LETTERS.slice(0, 3).map(col => {
                        const seat = seats.find(s => s.row === row + 5 && s.col === col)!;
                        return <SeatButton key={seat.id} seat={seat} isSelected={selectedSeats.includes(seat.id)} onClick={() => toggleSeat(seat.id)} />;
                      })}</div>
                      <div className="w-6" />
                      <div className="flex gap-1">{COL_LETTERS.slice(3, 6).map(col => {
                        const seat = seats.find(s => s.row === row + 5 && s.col === col)!;
                        return <SeatButton key={seat.id} seat={seat} isSelected={selectedSeats.includes(seat.id)} onClick={() => toggleSeat(seat.id)} />;
                      })}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Summary + Continue */}
          {selectedSeats.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between">
              <div>
                <p className="text-sm">Selected: {selectedSeats.join(", ")}</p>
                <p className="text-xs text-gray-500">Total: ${totalPrice}</p>
              </div>
              <button onClick={() => router.push('/book/insurance')} className="px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 flex items-center gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function SeatButton({ seat, isSelected, onClick }: { seat: any; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={seat.isOccupied}
      className={`w-9 h-9 rounded text-[0.5rem] font-medium transition-all ${
        seat.isOccupied ? "bg-white/5 text-gray-600 cursor-not-allowed" :
        isSelected ? "bg-blue-500 text-white" :
        seat.hasExtraLegroom ? "bg-amber-500/5 border border-amber-500/30 text-amber-400 hover:bg-amber-500/10" :
        seat.isBusiness ? "bg-white/5 border border-white/10 text-white hover:bg-white/10" :
        "bg-white/5 border border-white/5 text-gray-400 hover:border-white/20 hover:text-white"
      }`}
    >
      {seat.id}
    </button>
  );
}

