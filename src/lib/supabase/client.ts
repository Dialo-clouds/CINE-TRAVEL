import { createClient as supabaseCreateClient } from "@supabase/supabase-js";

const url = "https://nairkwdsyhinkpkkmuxs.supabase.co";
const key = "sb_publishable_A4lEwz61YH9V4dLBbVfJQg_4Zxbt4O5";

export const supabase = supabaseCreateClient(url, key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export function createClient() {
  return supabase;
}
