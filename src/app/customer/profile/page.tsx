"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { ArrowLeft, User, Mail, Phone, Globe, Save } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        setUser(userData.user);
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userData.user.id)
          .single();
        if (profileData) setProfile(profileData);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: profile.full_name,
        phone: profile.phone,
        nationality: profile.nationality,
        passport_number: profile.passport_number,
        passport_expiry: profile.passport_expiry,
        updated_at: new Date().toISOString(),
      });
    
    if (error) {
      setMessage("Error saving profile");
    } else {
      setMessage("Profile saved!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/5 px-6 py-4">
        <Link href="/customer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-light mb-8">Profile</h1>

        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4 p-6 rounded-xl border border-white/5 bg-black/50">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <p className="font-medium text-lg">{profile.full_name || "Explorer"}</p>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>

          {/* Personal Info */}
          <div className="rounded-xl border border-white/5 bg-black/50 p-6 space-y-4">
            <h2 className="text-lg font-light flex items-center gap-2">
              <User className="w-4 h-4" /> Personal Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.full_name || ""}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Phone</label>
                <input
                  type="tel"
                  value={profile.phone || ""}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none"
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nationality</label>
                <input
                  type="text"
                  value={profile.nationality || ""}
                  onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
                  className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none"
                  placeholder="United States"
                />
              </div>
            </div>
          </div>

          {/* Passport Info */}
          <div className="rounded-xl border border-white/5 bg-black/50 p-6 space-y-4">
            <h2 className="text-lg font-light flex items-center gap-2">
              <Globe className="w-4 h-4" /> Travel Document
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Passport Number</label>
                <input
                  type="text"
                  value={profile.passport_number || ""}
                  onChange={(e) => setProfile({ ...profile, passport_number: e.target.value })}
                  className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none"
                  placeholder="AB123456"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Passport Expiry</label>
                <input
                  type="date"
                  value={profile.passport_expiry || ""}
                  onChange={(e) => setProfile({ ...profile, passport_expiry: e.target.value })}
                  className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Profile"}
            </button>
            {message && (
              <span className="text-sm text-emerald-400">{message}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
