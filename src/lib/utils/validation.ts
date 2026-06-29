export function validateEmail(email: string): string | null {
  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  if (password.length > 128) return "Password must be less than 128 characters";
  return null;
}

export function validatePassport(passport: string): string | null {
  if (!passport) return "Passport number is required";
  if (!/^[A-Z0-9]{6,12}$/.test(passport.toUpperCase())) return "Invalid passport format";
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone) return null; // Optional
  if (!/^\+?[\d\s-]{7,15}$/.test(phone)) return "Invalid phone format";
  return null;
}

export function validateBookingRef(ref: string): string | null {
  if (!ref) return "Booking reference is required";
  if (!/^CT-[A-Z0-9]{6,}$/.test(ref.toUpperCase())) return "Invalid booking reference format";
  return null;
}

export function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}