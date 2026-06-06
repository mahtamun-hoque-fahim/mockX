"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import type { Mockup } from "@/lib/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import {
  Monitor, Laptop, Pencil, Trash2, Share2,
  GlobeLock, Copy, Check, Loader2, ChevronDown,
} from "lucide-react";

const WALLPAPER_BG: Record<string, string> = {
  "sonoma-dark": "linear-gradient(135deg,#1a1a2e,#533483)",
  "sequoia":     "linear-gradient(160deg,#0d1b2a,#74c69d)",
  "slate":       "linear-gradient(135deg,#0f0c29,#24243e)",
  "ventura":     "linear-gradient(145deg,#667eea,#f093fb)",
  "dark-solid":  "#111113",
  "dark":        "#111113",
};

const OUTER_BG: Record<string, string> = {
  "dark-1": "#0a0c10",
  "dark-2": "linear-gradient(135deg,#0f0c29,#302b63)",
  "purple": "linear-gradient(135deg,#1a0533,#3b0764)",
};

interface MockupsGridProps {
  initialMockups: Mockup[];
  initialNextCursor: string | null;
}

export function MockupsGrid({ initialMockups, initialNextCursor }: MockupsGridProps) {
  const [items,      setItems]      = useState<Mockup[]>(initialMockups);
  const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor);
  const [loadingMore,setLoadingMore]= useState(false);
  const [deleting,   setDeleting]   = useState<string | null>(null);
  const [sharing,    setSharing]    = useState<string | null>(null);
  const [copiedId,   setCopiedId]   = useState<string | null>(null);
  const [duplicating,setDuplicating]= useState<string | null>(null);

  const loadMore = useCallback(async () => {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const res  = await fetch(`/api/mockups?cursor=${encodeURIComponent(nextCursor)}`);
      const data = await res.json() as { items: Mockup[]; nextCursor: string | null };
      setItems(prev => [...prev, ...data.items]);
      setNextCursor(data.nextCursor);
    } finally {
      setLoadingMore(false);
    }
  }, [nextCursor, loadingMore]);

  const handleDuplicate = async (mockup: Mockup) => {
    setDuplicating(mockup.id);
    try {
      const res  = await fetch("/api/mockups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type:         mockup.type,
          title:        mockup.title ? `${mockup.title} (copy)` : "Untitled (copy)",
          config:       mockup.config,
          thumbnailUrl: mockup.thumbnailUrl,
        }),
      });
      if (!res.ok) throw new Error();
      const created = await res.json() as Mockup;
      setItems(prev => [created, ...prev]);
    } finally {
      setDuplicating(null);
    }
  };

  const handleDelete = async (id: string) => {    if (!confirm("Delete this mockup?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/mockups/${id}`, { method: "DELETE" });
      setItems(prev => prev.filter(m => m.id !== id));
    } finally {
      setDeleting(null);
    }
  };

  const handleShare = async (mockup: Mockup) => {
    setSharing(mockup.id);
    try {
      if (mockup.isPublic && mockup.shareSlug) {
        await copyLink(mockup.id, mockup.shareSlug); return;
      }
      const res  = await fetch(`/api/mockups/${mockup.id}/share`, { method: "POST" });
      const data = await res.json() as { slug: string };
      setItems(prev => prev.map(m => m.id === mockup.id ? { ...m, isPublic: true, shareSlug: data.slug } : m));
      await copyLink(mockup.id, data.slug);
    } finally {
      setSharing(null);
    }
  };

  const handleUnshare = async (id: string) => {
    await fetch(`/api/mockups/${id}/share`, { method: "DELETE" });
    setItems(prev => prev.map(m => m.id === id ? { ...m, isPublic: false, shareSlug: null } : m));
  };

  const copyLink = async (id: string, slug: string) => {
    await navigator.clipboard.writeText(`${window.location.origin}/share/${slug}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const previewBg = (m: Mockup) => {
    const cfg = m.config as Record<string, unknown>;
    if (m.type === "scene") {
      const oid = cfg?.outerBgId as string ?? "";
      return OUTER_BG[oid] ?? WALLPAPER_BG[cfg?.wallpaperId as string ?? ""] ?? "#111113";
    }
    return WALLPAPER_BG[cfg?.wallpaperId as string ?? ""] ?? "#111113";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(mockup => (
          <div key={mockup.id} className="group bg-surface border border-white/7 rounded-2xl overflow-hidden hover:border-white/12 transition-all duration-200">
            {/* Preview */}
            <div className="h-36 relative flex items-center justify-center overflow-hidden"
              style={{ background: mockup.thumbnailUrl ? undefined : previewBg(mockup) }}>
              {mockup.thumbnailUrl
                ? <img src={mockup.thumbnailUrl} alt="" className="w-full h-full object-cover object-top"/>
                : <div className="opacity-20">{mockup.type === "screen" ? <Monitor size={38} strokeWidth={1}/> : <Laptop size={38} strokeWidth={1}/>}</div>
              }
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Link href={`/app/${mockup.type}?id=${mockup.id}`}>
                  <Button size="sm" className="gap-1.5 text-xs shadow-lg"><Pencil size={11}/> Edit</Button>
                </Link>
              </div>
              <div className="absolute top-2 left-2">
                <Badge variant={mockup.type === "screen" ? "default" : "pro"} className="text-[10px] capitalize">{mockup.type}</Badge>
              </div>
              {mockup.isPublic && (
                <div className="absolute top-2 right-2">
                  <Badge variant="success" className="text-[10px]">Shared</Badge>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-sm font-medium text-text-primary truncate">
                  {mockup.title ?? <span className="text-text-secondary italic">Untitled</span>}
                </h3>
                <span className="text-[10px] text-text-secondary shrink-0">{formatDate(mockup.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Link href={`/app/${mockup.type}?id=${mockup.id}`} className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full text-xs gap-1.5"><Pencil size={11}/> Edit</Button>
                </Link>
                {/* Duplicate */}
                <button onClick={() => handleDuplicate(mockup)} disabled={duplicating === mockup.id} title="Duplicate" className="w-8 h-8 rounded-xl bg-surface-elevated border border-white/8 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-white/16 transition-all disabled:opacity-40">
                  {duplicating === mockup.id ? <Loader2 size={12} className="animate-spin"/> : <Copy size={12}/>}
                </button>
                {/* Share */}
                <button onClick={() => handleShare(mockup)} disabled={sharing === mockup.id} title={mockup.isPublic ? "Copy link" : "Share"} className="w-8 h-8 rounded-xl bg-surface-elevated border border-white/8 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-white/16 transition-all disabled:opacity-40">
                  {sharing === mockup.id ? <Loader2 size={12} className="animate-spin"/> : copiedId === mockup.id ? <Check size={12} className="text-green-400"/> : mockup.isPublic ? <Copy size={12}/> : <Share2 size={12}/>}
                </button>
                {mockup.isPublic && (
                  <button onClick={() => handleUnshare(mockup.id)} title="Make private" className="w-8 h-8 rounded-xl bg-surface-elevated border border-white/8 flex items-center justify-center text-text-secondary hover:text-red-400 hover:border-red-500/20 transition-all">
                    <GlobeLock size={12}/>
                  </button>
                )}
                {/* Delete */}
                <button onClick={() => handleDelete(mockup.id)} disabled={deleting === mockup.id} title="Delete" className="w-8 h-8 rounded-xl bg-surface-elevated border border-white/8 flex items-center justify-center text-text-secondary hover:text-red-400 hover:border-red-500/20 transition-all disabled:opacity-40">
                  {deleting === mockup.id ? <Loader2 size={12} className="animate-spin"/> : <Trash2 size={12}/>}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load more */}
      {nextCursor && (
        <div className="flex justify-center pt-2">
          <Button variant="secondary" onClick={loadMore} disabled={loadingMore} className="gap-2 text-sm">
            {loadingMore ? <Loader2 size={13} className="animate-spin"/> : <ChevronDown size={13}/>}
            {loadingMore ? "Loading…" : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
}
