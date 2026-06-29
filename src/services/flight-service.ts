import { supabase } from "@/lib/supabase/client";
import { Flight, Airport } from "@/types";

export const flightService = {
  async searchFlights(params: {
    from: string;
    to: string;
    departDate: string;
    returnDate?: string;
    passengers: number;
    cabinClass: string;
  }) {
    const { data, error } = await supabase
      .from("flights")
      .select("*, airline:airlines(*), departure_airport:airports!departure_airport_id(*), arrival_airport:airports!arrival_airport_id(*), seat_classes(*)")
      .eq("departure_airport.code", params.from)
      .eq("arrival_airport.code", params.to)
      .gte("departure_time", params.departDate)
      .eq("status", "scheduled")
      .order("departure_time");

    return { data, error };
  },

  async getFlightById(id: string) {
    const { data, error } = await supabase
      .from("flights")
      .select("*, airline:airlines(*), departure_airport:airports!departure_airport_id(*), arrival_airport:airports!arrival_airport_id(*), seat_classes(*)")
      .eq("id", id)
      .single();

    return { data, error };
  },

  async getAirports() {
    const { data, error } = await supabase
      .from("airports")
      .select("*")
      .order("city");

    return { data, error };
  },
};
