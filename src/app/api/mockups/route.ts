import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { mockups } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await db.select().from(mockups).where(eq(mockups.userId, session.user.id)).orderBy(desc(mockups.createdAt)).limit(50);
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { type, title, config, thumbnailUrl } = body;

  if (!type || !config) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const [row] = await db.insert(mockups).values({
    id: createId(),
    userId: session.user.id,
    type,
    title: title ?? null,
    config,
    thumbnailUrl: thumbnailUrl ?? null,
  }).returning();

  return NextResponse.json(row, { status: 201 });
}
