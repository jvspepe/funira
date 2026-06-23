import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth/minimal";
import { admin } from "better-auth/plugins";

import { database } from "@/config/database";

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: "pg",
  }),
  plugins: [admin()],
});
