import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "./db";
import * as schema from "./db/schema";

function createAuth() {
  return betterAuth({
    database: drizzleAdapter(getDb(), {
      provider: "pg",
      schema: {
        user:         schema.users,
        session:      schema.sessions,
        account:      schema.accounts,
        verification: schema.verifications,
      },
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge:  60 * 60 * 24,
    },
    user: {
      additionalFields: {
        role:   { type: "string",  defaultValue: "user"  },
        banned: { type: "boolean", defaultValue: false   },
      },
    },
    databaseHooks: {
      user: {
        create: {
          after: async (user) => {
            try {
              if (user.email && process.env.RESEND_API_KEY) {
                const { sendWelcomeEmail } = await import("./email");
                await sendWelcomeEmail(user.email, user.name ?? "there");
              }
            } catch {
              // Never block account creation if email fails
            }
          },
        },
      },
    },
  });
}

// Lazy singleton — getDb() is only called on first request, not at module import time.
// This prevents Next.js build-time page-data collection from throwing when DATABASE_URL
// is not present in the build environment.
let _auth: ReturnType<typeof createAuth> | null = null;

export const auth = new Proxy({} as ReturnType<typeof createAuth>, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(_target: any, prop: any) {
    if (!_auth) _auth = createAuth();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (_auth as any)[prop];
  },
});

export type Session = ReturnType<typeof createAuth>["$Infer"]["Session"];
