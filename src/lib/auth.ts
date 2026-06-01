import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "./db";
import * as schema from "./db/schema";

export const auth = betterAuth({
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
    updateAge: 60 * 60 * 24,
  },
  user: {
    additionalFields: {
      role:   { type: "string",  defaultValue: "user"  },
      banned: { type: "boolean", defaultValue: false    },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // Send welcome email after new user created
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

export type Session = typeof auth.$Infer.Session;
