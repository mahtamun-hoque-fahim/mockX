"use client";
import { useRef, useState } from "react";
import { UpgradeModal } from "@/components/pro/upgrade-modal";
import { ImagePlus, Loader2, X } from "lucide-react";

interface CustomUploadButtonProps {
  userRole: string;
  label?: string;
  onUpload: (url: string) => void;
  onClear?: () => void;
  hasValue?: boolean;
}

function isPro(role: string) { return role === "pro" || role === "admin"; }

export function CustomUploadButton({
  userRole,
  label = "Custom image",
  onUpload,
  onClear,
  hasValue = false,
}: CustomUploadButtonProps) {
  const [uploading,    setUploading]    = useState(false);
  const [upgradeOpen,  setUpgradeOpen]  = useState(false);
  const [error,        setError]        = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!isPro(userRole)) { setUpgradeOpen(true); return; }
    fileRef.current?.click();
  };

  const handleFile = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res  = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json() as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      onUpload(data.url!);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setTimeout(() => setError(""), 3000);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} trigger="Custom image upload"/>
      <div className="flex items-center gap-2">
        <button
          onClick={handleClick}
          disabled={uploading}
          className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs transition-all disabled:opacity-50 ${
            hasValue
              ? "bg-accent/10 border-accent/25 text-accent"
              : "bg-surface-elevated border-white/7 text-text-secondary hover:border-white/15 hover:text-text-primary"
          }`}
        >
          {uploading
            ? <Loader2 size={12} className="animate-spin shrink-0"/>
            : <ImagePlus size={12} className="shrink-0"/>
          }
          <span className="truncate">{uploading ? "Uploading…" : label}</span>
          {!isPro(userRole) && (
            <span className="ml-auto text-[9px] text-accent border border-accent/30 rounded px-1 py-0.5 shrink-0">Pro</span>
          )}
        </button>
        {hasValue && onClear && (
          <button onClick={onClear} className="w-8 h-8 rounded-xl bg-surface-elevated border border-white/7 flex items-center justify-center text-text-secondary hover:text-red-400 transition-colors shrink-0">
            <X size={12}/>
          </button>
        )}
      </div>
      {error && <p className="text-[10px] text-red-400 mt-1">{error}</p>}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </>
  );
}
