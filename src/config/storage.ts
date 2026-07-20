import { createClient } from "@supabase/supabase-js";

import { serverEnv } from "@/config/server-env";

// Public client — subject to RLS (for signed URLs / client-facing reads)
export const supabaseClient = createClient(
  serverEnv.SUPABASE_URL,
  serverEnv.SUPABASE_PLUBISHABLE_KEY
);

// Admin client — service role key bypasses RLS (server-side writes only)
const supabaseAdminClient = createClient(
  serverEnv.SUPABASE_URL,
  serverEnv.SUPABASE_SECRET_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export const { storage } = supabaseClient;
export const adminStorage = supabaseAdminClient.storage;
