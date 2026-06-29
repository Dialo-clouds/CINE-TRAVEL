import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Allow all routes for now
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
