"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Globe, AlertCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/customer";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isSignUp) {
        await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: { data: { full_name: fullName || email.split("@")[0] } },
        });
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (signInError) {
        setError(signInError.message);
        setIsLoading(false);
        return;
      }

      if (data.session) {
        router.replace(redirectTo);
      } else {
        setError("Unable to sign in. Please try again.");
        setIsLoading(false);
      }
    } catch (err: any) {
      setError("Error: " + (err.message || "Connection failed"));
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <Globe className="w-12 h-12 text-white/70 mx-auto mb-4" />
        <h1 className="text-2xl font-light">CineTravel AI</h1>
        <p className="text-sm text-gray-400 mt-1">{isSignUp ? "Create your account" : "Sign in to your account"}</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8">
        <div className="flex mb-6 bg-white/5 rounded-lg p-1">
          <button onClick={() => { setIsSignUp(false); setError(""); }} className={`flex-1 py-2 rounded-md text-sm ${!isSignUp ? "bg-white text-black" : "text-gray-400"}`}>Sign In</button>
          <button onClick={() => { setIsSignUp(true); setError(""); }} className={`flex-1 py-2 rounded-md text-sm ${isSignUp ? "bg-white text-black" : "text-gray-400"}`}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm text-gray-300 mb-2">Full Name</label>
              <input type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-500 focus:outline-none" />
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Email</label>
            <input type="email" placeholder="explorer@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-500 focus:outline-none" required />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-gray-500 focus:outline-none" required minLength={6} />
          </div>

          {error && <div className="flex items-center gap-2 text-sm p-3 rounded-xl bg-red-500/10 text-red-400"><AlertCircle className="w-4 h-4 shrink-0" />{error}</div>}

          <button type="submit" disabled={isLoading} className="w-full h-11 rounded-xl bg-white text-black text-sm font-medium hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center gap-2">
            {isLoading ? "Signing in..." : isSignUp ? "Create Account" : "Sign In"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 w-full max-w-md px-4">
        <Suspense fallback={<div className="text-center text-gray-400">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
