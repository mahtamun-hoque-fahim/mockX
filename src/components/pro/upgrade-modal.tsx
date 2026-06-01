"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Check, Zap } from "lucide-react";

const PRO_FEATURES = [
  "Export at 3× resolution (ultra-sharp)",
  "No watermark on any export",
  "Unlimited saved mockups",
  "Custom background image upload",
  "Public share links",
  "Priority support",
];

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  trigger?: string;
}

export function UpgradeModal({ open, onClose, trigger }: UpgradeModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-surface border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-slide-up">
        {/* Top accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="p-6">
          {/* Close */}
          <button onClick={onClose} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors">
            <X size={16} />
          </button>

          {/* Icon + heading */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center shrink-0">
              <Zap size={18} className="text-accent" />
            </div>
            <div>
              <h2 className="font-syne font-bold text-lg text-text-primary leading-tight">Upgrade to Pro</h2>
              {trigger && <p className="text-xs text-text-secondary">{trigger} requires Pro</p>}
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-2.5 mb-6">
            {PRO_FEATURES.map(f => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-text-secondary">
                <Check size={13} className="text-accent mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {/* Price */}
          <div className="bg-surface-elevated border border-white/7 rounded-xl p-4 mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-text-primary">Pro plan</div>
              <div className="text-xs text-text-secondary">Billed monthly · cancel anytime</div>
            </div>
            <div className="text-right">
              <div className="font-syne font-bold text-xl text-text-primary">$9</div>
              <div className="text-[10px] text-text-secondary">/ month</div>
            </div>
          </div>

          {/* CTA */}
          <Button className="w-full gap-2 shadow-lg shadow-accent/20" size="lg">
            <Zap size={14} />
            Upgrade now
          </Button>
          <p className="text-center text-[10px] text-text-secondary mt-3">
            Payments powered by Lemon Squeezy · Coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
