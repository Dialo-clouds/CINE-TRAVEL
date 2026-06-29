import { supabase } from "@/lib/supabase/client";
import { Booking, Passenger } from "@/types";

export const bookingService = {
  async createBooking(params: {
    userId: string;
    flightId: string;
    returnFlightId?: string;
    seatClass: string;
    passengers: Omit<Passenger, "id" | "booking_id" | "check_in_status" | "boarding_status">[];
    totalAmount: number;
  }) {
    const bookingRef = "CT" + Date.now().toString(36).toUpperCase();

    // Create booking
    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        booking_reference: bookingRef,
        user_id: params.userId,
        flight_id: params.flightId,
        return_flight_id: params.returnFlightId,
        seat_class: params.seatClass,
        total_passengers: params.passengers.length,
        total_amount: params.totalAmount,
        status: "confirmed",
        payment_status: "paid",
      })
      .select()
      .single();

    if (error) return { error };

    // Add passengers
    const passengers = params.passengers.map((p) => ({
      ...p,
      booking_id: booking.id,
    }));

    const { error: passengerError } = await supabase
      .from("passengers")
      .insert(passengers);

    if (passengerError) return { error: passengerError };

    // Generate tickets
    const { data: savedPassengers } = await supabase
      .from("passengers")
      .select("*")
      .eq("booking_id", booking.id);

    if (savedPassengers) {
      const tickets = savedPassengers.map((p) => ({
        booking_id: booking.id,
        passenger_id: p.id,
        ticket_number: "TKT" + Date.now().toString(36).toUpperCase() + p.id.substring(0, 4),
      }));

      await supabase.from("tickets").insert(tickets);
    }

    return { data: booking };
  },

  async getUserBookings(userId: string) {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, flight:flights(*, airline:airlines(*), departure_airport:airports!departure_airport_id(*), arrival_airport:airports!arrival_airport_id(*)), passengers(*), tickets(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    return { data, error };
  },

  async getBookingByReference(reference: string) {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, flight:flights(*, airline:airlines(*)), passengers(*), tickets(*)")
      .eq("booking_reference", reference)
      .single();

    return { data, error };
  },

  async cancelBooking(bookingId: string) {
    const { error } = await supabase
      .from("bookings")
      .update({ status: "cancelled", payment_status: "refunded" })
      .eq("id", bookingId);

    return { error };
  },

  async checkInPassenger(bookingId: string, passengerId: string, checkedInBy: string, baggageCount: number = 0) {
    const { error: checkInError } = await supabase
      .from("check_ins")
      .insert({
        booking_id: bookingId,
        passenger_id: passengerId,
        checked_in_by: checkedInBy,
        baggage_count: baggageCount,
      });

    if (checkInError) return { error: checkInError };

    const { error } = await supabase
      .from("passengers")
      .update({ check_in_status: true })
      .eq("id", passengerId);

    return { error };
  },
};
