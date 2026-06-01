const LS_API_URL = "https://api.lemonsqueezy.com/v1";

function getHeaders() {
  return {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
  };
}

/* ── Create checkout session ───────────────────────────────── */
export async function createCheckout({
  variantId,
  email,
  userId,
  redirectUrl,
}: {
  variantId: string;
  email: string;
  userId: string;
  redirectUrl: string;
}): Promise<{ checkoutUrl: string }> {
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  if (!storeId || !process.env.LEMONSQUEEZY_API_KEY) {
    throw new Error("Lemon Squeezy not configured");
  }

  const body = {
    data: {
      type: "checkouts",
      attributes: {
        checkout_data: {
          email,
          custom: { user_id: userId },
        },
        product_options: {
          redirect_url: redirectUrl,
        },
      },
      relationships: {
        store:   { data: { type: "stores",   id: storeId   } },
        variant: { data: { type: "variants", id: variantId } },
      },
    },
  };

  const res = await fetch(`${LS_API_URL}/checkouts`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`LS checkout error: ${res.status}`);

  const data = await res.json() as {
    data: { attributes: { url: string } };
  };
  return { checkoutUrl: data.data.attributes.url };
}

/* ── Get customer portal URL ────────────────────────────────── */
export async function getCustomerPortalUrl(
  lsCustomerId: string
): Promise<string> {
  const res = await fetch(
    `${LS_API_URL}/customers/${lsCustomerId}`,
    { headers: getHeaders() }
  );
  if (!res.ok) throw new Error("LS customer fetch error");
  const data = await res.json() as {
    data: { attributes: { urls: { customer_portal: string } } };
  };
  return data.data.attributes.urls.customer_portal;
}

/* ── Verify webhook signature ───────────────────────────────── */
export async function verifyWebhookSignature(
  rawBody: string,
  signature: string
): Promise<boolean> {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) return false;

  const encoder  = new TextEncoder();
  const key      = await crypto.subtle.importKey(
    "raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig      = await crypto.subtle.sign("HMAC", key, encoder.encode(rawBody));
  const hexSig   = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
  return hexSig === signature;
}
