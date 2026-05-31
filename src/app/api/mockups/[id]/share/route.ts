import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { mockups } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { generateSlug } from "@/lib/utils";

export async function POST(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const [existing] = await db
    .select()
    .from(mockups)
    .where(and(eq(mockups.id, id), eq(mockups.userId, session.user.id)));

  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // If already public, return existing slug
  if (existing.isPublic && existing.shareSlug) {
    return NextResponse.json({ slug: existing.shareSlug });
  }

  // Generate unique slug
  let slug = generateSlug(10);
  const [updated] = await db
    .update(mockups)
    .set({ isPublic: true, shareSlug: slug, updatedAt: new Date() })
    .where(eq(mockups.id, id))
    .returning();

  return NextResponse.json({ slug: updated.shareSlug });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  await db
    .update(mockups)
    .set({ isPublic: false, shareSlug: null, updatedAt: new Date() })
    .where(and(eq(mockups.id, id), eq(mockups.userId, session.user.id)));

  return new NextResponse(null, { status: 204 });
}
