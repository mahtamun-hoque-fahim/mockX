export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { verifyWebhookSignature } from "@/lib/lemonsqueezy";
import { createId } from "@paralleldrive/cuid2";

interface LSWebhookPayload {
  meta: {
    event_name: string;
    custom_data?: { user_id?: string };
  };
  data: {
    id: string;
    attributes: {
      customer_id:          number;
      variant_id:           number;
      status:               string;
      ends_at:              string | null;
      cancelled:            boolean;
      renews_at:            string | null;
      user_email:           string;
    };
  };
}

export async function POST(req: NextRequest) {
  const rawBody  = await req.text();
  const signature = req.headers.get("x-signature") ?? "";

  // Verify signature
  const valid = await verifyWebhookSignature(rawBody, signature);
  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as LSWebhookPayload;
  const eventName = payload.meta.event_name;
  const attrs     = payload.data.attributes;

  // Resolve user — prefer custom_data.user_id, fallback to email
  let userId: string | null = payload.meta.custom_data?.user_id ?? null;
  if (!userId) {
    const [u] = await db.select({ id: users.id })
      .from(users)
      .where(eq(users.email, attrs.user_email));
    userId = u?.id ?? null;
  }
  if (!userId) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  switch (eventName) {
    case "subscription_created":
    case "subscription_updated": {
      const isActive = attrs.status === "active" && !attrs.cancelled;

      // Upsert subscription record
      const existing = await db.select({ id: subscriptions.id })
        .from(subscriptions)
        .where(eq(subscriptions.lsSubscriptionId, payload.data.id));

      const subData = {
        userId,
        lsSubscriptionId: payload.data.id,
        lsCustomerId:     String(attrs.customer_id),
        lsVariantId:      String(attrs.variant_id),
        status:           (isActive ? "active" : attrs.cancelled ? "cancelled" : "expired") as "active" | "cancelled" | "expired" | "paused" | "past_due",
        currentPeriodEnd: attrs.renews_at ? new Date(attrs.renews_at) : null,
        cancelledAt:      attrs.cancelled && attrs.ends_at ? new Date(attrs.ends_at) : null,
        updatedAt:        new Date(),
      };

      if (existing.length > 0) {
        await db.update(subscriptions).set(subData).where(eq(subscriptions.lsSubscriptionId, payload.data.id));
      } else {
        await db.insert(subscriptions).values({ id: createId(), ...subData });
      }

      // Update user role
      await db.update(users)
        .set({ role: isActive ? "pro" : "user", updatedAt: new Date() })
        .where(eq(users.id, userId));

      // Send pro upgrade email on first activation
      if (eventName === "subscription_created" && isActive) {
        try {
          const [user] = await db.select({ email: users.email, name: users.name }).from(users).where(eq(users.id, userId));
          if (user && process.env.RESEND_API_KEY) {
            const { sendProUpgradeEmail } = await import("@/lib/email");
            await sendProUpgradeEmail(user.email, user.name ?? "there");
          }
        } catch { /* non-blocking */ }
      }
      break;
    }

    case "subscription_cancelled":
    case "subscription_expired": {
      await db.update(subscriptions)
        .set({ status: "cancelled", cancelledAt: new Date(), updatedAt: new Date() })
        .where(eq(subscriptions.lsSubscriptionId, payload.data.id));

      await db.update(users)
        .set({ role: "user", updatedAt: new Date() })
        .where(eq(users.id, userId));
      break;
    }
  }

  return NextResponse.json({ received: true });
}
