import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export function NotFound({ message = "Page not found" }: { message?: string }) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center p-8">
        <p className="text-9xl font-thin text-white/5 mb-4">404</p>
        <h1 className="text-2xl font-light mb-2">{message}</h1>
        <p className="text-gray-500 text-sm mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 inline-flex items-center gap-2">
          <Home className="w-4 h-4" /> Return Home <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}