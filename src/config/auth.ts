import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth/minimal";
import { admin } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { v7 as uuidv7 } from "uuid";

import { database } from "@/config/database";
import * as authSchema from "@/features/auth/schemas";

export const auth = betterAuth({
  advanced: {
    database: {
      generateId: () => uuidv7(),
    },
  },
  database: drizzleAdapter(database, {
    provider: "pg",
    schema: {
      ...authSchema,
    },
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin(), tanstackStartCookies()],
  trustedOrigins: ["http://localhost:5173"],
});

export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session.session;
