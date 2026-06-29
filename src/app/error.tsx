"use client";
import { ErrorBoundary } from "@/components/ui/error/error-boundary";
export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return <ErrorBoundary><div className="min-h-screen bg-black" /></ErrorBoundary>;
}