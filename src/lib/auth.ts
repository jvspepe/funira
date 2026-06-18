import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";

import { database } from "@/config/database";

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: "pg",
  }),
  //... the rest of your config
});
