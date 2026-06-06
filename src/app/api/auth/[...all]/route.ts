export const dynamic = "force-dynamic";
import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

// Do NOT call auth.handler at module level — it triggers getDb() → throws at build time.
// Wrap in functions so the handler is only resolved on the first real request.
export function GET(request: Request) {
  return toNextJsHandler(auth.handler).GET(request);
}
export function POST(request: Request) {
  return toNextJsHandler(auth.handler).POST(request);
}
