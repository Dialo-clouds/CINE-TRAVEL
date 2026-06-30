import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function POST(request: NextRequest) {
  try {
    const { email, name, preferences } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const { error } = await supabase.from("newsletter_subscribers").upsert({
      email: email.toLowerCase().trim(),
      name: name || null,
      preferences: preferences || { deals: true, travel_tips: true, new_routes: true, premium: false },
      status: "active",
    }, { onConflict: "email" });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ message: "Already subscribed!" });
      }
      throw error;
    }

    return NextResponse.json({ message: "Successfully subscribed!" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}