import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Requirements",
  description: "Visa, passport, and health requirements by destination. Plan your trip with confidence.",
};

export default function TravelInfoPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-5xl font-light mb-4">Travel Requirements</h1>
        <p className="text-gray-500">Select a country to view entry requirements.</p>
      </div>
    </main>
  );
}