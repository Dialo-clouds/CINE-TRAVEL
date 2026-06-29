// @ts-ignore: allow compiling when '@supabase/supabase-js' types aren't available
import { createClient as _createClient } from "@supabase/supabase-js";
type SupabaseClient = any;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let _client: SupabaseClient | null = null;

export function createClient() {
  if (_client) return _client;
  _client = _createClient(supabaseUrl, supabaseKey);
  return _client;
}

export const supabase = createClient();
