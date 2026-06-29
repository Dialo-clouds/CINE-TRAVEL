// ============================================
// CineTravel Airlines — Type Definitions
// ============================================

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  nationality: string | null;
  passport_number: string | null;
  passport_expiry: string | null;
  date_of_birth: string | null;
  loyalty_tier: "standard" | "silver" | "gold" | "platinum";
  loyalty_points: number;
  role: "customer" | "employee" | "admin";
  created_at: string;
}

export interface Airport {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  timezone: string | null;
}

export interface Airline {
  id: string;
  code: string;
  name: string;
  logo_url: string | null;
  country: string | null;
}

export interface Flight {
  id: string;
  flight_number: string;
  airline: Airline;
  aircraft_id: string;
  departure_airport: Airport;
  arrival_airport: Airport;
  departure_time: string;
  arrival_time: string;
  duration_minutes: number;
  status: "scheduled" | "boarding" | "in_air" | "landed" | "cancelled" | "delayed";
  base_price: number;
  available_seats: number;
  seat_classes?: SeatClass[];
}

export interface SeatClass {
  id: string;
  flight_id: string;
  class_type: "economy" | "premium_economy" | "business" | "first";
  price_multiplier: number;
  total_seats: number;
  available_seats: number;
  baggage_allowance_kg: number;
  refundable: boolean;
  changeable: boolean;
}

export interface Booking {
  id: string;
  booking_reference: string;
  user_id: string;
  flight: Flight;
  return_flight?: Flight;
  seat_class: string;
  total_passengers: number;
  total_amount: number;
  currency: string;
  status: "pending" | "confirmed" | "cancelled" | "completed" | "refunded";
  payment_status: "unpaid" | "paid" | "refunded";
  passengers?: Passenger[];
  tickets?: Ticket[];
  created_at: string;
}

export interface Passenger {
  id: string;
  booking_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  nationality: string | null;
  passport_number: string | null;
  passport_expiry: string | null;
  seat_number: string | null;
  meal_preference: string;
  special_requests: string | null;
  check_in_status: boolean;
  boarding_status: boolean;
}

export interface Ticket {
  id: string;
  booking_id: string;
  passenger_id: string;
  ticket_number: string;
  qr_code_data: string | null;
  status: "active" | "used" | "cancelled" | "expired";
  issued_at: string;
}

export interface Payment {
  id: string;
  booking_id: string;
  user_id: string;
  amount: number;
  currency: string;
  payment_method: string | null;
  stripe_payment_intent_id: string | null;
  status: "pending" | "succeeded" | "failed" | "refunded";
  created_at: string;
}

export interface CheckIn {
  id: string;
  booking_id: string;
  passenger_id: string;
  checked_in_by: string;
  baggage_count: number;
  baggage_weight_kg: number | null;
  seat_assigned: string | null;
  boarding_group: string | null;
  checked_in_at: string;
}

export interface Staff {
  id: string;
  user_id: string;
  employee_id: string;
  department: "check_in" | "boarding" | "customer_service" | "operations" | "admin" | "finance";
  position: string | null;
  active: boolean;
}
