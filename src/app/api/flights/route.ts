import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  let query = supabase.from("flights").select("*, airline:airlines(*), departure_airport:airports!departure_airport_id(*), arrival_airport:airports!arrival_airport_id(*)").eq("status", "scheduled");

  if (from) query = query.eq("departure_airport.code", from);
  if (to) query = query.eq("arrival_airport.code", to);
  if (date) query = query.gte("departure_time", date).lt("departure_time", date + "T23:59:59");

  const { data, error } = await query.order("departure_time").limit(20);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
