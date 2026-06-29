"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Vercel Analytics (free, auto-included with Next.js on Vercel)
    if (typeof window !== "undefined" && (window as any).va) {
      (window as any).va("pageview");
    }

    // Log page view
    console.log(`[Analytics] Page view: ${pathname}`);
  }, [pathname]);
}

export function trackEvent(name: string, data?: Record<string, any>) {
  console.log(`[Analytics] Event: ${name}`, data || "");
  
  // Send to Vercel Analytics
  if (typeof window !== "undefined" && (window as any).va) {
    (window as any).va("event", { name, ...data });
  }
}