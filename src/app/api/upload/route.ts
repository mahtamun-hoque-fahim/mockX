import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_SIZE_MB   = 8;

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Pro gate
  const role = (session.user as { role?: string }).role ?? "user";
  if (role !== "pro" && role !== "admin") {
    return NextResponse.json({ error: "Pro required" }, { status: 403 });
  }

  // Cloudinary config check
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return NextResponse.json({ error: "Upload not configured" }, { status: 503 });
  }

  try {
    const formData = await req.formData();
    const file     = formData.get("file") as File | null;

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json({ error: `Max ${MAX_SIZE_MB}MB` }, { status: 400 });
    }

    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload via Cloudinary REST API (no SDK needed)
    const timestamp = Math.floor(Date.now() / 1000);
    const folder    = `mockx/${session.user.id}`;
    const toSign    = `folder=${folder}&timestamp=${timestamp}&upload_preset=mockx_bg`;

    const crypto    = await import("crypto");
    const signature = crypto
      .createHash("sha1")
      .update(toSign + CLOUDINARY_API_SECRET)
      .digest("hex");

    const uploadForm = new FormData();
    uploadForm.append("file",           base64);
    uploadForm.append("timestamp",      String(timestamp));
    uploadForm.append("api_key",        CLOUDINARY_API_KEY);
    uploadForm.append("signature",      signature);
    uploadForm.append("folder",         folder);
    uploadForm.append("transformation", "c_limit,w_2560,q_auto,f_auto");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: uploadForm }
    );

    if (!res.ok) {
      const err = await res.json() as { error?: { message?: string } };
      throw new Error(err?.error?.message ?? "Upload failed");
    }

    const data = await res.json() as { secure_url: string; public_id: string };
    return NextResponse.json({ url: data.secure_url, publicId: data.public_id });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
