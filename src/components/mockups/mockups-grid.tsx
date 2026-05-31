"use client";
import { useState } from "react";
import Link from "next/link";
import type { Mockup } from "@/lib/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import {
  Monitor, Laptop, Pencil, Trash2, Share2,
  Globe, GlobeLock, Copy, Check, Loader2,
} from "lucide-react";

const WALLPAPER_BG: Record<string, string> = {
  "sonoma-dark":  "linear-gradient(135deg,#1a1a2e,#533483)",
  "sequoia":      "linear-gradient(160deg,#0d1b2a,#74c69d)",
  "slate":        "linear-gradient(135deg,#0f0c29,#24243e)",
  "ventura":      "linear-gradient(145deg,#667eea,#f093fb)",
  "dark-solid":   "#111113",
  "light-clouds": "linear-gradient(145deg,#e8eaf6,#e3f2fd)",
  "sunrise":      "linear-gradient(135deg,#f9a825,#e64a19)",
  "ocean":        "linear-gradient(180deg,#0077b6,#03045e)",
  "sonoma":       "linear-gradient(135deg,#1a1a2e,#533483)",
  "dark":         "#111113",
};

interface MockupsGridProps {
  initialMockups: Mockup[];
}

export function MockupsGrid({ initialMockups }: MockupsGridProps) {
  const [items, setItems]           = useState<Mockup[]>(initialMockups);
  const [deleting, setDeleting]     = useState<string | null>(null);
  const [sharing, setSharing]       = useState<string | null>(null);
  const [copiedId, setCopiedId]     = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this mockup?")) return;
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
        // Already public — just copy link
        await copyLink(mockup.id, mockup.shareSlug);
        return;
      }
      const res = await fetch(`/api/mockups/${mockup.id}/share`, { method: "POST" });
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
    const url = `${window.location.origin}/share/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const previewBg = (mockup: Mockup) => {
    const config = mockup.config as Record<string, unknown>;
    const wallpaperId = (config?.wallpaperId as string) ?? "";
    const outerBgId   = (config?.outerBgId   as string) ?? "";

    const OUTER_BGS: Record<string, string> = {
      "dark-1":  "#0a0c10",
      "dark-2":  "linear-gradient(135deg,#0f0c29,#302b63)",
      "purple":  "linear-gradient(135deg,#1a0533,#3b0764)",
      "teal":    "linear-gradient(135deg,#004d40,#00251a)",
      "light":   "linear-gradient(135deg,#e8eaf6,#c5cae9)",
      "white":   "#f5f5f7",
    };

    if (mockup.type === "scene" && outerBgId && OUTER_BGS[outerBgId]) return OUTER_BGS[outerBgId];
    return WALLPAPER_BG[wallpaperId] ?? "#111113";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(mockup => (
        <div key={mockup.id} className="group bg-surface border border-white/7 rounded-2xl overflow-hidden hover:border-white/12 transition-all duration-200">
          {/* Preview thumbnail */}
          <div
            className="h-36 relative flex items-center justify-center overflow-hidden"
            style={{ background: previewBg(mockup) }}
          >
            {mockup.thumbnailUrl ? (
              <img src={mockup.thumbnailUrl} alt="" className="w-full h-full object-cover object-top" />
            ) : (
              <div className="opacity-20">
                {mockup.type === "screen"
                  ? <Monitor size={40} strokeWidth={1}/>
                  : <Laptop  size={40} strokeWidth={1}/>
                }
              </div>
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Link href={`/app/${mockup.type}?id=${mockup.id}`}>
                <Button size="sm" className="gap-1.5 text-xs">
                  <Pencil size={11}/> Edit
                </Button>
              </Link>
            </div>
            {/* Type badge */}
            <div className="absolute top-2 left-2">
              <Badge variant={mockup.type === "screen" ? "default" : "pro"} className="text-[10px] capitalize">
                {mockup.type}
              </Badge>
            </div>
            {/* Public badge */}
            {mockup.isPublic && (
              <div className="absolute top-2 right-2">
                <Badge variant="success" className="text-[10px]">Shared</Badge>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-sm font-medium text-text-primary truncate">
                {mockup.title ?? <span className="text-text-secondary italic">Untitled</span>}
              </h3>
              <span className="text-[10px] text-text-secondary shrink-0">{formatDate(mockup.createdAt)}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 mt-3">
              <Link href={`/app/${mockup.type}?id=${mockup.id}`} className="flex-1">
                <Button variant="secondary" size="sm" className="w-full text-xs gap-1.5">
                  <Pencil size={11}/> Edit
                </Button>
              </Link>

              {/* Share button */}
              <button
                onClick={() => handleShare(mockup)}
                disabled={sharing === mockup.id}
                title={mockup.isPublic ? "Copy share link" : "Generate share link"}
                className="w-8 h-8 rounded-xl bg-surface-elevated border border-white/8 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-white/16 transition-all disabled:opacity-40"
              >
                {sharing === mockup.id
                  ? <Loader2 size={12} className="animate-spin"/>
                  : copiedId === mockup.id
                    ? <Check size={12} className="text-green-400"/>
                    : mockup.isPublic
                      ? <Copy size={12}/>
                      : <Share2 size={12}/>
                }
              </button>

              {/* Unshare */}
              {mockup.isPublic && (
                <button
                  onClick={() => handleUnshare(mockup.id)}
                  title="Make private"
                  className="w-8 h-8 rounded-xl bg-surface-elevated border border-white/8 flex items-center justify-center text-text-secondary hover:text-red-400 hover:border-red-500/20 transition-all"
                >
                  <GlobeLock size={12}/>
                </button>
              )}

              {/* Delete */}
              <button
                onClick={() => handleDelete(mockup.id)}
                disabled={deleting === mockup.id}
                title="Delete"
                className="w-8 h-8 rounded-xl bg-surface-elevated border border-white/8 flex items-center justify-center text-text-secondary hover:text-red-400 hover:border-red-500/20 transition-all disabled:opacity-40"
              >
                {deleting === mockup.id
                  ? <Loader2 size={12} className="animate-spin"/>
                  : <Trash2 size={12}/>
                }
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
