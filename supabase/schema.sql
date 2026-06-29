-- CINETRAVEL AIRLINES — Complete Database Schema
-- Run this in Supabase SQL Editor

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- USERS & PROFILES
-- ============================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    nationality TEXT,
    passport_number TEXT,
    passport_expiry DATE,
    date_of_birth DATE,
    address JSONB DEFAULT '{}',
    loyalty_tier TEXT DEFAULT 'standard' CHECK (loyalty_tier IN ('standard', 'silver', 'gold', 'platinum')),
    loyalty_points INTEGER DEFAULT 0,
    role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'employee', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AIRPORTS
-- ============================================
CREATE TABLE public.airports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    timezone TEXT,
    coordinates JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AIRLINES
-- ============================================
CREATE TABLE public.airlines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    logo_url TEXT,
    country TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AIRCRAFT
-- ============================================
CREATE TABLE public.aircraft (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration TEXT UNIQUE NOT NULL,
    model TEXT NOT NULL,
    airline_id UUID REFERENCES public.airlines(id),
    total_seats INTEGER NOT NULL,
    seat_map JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FLIGHTS
-- ============================================
CREATE TABLE public.flights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    flight_number TEXT NOT NULL UNIQUE,
    airline_id UUID REFERENCES public.airlines(id),
    aircraft_id UUID REFERENCES public.aircraft(id),
    departure_airport_id UUID REFERENCES public.airports(id),
    arrival_airport_id UUID REFERENCES public.airports(id),
    departure_time TIMESTAMPTZ NOT NULL,
    arrival_time TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'boarding', 'in_air', 'landed', 'cancelled', 'delayed')),
    base_price DECIMAL(10,2) NOT NULL,
    available_seats INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SEAT CLASSES & PRICING
-- ============================================
CREATE TABLE public.seat_classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    flight_id UUID REFERENCES public.flights(id) ON DELETE CASCADE,
    class_type TEXT CHECK (class_type IN ('economy', 'premium_economy', 'business', 'first')),
    price_multiplier DECIMAL(3,2) DEFAULT 1.0,
    total_seats INTEGER NOT NULL,
    available_seats INTEGER NOT NULL,
    baggage_allowance_kg INTEGER DEFAULT 23,
    refundable BOOLEAN DEFAULT false,
    changeable BOOLEAN DEFAULT false,
    amenities JSONB DEFAULT '{}',
    UNIQUE(flight_id, class_type)
);

-- ============================================
-- BOOKINGS
-- ============================================
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_reference TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES public.profiles(id),
    flight_id UUID REFERENCES public.flights(id),
    return_flight_id UUID REFERENCES public.flights(id),
    seat_class TEXT NOT NULL,
    total_passengers INTEGER NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'refunded')),
    payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded', 'partially_refunded')),
    payment_intent_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PASSENGERS (per booking)
-- ============================================
CREATE TABLE public.passengers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE,
    nationality TEXT,
    passport_number TEXT,
    passport_expiry DATE,
    seat_number TEXT,
    meal_preference TEXT DEFAULT 'regular',
    special_requests TEXT,
    check_in_status BOOLEAN DEFAULT false,
    boarding_status BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TICKETS
-- ============================================
CREATE TABLE public.tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    passenger_id UUID REFERENCES public.passengers(id),
    ticket_number TEXT UNIQUE NOT NULL,
    qr_code_data TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'used', 'cancelled', 'expired')),
    issued_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PAYMENTS
-- ============================================
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.bookings(id),
    user_id UUID REFERENCES public.profiles(id),
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    payment_method TEXT,
    stripe_payment_intent_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded')),
    refund_amount DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CHECK-INS
-- ============================================
CREATE TABLE public.check_ins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.bookings(id),
    passenger_id UUID REFERENCES public.passengers(id),
    checked_in_by UUID REFERENCES public.profiles(id),
    baggage_count INTEGER DEFAULT 0,
    baggage_weight_kg DECIMAL(5,2),
    seat_assigned TEXT,
    boarding_group TEXT,
    checked_in_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- EMPLOYEE / STAFF
-- ============================================
CREATE TABLE public.staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) UNIQUE,
    employee_id TEXT UNIQUE NOT NULL,
    department TEXT CHECK (department IN ('check_in', 'boarding', 'customer_service', 'operations', 'admin', 'finance')),
    position TEXT,
    shift_start TIME,
    shift_end TIME,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LOYALTY POINTS HISTORY
-- ============================================
CREATE TABLE public.loyalty_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id),
    points INTEGER NOT NULL,
    transaction_type TEXT CHECK (transaction_type IN ('earned', 'redeemed', 'expired', 'bonus')),
    description TEXT,
    booking_id UUID REFERENCES public.bookings(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- NOTIFICATIONS
-- ============================================
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id),
    type TEXT CHECK (type IN ('booking_confirmed', 'check_in_reminder', 'flight_update', 'payment_receipt', 'promotion', 'system')),
    title TEXT NOT NULL,
    body TEXT,
    read BOOLEAN DEFAULT false,
    data JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_flights_departure ON public.flights(departure_airport_id, departure_time);
CREATE INDEX idx_flights_status ON public.flights(status);
CREATE INDEX idx_bookings_user ON public.bookings(user_id);
CREATE INDEX idx_bookings_reference ON public.bookings(booking_reference);
CREATE INDEX idx_passengers_booking ON public.passengers(booking_id);
CREATE INDEX idx_tickets_passenger ON public.tickets(passenger_id);
CREATE INDEX idx_payments_booking ON public.payments(booking_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id, read);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.passengers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flights ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Staff view all profiles" ON public.profiles FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('employee', 'admin'))
);

-- Bookings
CREATE POLICY "Users view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Staff manage bookings" ON public.bookings FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('employee', 'admin'))
);

-- Passengers
CREATE POLICY "Users view own passengers" ON public.passengers FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.bookings WHERE id = booking_id AND user_id = auth.uid())
);

-- Tickets
CREATE POLICY "Users view own tickets" ON public.tickets FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = booking_id AND b.user_id = auth.uid())
);

-- Payments
CREATE POLICY "Users view own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id);

-- Flights (public read)
CREATE POLICY "Anyone can view flights" ON public.flights FOR SELECT USING (true);
CREATE POLICY "Staff manage flights" ON public.flights FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('employee', 'admin'))
);

-- Notifications
CREATE POLICY "Users view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- SEED DATA: Airports
-- ============================================
INSERT INTO public.airports (code, name, city, country) VALUES
('EZE', 'Ministro Pistarini International', 'Buenos Aires', 'Argentina'),
('AEP', 'Jorge Newbery Airfield', 'Buenos Aires', 'Argentina'),
('FTE', 'El Calafate International', 'El Calafate', 'Argentina'),
('SCL', 'Arturo Merino Benitez', 'Santiago', 'Chile'),
('PUQ', 'Presidente Ibanez', 'Punta Arenas', 'Chile'),
('DXB', 'Dubai International', 'Dubai', 'UAE'),
('LHR', 'Heathrow', 'London', 'United Kingdom'),
('JFK', 'John F Kennedy International', 'New York', 'USA'),
('NRT', 'Narita International', 'Tokyo', 'Japan'),
('SYD', 'Kingsford Smith', 'Sydney', 'Australia');

-- ============================================
-- SEED DATA: Airlines
-- ============================================
INSERT INTO public.airlines (code, name, country) VALUES
('AR', 'Aerolineas Argentinas', 'Argentina'),
('LA', 'LATAM Airlines', 'Chile'),
('EK', 'Emirates', 'UAE'),
('BA', 'British Airways', 'United Kingdom');

-- ============================================
-- ENABLE REALTIME
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.flights;

-- DONE
