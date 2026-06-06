export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getCustomerPortalUrl } from "@/lib/lemonsqueezy";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL));
  }

  try {
    const [sub] = await db.select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, session.user.id));

    if (!sub) {
      return NextResponse.redirect(
        new URL("/api/billing/checkout", process.env.NEXT_PUBLIC_APP_URL)
      );
    }

    const portalUrl = await getCustomerPortalUrl(sub.lsCustomerId);
    return NextResponse.redirect(portalUrl);
  } catch {
    return NextResponse.json({ error: "Portal unavailable" }, { status: 500 });
  }
}
