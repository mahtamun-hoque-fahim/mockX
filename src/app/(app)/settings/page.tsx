export const dynamic = "force-dynamic";
import { Suspense } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { AccountSettings } from "@/components/settings/account-settings";

export const metadata = { title: "Settings — mockX" };

export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const role = (session.user as { role?: string }).role ?? "user";

  let hasSub = false;
  try {
    const [sub] = await db.select({ id: subscriptions.id })
      .from(subscriptions)
      .where(eq(subscriptions.userId, session.user.id));
    hasSub = !!sub;
  } catch {}

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-syne font-bold text-2xl text-text-primary mb-1">Settings</h1>
        <p className="text-text-secondary text-sm">Manage your account and subscription</p>
      </div>
      <Suspense>
        <AccountSettings
          user={{ id: session.user.id, name: session.user.name ?? "", email: session.user.email, role }}
          hasSub={hasSub}
        />
      </Suspense>
    </div>
  );
}
