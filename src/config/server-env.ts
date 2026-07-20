import "dotenv/config";
import { nonEmpty, object, pipe, safeParse, string, url } from "valibot";

const ServerEnvSchema = object({
  BETTER_AUTH_URL: pipe(string(), nonEmpty(), url()),
  DATABASE_URL: pipe(string(), nonEmpty(), url()),
  SUPABASE_PLUBISHABLE_KEY: pipe(string(), nonEmpty()),
  SUPABASE_SECRET_KEY: pipe(string(), nonEmpty()),
  SUPABASE_URL: pipe(string(), nonEmpty(), url()),
});

const tryParseServerEnv = safeParse(ServerEnvSchema, process.env);

if (!tryParseServerEnv.success) {
  throw new Error("Invalid environment variables");
}

export const serverEnv = tryParseServerEnv.output;
