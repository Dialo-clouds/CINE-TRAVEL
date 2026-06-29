"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Globe, Mail, Check, AlertCircle, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setError("");

    try {
      const origin = window.location.origin;
      const redirectUrl = origin + "/auth/callback";
      
      const result = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectUrl },
      });
      
      if (result.error) throw result.error;
      setMagicLinkSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send access link");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const origin = window.location.origin;
      const redirectUrl = origin + "/auth/callback";
      
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: redirectUrl },
      });
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    }
  };

  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-white/10 bg-white/5 mb-4">
              <Globe className="w-8 h-8 text-white/70" />
            </div>
            <h1 className="text-2xl font-light">CineTravel AI</h1>
            <p className="text-sm text-gray-400 mt-1">The Cinematic Exploration Platform</p>
          </div>

          {magicLinkSent ? (
            <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 mb-4">
                <Check className="w-7 h-7 text-emerald-400" />
              </div>
              <h2 className="text-xl font-light mb-2">Access Link Sent</h2>
              <p className="text-sm text-gray-400 mb-2">
                Check <span className="text-white">{email}</span> for your magic link.
              </p>
              <p className="text-xs text-gray-500 mb-6">The link expires in 60 minutes.</p>
              <button onClick={() => setMagicLinkSent(false)} className="text-sm text-gray-500 hover:text-white transition-colors">
                Use a different email
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8">
              <h2 className="text-xl font-light mb-1">Enter the Observatory</h2>
              <p className="text-sm text-gray-400 mb-6">Sign in to access the cinematic platform.</p>

              <form onSubmit={handleMagicLink} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="explorer@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20"
                    required
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/5 rounded-xl px-4 py-3">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-xl bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      Receive Access Link
                    </>
                  )}
                </button>
              </form>

              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-gray-500">or continue with</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <button
                onClick={handleGoogleSignIn}
                className="w-full h-11 rounded-xl border border-white/10 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/></svg>
                Google
              </button>

              <div className="text-center mt-6">
                <Link href="/explore" className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center justify-center gap-1">
                  Skip for now
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
