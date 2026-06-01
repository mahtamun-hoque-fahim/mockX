"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Check, Loader2 } from "lucide-react";

const TYPES = [
  { id: "bug",        label: "Bug report" },
  { id: "suggestion", label: "Suggestion" },
  { id: "other",      label: "Other" },
] as const;

export function FeedbackWidget() {
  const [open,    setOpen]    = useState(false);
  const [type,    setType]    = useState<"bug"|"suggestion"|"other">("suggestion");
  const [message, setMessage] = useState("");
  const [state,   setState]   = useState<"idle"|"sending"|"sent"|"error">("idle");

  const handleSubmit = async () => {
    if (!message.trim() || message.length < 5) return;
    setState("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, message }),
      });
      if (!res.ok) throw new Error();
      setState("sent");
      setTimeout(() => { setState("idle"); setMessage(""); setOpen(false); }, 2000);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 2500);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <MessageSquare size={14} />
        Send feedback
      </button>
    );
  }

  return (
    <div className="w-full max-w-sm bg-surface border border-white/10 rounded-2xl p-5 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-syne font-semibold text-sm text-text-primary">Send feedback</h3>
        <button onClick={() => setOpen(false)} className="text-text-secondary hover:text-text-primary transition-colors text-lg leading-none">×</button>
      </div>

      {/* Type selector */}
      <div className="flex gap-1.5 mb-3">
        {TYPES.map(t => (
          <button
            key={t.id}
            onClick={() => setType(t.id)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all border ${type === t.id ? "bg-accent/15 border-accent/30 text-accent" : "bg-surface-elevated border-white/7 text-text-secondary hover:border-white/15"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Tell us what you think…"
        rows={3}
        className="w-full bg-surface-elevated border border-white/10 rounded-xl px-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 transition-all resize-none mb-3"
      />

      <Button
        onClick={handleSubmit}
        disabled={state === "sending" || message.trim().length < 5}
        className="w-full gap-2 text-sm"
      >
        {state === "sending" && <Loader2 size={13} className="animate-spin"/>}
        {state === "sent"    && <Check size={13}/>}
        {state === "sending" ? "Sending…" : state === "sent" ? "Sent — thanks!" : state === "error" ? "Failed, try again" : "Send feedback"}
      </Button>
    </div>
  );
}
