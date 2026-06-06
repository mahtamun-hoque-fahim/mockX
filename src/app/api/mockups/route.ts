export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { mockups } from "@/lib/db/schema";
import { eq, desc, lt, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cursor = req.nextUrl.searchParams.get("cursor"); // createdAt ISO string

  const query = db.select().from(mockups)
    .where(
      cursor
        ? sql`${mockups.userId} = ${session.user.id} AND ${mockups.createdAt} < ${new Date(cursor)}`
        : eq(mockups.userId, session.user.id)
    )
    .orderBy(desc(mockups.createdAt))
    .limit(PAGE_SIZE + 1); // fetch one extra to know if there's a next page

  const rows = await query;
  const hasMore = rows.length > PAGE_SIZE;
  const items   = hasMore ? rows.slice(0, PAGE_SIZE) : rows;
  const nextCursor = hasMore ? items[items.length - 1].createdAt.toISOString() : null;

  return NextResponse.json({ items, nextCursor, hasMore });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json() as { type?: string; title?: string; config?: unknown; thumbnailUrl?: string };
  const { type, title, config, thumbnailUrl } = body;
  if (!type || !config) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  // Free-tier save limit
  const userRole = (session.user as { role?: string }).role ?? "user";
  if (userRole !== "pro" && userRole !== "admin") {
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(mockups)
      .where(eq(mockups.userId, session.user.id));
    if (count >= 20) {
      return NextResponse.json(
        { error: "Save limit reached. Upgrade to Pro for unlimited saves." },
        { status: 403 }
      );
    }
  }

  const [row] = await db.insert(mockups).values({
    id: createId(),
    userId: session.user.id,
    type: type as "scene" | "screen",
    title: title ?? null,
    config: config as Record<string, unknown>,
    thumbnailUrl: thumbnailUrl ?? null,
  }).returning();

  return NextResponse.json(row, { status: 201 });
}
