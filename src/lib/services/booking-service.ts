import { supabase } from "@/lib/supabase/client";

interface CreateBookingParams {
  userId: string;
  flightId: string;
  returnFlightId?: string;
  seatClass: string;
  totalPassengers: number;
  totalAmount: number;
  passengers: Array<{
    first_name: string;
    last_name: string;
    date_of_birth?: string;
    nationality?: string;
    passport_number?: string;
    passport_expiry?: string;
    email?: string;
    phone?: string;
    seat_number?: string;
    meal_preference?: string;
    special_requests?: string;
  }>;
}

export async function createBooking(params: CreateBookingParams) {
  const bookingRef = "CT" + Date.now().toString(36).toUpperCase();
  
  const { data: booking, error } = await supabase.from("bookings").insert({
    booking_reference: bookingRef,
    user_id: params.userId,
    flight_id: params.flightId,
    return_flight_id: params.returnFlightId || null,
    seat_class: params.seatClass,
    total_passengers: params.totalPassengers,
    total_amount: params.totalAmount,
    status: "confirmed",
    payment_status: "paid",
  }).select().single();

  if (error) throw error;

  // Insert passengers
  const passengersData = params.passengers.map(p => ({
    booking_id: booking.id,
    first_name: p.first_name,
    last_name: p.last_name,
    date_of_birth: p.date_of_birth || null,
    nationality: p.nationality || null,
    passport_number: p.passport_number || null,
    passport_expiry: p.passport_expiry || null,
    seat_number: p.seat_number || null,
    meal_preference: p.meal_preference || "regular",
    special_requests: p.special_requests || null,
  }));

  const { error: passengerError } = await supabase.from("passengers").insert(passengersData);
  if (passengerError) throw passengerError;

  // Generate tickets
  const { data: savedPassengers } = await supabase.from("passengers").select("id").eq("booking_id", booking.id);
  if (savedPassengers) {
    const tickets = savedPassengers.map(p => ({
      booking_id: booking.id,
      passenger_id: p.id,
      ticket_number: "TKT" + Date.now().toString(36).toUpperCase() + p.id.substring(0, 4),
    }));
    await supabase.from("tickets").insert(tickets);
  }

  // Update available seats
  await supabase.rpc("decrement_available_seats", { flight_id: params.flightId, count: params.totalPassengers });

  return { booking, bookingRef };
}

export async function getUserBookings(userId: string) {
  const { data, error } = await supabase.from("bookings")
    .select("*, flight:flights(*, airline:airlines(*), departure_airport:airports!departure_airport_id(*), arrival_airport:airports!arrival_airport_id(*)), passengers(*), tickets(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function checkInPassenger(bookingId: string, passengerId: string, staffId: string) {
  const { error: checkInError } = await supabase.from("check_ins").insert({
    booking_id: bookingId,
    passenger_id: passengerId,
    checked_in_by: staffId,
  });
  if (checkInError) throw checkInError;

  const { error } = await supabase.from("passengers").update({ check_in_status: true }).eq("id", passengerId);
  if (error) throw error;
}