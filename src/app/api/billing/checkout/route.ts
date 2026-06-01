import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { createCheckout } from "@/lib/lemonsqueezy";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL));
  }

  const variantId = process.env.LEMONSQUEEZY_PRO_VARIANT_ID;
  if (!variantId) {
    return NextResponse.json({ error: "Billing not configured" }, { status: 503 });
  }

  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const { checkoutUrl } = await createCheckout({
      variantId,
      email:       session.user.email,
      userId:      session.user.id,
      redirectUrl: `${appUrl}/app/settings?upgraded=1`,
    });
    return NextResponse.redirect(checkoutUrl);
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
