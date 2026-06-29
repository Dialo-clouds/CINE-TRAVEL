"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { motion } from "framer-motion";
import { MessageSquare, Send, User, Circle } from "lucide-react";

const conversations = [
  { id: 1, name: "Elena Vasquez", lastMessage: "Updated the Iceland photos", time: "5m ago", unread: 2, online: true },
  { id: 2, name: "Marcus Chen", lastMessage: "New destination submission", time: "1h ago", unread: 0, online: false },
  { id: 3, name: "Admin Team", lastMessage: "Monthly review meeting notes", time: "3h ago", unread: 5, online: true },
];

export default function WorkerMessagesPage() {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  return (
    <DashboardShell type="worker">
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-80 border-r border-white/5">
          <div className="p-4 border-b border-white/5">
            <h2 className="text-lg font-light">Messages</h2>
          </div>
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveChat(conv.id)}
              className={`w-full p-4 text-left border-b border-white/5 hover:bg-white/[0.02] transition-colors ${activeChat === conv.id ? 'bg-white/5' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium">
                    {conv.name[0]}
                  </div>
                  {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{conv.name}</span>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-xs flex items-center justify-center">{conv.unread}</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeChat ? (
            <>
              <div className="p-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">{conversations.find(c => c.id === activeChat)?.name[0]}</div>
                  <span className="font-medium">{conversations.find(c => c.id === activeChat)?.name}</span>
                </div>
              </div>
              <div className="flex-1 p-6 flex items-center justify-center text-gray-500 text-sm">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-white/10" />
                  <p>Select a conversation or send a new message</p>
                </div>
              </div>
              <div className="p-4 border-t border-white/5">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none"
                  />
                  <button className="p-2.5 bg-white text-black rounded-xl">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-white/5" />
                <p className="text-lg font-light">Worker Messages</p>
                <p>Communicate with team members and curators</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
