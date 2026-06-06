import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (_db) return _db;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "[mockX] DATABASE_URL is not set. Copy .env.example to .env.local and fill in your Neon connection string."
    );
  }
  const sql = neon(url);
  _db = drizzle(sql, { schema });
  return _db;
}

type DbType = ReturnType<typeof getDb>;

// Lazy proxy: evaluates only on first property access, not at import time.
// Prevents Next.js static page-data collection from throwing during build.
export const db: DbType = new Proxy(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {} as any,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(_target: any, prop: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (getDb() as any)[prop];
    },
  }
);
