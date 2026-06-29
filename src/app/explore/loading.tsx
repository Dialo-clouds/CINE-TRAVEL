import { CardSkeleton } from "@/components/ui/skeleton/skeleton";
export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="h-8 w-48 bg-white/[0.03] animate-pulse rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
}