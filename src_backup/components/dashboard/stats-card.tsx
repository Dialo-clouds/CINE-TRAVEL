"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  className?: string;
}

export function StatsCard({ title, value, change, icon, className }: StatsCardProps) {
  const isPositive = change && change > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative p-6 rounded-xl border border-white/5 bg-black/50 backdrop-blur-xl overflow-hidden group hover:border-white/10 transition-all duration-300",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        {change !== undefined && (
          <span className={cn(
            "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
            isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
          )}>
            {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
      <h3 className="text-3xl font-light tracking-tight">{value}</h3>
      <p className="text-sm text-gray-400 mt-1">{title}</p>
    </motion.div>
  );
}
