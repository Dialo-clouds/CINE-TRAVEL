import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a helpful airline customer support agent for CineTravel Airlines. 

ABOUT CINETRAVEL:
- Cinematic exploration platform and premium airline
- Routes include: Dubai (DXB), London (LHR), Buenos Aires (EZE), El Calafate (FTE), Santiago (SCL), Punta Arenas (PUQ), New York (JFK), Tokyo (NRT), Sydney (SYD)
- Fleet: Airbus A350-900, Boeing 787-9 Dreamliner, Airbus A320neo, Embraer E195-E2
- Cabin classes: Economy, Premium Economy, Business, First Class

POLICIES:
- Check-in: Online check-in opens 24 hours before departure. Airport check-in closes 60 minutes before.
- Baggage: Economy 1x23kg checked + 1x7kg cabin. Business 2x32kg checked + 2x7kg cabin. First 3x32kg + 2x7kg cabin.
- Cancellation: Refundable tickets can be cancelled anytime. Non-refundable tickets have fees. Cancel within 24 hours of booking for full refund.
- Changes: Date changes allowed with fare difference. Name changes not permitted.
- Children: Infants under 2 travel on lap. Children 2-12 get 25% discount. Unaccompanied minors accepted ages 5-17.
- Pets: Small pets allowed in cabin ($100). Larger pets in cargo ($200).
- Special meals: Vegetarian, vegan, halal, kosher, gluten-free available. Request 48 hours before.
- Lounge access: Business/First complimentary. Economy can purchase day pass from $35.
- Loyalty: Privilege Club with Silver, Gold, Platinum tiers. Earn points on every flight.

RULES:
- Be friendly, professional, and concise.
- If asked about something not in your knowledge, say "Let me connect you with a specialist for that question."
- Never make up policies. If unsure, offer to escalate.
- Keep responses under 3 sentences unless detailed explanation is needed.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { message, history } = await req.json();

    // Build conversation context
    const conversationHistory = (history || []).map((msg: any) => ({
      role: msg.is_agent ? "assistant" : "user",
      content: msg.message,
    }));

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversationHistory.slice(-10), // Last 10 messages for context
      { role: "user", content: message },
    ];

    // Call OpenAI (or you can use a free model)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    // Fallback response if AI fails
    return new Response(
      JSON.stringify({
        reply: "I apologize, but I'm having trouble connecting to our knowledge base. Please try again or call our 24/7 support line at 1-800-CINETRAVEL for immediate assistance.",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});