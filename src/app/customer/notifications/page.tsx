"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Plane, Ticket, Gift, AlertCircle, Check, Settings, Trash2 } from "lucide-react";

const mockNotifications = [
  { id: 1, type: "booking", title: "Booking Confirmed", body: "Your flight AR1824 to El Calafate has been confirmed. Booking reference: CT-ABC123.", time: "10 minutes ago", read: false, icon: Ticket, iconColor: "text-emerald-400" },
  { id: 2, type: "reminder", title: "Check-in Reminder", body: "Online check-in is now open for your flight tomorrow. Check in now to get your boarding pass.", time: "2 hours ago", read: false, icon: Plane, iconColor: "text-blue-400" },
  { id: 3, type: "promotion", title: "Special Offer", body: "Earn double Privilege Club points on all bookings this month. Limited time offer.", time: "1 day ago", read: true, icon: Gift, iconColor: "text-amber-400" },
  { id: 4, type: "update", title: "Gate Change", body: "Your flight AR1824 has been moved to Gate B12. Please proceed to the new gate.", time: "3 days ago", read: true, icon: AlertCircle, iconColor: "text-red-400" },
  { id: 5, type: "booking", title: "Booking Cancelled", body: "Your booking CT-XYZ789 has been cancelled. Refund of $342 will be processed.", time: "1 week ago", read: true, icon: Ticket, iconColor: "text-gray-400" },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState("all");

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filtered = filter === "all" ? notifications : filter === "unread" ? notifications.filter(n => !n.read) : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-[0.5rem] flex items-center justify-center">{unreadCount}</span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-light">Notifications</h1>
                <p className="text-xs text-gray-500">{unreadCount} unread</p>
              </div>
            </div>
            <button onClick={markAllRead} className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1">
              <Check className="w-3 h-3" /> Mark all read
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            {["all", "unread"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-xs capitalize transition-colors ${filter === f ? "bg-white text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>
                {f} {f === "unread" && `(${unreadCount})`}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <Bell className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p>No notifications</p>
              </div>
            ) : (
              filtered.map((n) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => markAsRead(n.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    n.read ? "border-white/5 bg-white/[0.01]" : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 ${n.iconColor}`}>
                      <n.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${n.read ? "" : "text-white"}`}>{n.title}</p>
                        <button onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }} className="text-gray-600 hover:text-red-400 transition-colors">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{n.body}</p>
                      <p className="text-[0.5rem] text-gray-600 mt-1.5">{n.time}</p>
                    </div>
                    {!n.read && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
