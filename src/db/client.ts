import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

/** Null in the public demonstration deployment; configured Neon environments get typed Drizzle access. */
export const db = databaseUrl
  ? drizzle(neon(databaseUrl), { schema })
  : null;

export const hasDatabase = Boolean(databaseUrl);
