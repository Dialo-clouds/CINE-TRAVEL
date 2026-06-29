"use client";

import { motion } from "framer-motion";
import { Star, ThumbsUp, Camera } from "lucide-react";

const reviews = [
  { seat: "22A", route: "DXB-LHR", rating: 5, comment: "Amazing legroom! Best seat in economy.", author: "Marcus C.", date: "2 weeks ago", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&q=60" },
  { seat: "14C", route: "EZE-FTE", rating: 4, comment: "Good window view of the Andes.", author: "Elena V.", date: "1 month ago" },
  { seat: "8K", route: "DXB-JFK", rating: 5, comment: "Business class seat with direct aisle access. Worth every point.", author: "Yuki T.", date: "3 weeks ago" },
];

export default function SeatReviewsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-light mb-2">Seat Reviews</h1>
          <p className="text-gray-500 mb-8">Real passenger reviews and photos of specific seats.</p>
          <div className="space-y-4">
            {reviews.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl border border-white/5 p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-mono text-sm bg-white/5 px-3 py-1 rounded-full">Seat {r.seat}</span>
                    <span className="text-xs text-gray-500 ml-2">{r.route}</span>
                  </div>
                  <div className="flex">{[...Array(5)].map((_, j) => <Star key={j} className={`w-4 h-4 ${j < r.rating ? "text-amber-400 fill-amber-400" : "text-gray-600"}`} />)}</div>
                </div>
                <p className="text-sm text-gray-300">{r.comment}</p>
                {r.image && <div className="mt-3 h-32 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${r.image})` }} />}
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>{r.author}</span>
                  <span>{r.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}