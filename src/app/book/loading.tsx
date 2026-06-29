import { FlightCardSkeleton } from "@/components/ui/skeleton/skeleton";
export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="h-8 w-48 bg-white/[0.03] animate-pulse rounded-xl" />
        {[...Array(5)].map((_, i) => <FlightCardSkeleton key={i} />)}
      </div>
    </div>
  );
}