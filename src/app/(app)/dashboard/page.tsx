export const dynamic = "force-dynamic";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { mockups } from "@/lib/db/schema";
import type { Mockup } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Monitor, Laptop, ArrowRight, Plus, Pencil } from "lucide-react";

const WALLPAPER_BG: Record<string, string> = {
  "sonoma-dark": "linear-gradient(135deg,#1a1a2e,#533483)",
  "sequoia":     "linear-gradient(160deg,#0d1b2a,#74c69d)",
  "slate":       "linear-gradient(135deg,#0f0c29,#24243e)",
  "ventura":     "linear-gradient(145deg,#667eea,#f093fb)",
  "dark-solid":  "#111113",
  "ocean":       "linear-gradient(180deg,#0077b6,#03045e)",
  "sonoma":      "linear-gradient(135deg,#1a1a2e,#533483)",
  "dark":        "#111113",
};

async function getRecentMockups(userId: string): Promise<Mockup[]> {
  try {
    return await db.select().from(mockups)
      .where(eq(mockups.userId, userId))
      .orderBy(desc(mockups.createdAt))
      .limit(6);
  } catch { return []; }
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userName = session?.user.name?.split(" ")[0] ?? "there";
  const recent   = session ? await getRecentMockups(session.user.id) : [];

  const previewBg = (m: Mockup) => {
    const cfg = m.config as Record<string, unknown>;
    const wid = (cfg?.wallpaperId as string) ?? "";
    const oid = (cfg?.outerBgId   as string) ?? "";
    const OUTER: Record<string,string> = { "dark-1":"#0a0c10","dark-2":"linear-gradient(135deg,#0f0c29,#302b63)","purple":"linear-gradient(135deg,#1a0533,#3b0764)" };
    if (m.type === "scene" && oid && OUTER[oid]) return OUTER[oid];
    return WALLPAPER_BG[wid] ?? "#111113";
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="font-syne font-bold text-3xl text-text-primary mb-1">Hey, {userName}</h1>
        <p className="text-text-secondary">What are we mocking up today?</p>
      </div>

      {/* Quick start */}
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {[
          { href: "/app/screen", icon: Monitor, title: "Screen Mockup", desc: "macOS desktop with app frame", gradient: "linear-gradient(135deg,#0f3460,#533483)" },
          { href: "/app/scene",  icon: Laptop,  title: "Scene Mockup",  desc: "MacBook on a desk scene",     gradient: "linear-gradient(135deg,#1a1c22,#302b63)" },
        ].map(card => (
          <Link key={card.href} href={card.href} className="group rounded-2xl border border-white/8 bg-surface overflow-hidden hover:border-accent/20 transition-all duration-200">
            <div className="h-28 flex items-center justify-center relative" style={{ background: card.gradient }}>
              <card.icon size={44} strokeWidth={1} className="text-white opacity-25 group-hover:opacity-40 transition-opacity"/>
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,transparent,rgba(19,23,32,0.55))" }}/>
            </div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="font-syne font-bold text-sm text-text-primary mb-0.5">{card.title}</h3>
                <p className="text-xs text-text-secondary">{card.desc}</p>
              </div>
              <ArrowRight size={15} className="text-text-secondary group-hover:text-accent transition-colors"/>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent mockups */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-syne font-semibold text-lg text-text-primary">Recent mockups</h2>
          <Link href="/app/mockups">
            <Button variant="ghost" size="sm" className="text-xs gap-1.5">View all <ArrowRight size={12}/></Button>
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="rounded-2xl border border-white/7 bg-surface p-10 flex flex-col items-center gap-3 text-center">
            <div className="w-11 h-11 rounded-xl bg-surface-elevated border border-white/8 flex items-center justify-center">
              <Plus size={18} className="text-text-secondary"/>
            </div>
            <p className="text-sm text-text-secondary">No saved mockups yet — create one above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {recent.map(m => (
              <Link key={m.id} href={`/app/${m.type}?id=${m.id}`} className="group rounded-xl border border-white/7 bg-surface overflow-hidden hover:border-white/14 transition-all">
                <div className="h-24 relative flex items-center justify-center" style={{ background: previewBg(m) }}>
                  {m.thumbnailUrl
                    ? <img src={m.thumbnailUrl} alt="" className="w-full h-full object-cover object-top"/>
                    : <div className="opacity-15">{m.type === "screen" ? <Monitor size={28} strokeWidth={1}/> : <Laptop size={28} strokeWidth={1}/>}</div>
                  }
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Pencil size={14} className="text-white"/>
                  </div>
                  <div className="absolute top-1.5 left-1.5">
                    <Badge variant={m.type === "screen" ? "default" : "pro"} className="text-[9px] capitalize">{m.type}</Badge>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-text-primary truncate">{m.title ?? <span className="italic text-text-secondary">Untitled</span>}</p>
                  <p className="text-[10px] text-text-secondary mt-0.5">{formatDate(m.createdAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
