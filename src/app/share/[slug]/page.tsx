import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { mockups, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

async function getMockup(slug: string) {
  try {
    const [row] = await db
      .select({ mockup: mockups, userName: users.name })
      .from(mockups)
      .leftJoin(users, eq(mockups.userId, users.id))
      .where(eq(mockups.shareSlug, slug));
    return row ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getMockup(slug);
  if (!data) return { title: "Not found — mockX" };
  return {
    title: `${data.mockup.title ?? "Shared mockup"} — mockX`,
    description: `A ${data.mockup.type} mockup shared via mockX`,
  };
}

export default async function SharePage({ params }: Props) {
  const { slug } = await params;
  const data = await getMockup(slug);
  if (!data || !data.mockup.isPublic) notFound();

  const { mockup, userName } = data;
  const config = mockup.config as Record<string, unknown>;

  // For screen mockups, extract wallpaper for preview bg
  const WALLPAPERS: Record<string, string> = {
    "sonoma-dark":  "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460,#533483)",
    "sequoia":      "linear-gradient(160deg,#0d1b2a,#1b4332,#74c69d)",
    "slate":        "linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
    "ventura":      "linear-gradient(145deg,#667eea,#764ba2,#f093fb)",
    "dark-solid":   "#111113",
    "light-clouds": "linear-gradient(145deg,#e8eaf6,#c5cae9,#e3f2fd)",
    "sunrise":      "linear-gradient(135deg,#f9a825,#f57f17,#e64a19)",
    "ocean":        "linear-gradient(180deg,#0077b6,#023e8a,#03045e)",
    "sonoma":       "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460,#533483)",
    "dark":         "#111113",
  };

  const previewBg = WALLPAPERS[config.wallpaperId as string] ?? "#111113";

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Nav */}
      <header className="h-14 border-b border-white/7 flex items-center justify-between px-6" style={{ background: "rgba(10,12,16,0.9)", backdropFilter: "blur(12px)" }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="3" width="12" height="9" rx="2" stroke="white" strokeWidth="1.4"/>
              <path d="M1 6h12" stroke="white" strokeWidth="1.4"/>
            </svg>
          </div>
          <span className="font-syne font-bold text-sm text-text-primary">mock<span className="text-accent">X</span></span>
        </Link>
        <Link href="/signup" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
          Create your own →
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 gap-6">
        {/* Meta */}
        <div className="text-center">
          <h1 className="font-syne font-bold text-2xl text-text-primary mb-1">
            {mockup.title ?? "Untitled mockup"}
          </h1>
          <p className="text-sm text-text-secondary">
            Shared by {userName ?? "Anonymous"} · {mockup.type === "screen" ? "Screen Mockup" : "Scene Mockup"}
          </p>
        </div>

        {/* Preview */}
        <div
          className="rounded-2xl overflow-hidden w-full max-w-3xl"
          style={{
            background: previewBg,
            aspectRatio: "16/10",
            boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {mockup.thumbnailUrl ? (
            <img src={mockup.thumbnailUrl} alt="Mockup preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-text-secondary text-sm opacity-50">Preview not available</div>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link href="/signup">
            <button className="px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20">
              Create your own mockup
            </button>
          </Link>
          <Link href="/">
            <button className="px-5 py-2.5 rounded-xl bg-surface border border-white/10 text-sm text-text-secondary hover:text-text-primary hover:border-white/20 transition-all">
              Learn more
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
