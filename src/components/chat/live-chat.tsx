"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, User, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface Message {
  id: string;
  message: string;
  is_agent: boolean;
  created_at: string;
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(() => "chat_" + Math.random().toString(36).substring(2, 9));
  const [isTyping, setIsTyping] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setMessages(data);
        } else {
          const welcomeMsg = {
            id: "welcome",
            message: "Welcome to CineTravel! I'm your AI assistant. How can I help you today? ✈️",
            is_agent: true,
            created_at: new Date().toISOString(),
          };
          setMessages([welcomeMsg]);
        }
      });

    const channel = supabase
      .channel("chat_" + sessionId)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages", filter: `session_id=eq.${sessionId}` },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => [...prev, newMsg]);
          setIsTyping(false);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [isOpen, sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/chat-agent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(-10),
        }),
      });

      if (!res.ok) throw new Error("AI failed");
      const data = await res.json();
      return data.reply;
    } catch {
      return getFallbackResponse(userMessage);
    }
  };

  const getFallbackResponse = (msg: string): string => {
    const lower = msg.toLowerCase();
    if (lower.includes("book") || lower.includes("flight")) return "You can search and book flights on our Book page. Is there a specific route or date you're looking for? ✈️";
    if (lower.includes("baggage") || lower.includes("luggage") || lower.includes("bag")) return "Economy: 1x23kg checked + 1x7kg cabin. Business: 2x32kg checked + 2x7kg cabin. First: 3x32kg + 2x7kg. Excess baggage starts at $50 per extra bag. 🧳";
    if (lower.includes("check-in") || lower.includes("checkin") || lower.includes("boarding")) return "Online check-in opens 24 hours before departure. Airport check-in closes 60 minutes before. You'll get your boarding pass after check-in. 🎫";
    if (lower.includes("cancel") || lower.includes("refund")) return "Refundable tickets can be cancelled anytime for full refund. Non-refundable tickets have cancellation fees. Cancel within 24 hours of booking for free! 💰";
    if (lower.includes("change") || lower.includes("modify")) return "You can change your flight date (fare difference applies). Name changes are not permitted. Visit My Bookings to make changes. 📅";
    if (lower.includes("pet") || lower.includes("dog") || lower.includes("cat")) return "Small pets under 8kg can travel in cabin ($100). Larger pets travel in cargo ($200). Service animals fly free. 🐾";
    if (lower.includes("meal") || lower.includes("food") || lower.includes("vegetarian") || lower.includes("halal")) return "We offer vegetarian, vegan, halal, kosher, and gluten-free meals. Request special meals at least 48 hours before departure. 🍽️";
    if (lower.includes("lounge")) return "Business/First Class: complimentary lounge access. Economy: day passes from $35. Lounges available at DXB, LHR, EZE, SCL, and JFK. 🥂";
    if (lower.includes("child") || lower.includes("infant") || lower.includes("baby") || lower.includes("kid")) return "Infants under 2: free on lap. Children 2-12: 25% discount. Unaccompanied minors (5-17) accepted with special service. 👶";
    if (lower.includes("seat") || lower.includes("upgrade")) return "You can select seats during booking or check-in. Want to upgrade? You can bid for Business/First Class on our Upgrade page! ⬆️";
    if (lower.includes("point") || lower.includes("loyalty") || lower.includes("privilege")) return "Privilege Club members earn points on every flight. Silver, Gold, and Platinum tiers offer increasing benefits. Check your points on the Loyalty page! ⭐";
    if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return "Hello! Welcome to CineTravel Airlines. I'm here to help with flights, baggage, check-in, and more. What can I assist you with? 😊";
    return "Great question! Let me connect you with a specialist who can help with that. In the meantime, you can explore our website for more information or call 1-800-CINETRAVEL. ✨";
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");

    await supabase.from("chat_messages").insert({
      session_id: sessionId,
      message: userMessage,
      is_agent: false,
    });

    setIsTyping(true);

    // Get response (AI or fallback)
    const response = useAI ? await getAIResponse(userMessage) : getFallbackResponse(userMessage);
    
    await supabase.from("chat_messages").insert({
      session_id: sessionId,
      message: response,
      is_agent: true,
    });
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white text-black shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed bottom-24 right-6 z-50 w-80 h-[500px] rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  {useAI ? <Sparkles className="w-4 h-4 text-blue-400" /> : <User className="w-4 h-4 text-blue-400" />}
                </div>
                <div>
                  <span className="text-sm font-medium">CineTravel AI Agent</span>
                  <p className="text-[0.5rem] text-blue-400">Online · Instant replies</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setUseAI(!useAI)} className={`p-1 rounded text-[0.5rem] ${useAI ? "text-blue-400" : "text-gray-500"}`}>
                  {useAI ? "AI" : "Basic"}
                </button>
                <button onClick={() => setIsOpen(false)}><X className="w-4 h-4 text-gray-400" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.is_agent ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.is_agent ? "bg-white/5 text-gray-200 rounded-tl-sm" : "bg-white text-black rounded-tr-sm"
                  }`}>
                    {m.message}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 text-gray-400 p-3 rounded-2xl rounded-tl-sm text-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-white/5 flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Ask me anything..." className="flex-1 bg-white/5 rounded-xl px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none" />
              <button onClick={handleSend} className="p-2 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors"><Send className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}