import { createClient } from "@supabase/supabase-js";

import { serverEnv } from "@/config/server-env";

export const supabaseClient = createClient(
  serverEnv.SUPABASE_URL,
  serverEnv.SUPABASE_PLUBISHABLE_KEY
);

export const { storage } = supabaseClient;
