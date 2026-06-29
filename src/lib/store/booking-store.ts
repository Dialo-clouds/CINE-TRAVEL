"use client";

import { create } from "zustand";

export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  passportFile?: File | null;
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  seatPreference: "window" | "aisle" | "middle" | "any";
  mealPreference: "regular" | "vegetarian" | "vegan" | "halal" | "kosher" | "none";
  specialRequests: string;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  currency: string;
  departureAirport: string;
  arrivalAirport: string;
}

interface BookingState {
  step: number;
  searchParams: {
    from: string;
    to: string;
    departDate: string;
    returnDate: string;
    passengers: number;
    cabinClass: "economy" | "premium" | "business" | "first";
  };
  selectedFlight: Flight | null;
  returnFlight: Flight | null;
  passengers: Passenger[];
  bookingId: string | null;
  
  setSearchParams: (params: Partial<BookingState["searchParams"]>) => void;
  setStep: (step: number) => void;
  setSelectedFlight: (flight: Flight) => void;
  setReturnFlight: (flight: Flight) => void;
  addPassenger: () => void;
  updatePassenger: (id: string, data: Partial<Passenger>) => void;
  removePassenger: (id: string) => void;
  setBookingId: (id: string) => void;
  reset: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const initialPassenger = (): Passenger => ({
  id: generateId(),
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  nationality: "",
  passportNumber: "",
  passportExpiry: "",
  email: "",
  phone: "",
  emergencyContact: "",
  emergencyPhone: "",
  seatPreference: "any",
  mealPreference: "regular",
  specialRequests: "",
});

export const useBookingStore = create<BookingState>((set) => ({
  step: 0,
  searchParams: {
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    passengers: 1,
    cabinClass: "economy",
  },
  selectedFlight: null,
  returnFlight: null,
  passengers: [initialPassenger()],
  bookingId: null,

  setSearchParams: (params) =>
    set((state) => ({ searchParams: { ...state.searchParams, ...params } })),
  
  setStep: (step) => set({ step }),
  
  setSelectedFlight: (flight) => set({ selectedFlight: flight }),
  setReturnFlight: (flight) => set({ returnFlight: flight }),
  
  addPassenger: () =>
    set((state) => ({ passengers: [...state.passengers, initialPassenger()] })),
  
  updatePassenger: (id, data) =>
    set((state) => ({
      passengers: state.passengers.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    })),
  
  removePassenger: (id) =>
    set((state) => ({
      passengers: state.passengers.filter((p) => p.id !== id),
    })),
  
  setBookingId: (id) => set({ bookingId: id }),
  reset: () =>
    set({
      step: 0,
      selectedFlight: null,
      returnFlight: null,
      passengers: [initialPassenger()],
      bookingId: null,
    }),
}));
