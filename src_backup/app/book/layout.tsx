"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, ChevronRight } from "lucide-react";

const steps = [
  { label: "Search", href: "/book" },
  { label: "Flights", href: "/book/flights" },
  { label: "Passengers", href: "/book/passengers" },
  { label: "Payment", href: "/book/payment" },
  { label: "Confirm", href: "/book/confirm" },
];

export default function BookLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentStep = steps.findIndex((s) => s.href === pathname);

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-white" />
          <span className="text-lg font-medium">CineTravel</span>
        </Link>
        <span className="text-sm text-gray-400">Book an Expedition</span>
      </header>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-center gap-2">
          {steps.map((step, i) => (
            <div key={step.href} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                i <= currentStep ? "bg-white text-black" : "bg-white/10 text-gray-500"
              }`}>
                {i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i <= currentStep ? "text-white" : "text-gray-600"}`}>
                {step.label}
              </span>
              {i < steps.length - 1 && (
                <ChevronRight className="w-3 h-3 text-gray-600 mx-1" />
              )}
            </div>
          ))}
        </div>
      </div>

      {children}
    </main>
  );
}
