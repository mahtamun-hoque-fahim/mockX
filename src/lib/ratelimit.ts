let limiter: {
  limit: (id: string) => Promise<{ success: boolean; remaining: number }>;
} | null = null;

async function getLimiter() {
  if (limiter) return limiter;

  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    // No-op fallback — always allows
    limiter = {
      limit: async () => ({ success: true, remaining: 999 }),
    };
    return limiter;
  }

  const { Ratelimit } = await import("@upstash/ratelimit");
  const { Redis }     = await import("@upstash/redis");

  const redis = new Redis({ url, token });
  const rl    = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "1 m"),
    analytics: true,
    prefix: "mockx:rl",
  });

  limiter = {
    limit: async (id: string) => {
      const result = await rl.limit(id);
      return { success: result.success, remaining: result.remaining };
    },
  };
  return limiter;
}

export async function rateLimit(
  identifier: string
): Promise<{ success: boolean; remaining: number }> {
  try {
    const rl = await getLimiter();
    return await rl.limit(identifier);
  } catch {
    // Never block on rate limiter errors
    return { success: true, remaining: 999 };
  }
}
