import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

function MockupPreview() {
  return (
    <div
      className="relative mx-auto mt-16 mb-4"
      style={{ width: "min(860px, 92vw)" }}
    >
      {/* Glow under the preview */}
      <div
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "70%", height: 120,
          background: "radial-gradient(ellipse, rgba(108,99,255,0.25) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* macOS desktop preview */}
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 30%,#0f3460 60%,#533483 100%)",
          aspectRatio: "16/10",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Menu bar */}
        <div className="flex items-center justify-between px-4 h-6 shrink-0" style={{ background: "rgba(28,28,30,0.9)" }}>
          <div className="flex items-center gap-3.5">
            <svg width="11" height="13" viewBox="0 0 13 15" fill="rgba(255,255,255,0.85)">
              <path d="M10.5 7.9C10.5 6.2 11.5 5.3 11.5 5.3C10.6 4.1 9.3 3.9 8.8 3.9C7.6 3.8 6.4 4.6 5.8 4.6C5.2 4.6 4.1 3.9 3.2 3.9C1.7 3.9 0 5.1 0 7.6C0 10.9 2.1 14.1 3.4 14.1C4.1 14.1 4.8 13.5 5.8 13.5C6.8 13.5 7.4 14.1 8.3 14.1C9.7 14.1 11.5 11 11.5 11C11.5 11 10.5 10.5 10.5 7.9ZM8.2 2.8C8.8 2.1 9.2 1.1 9.1 0C8.2 0.1 7.1 0.6 6.4 1.3C5.8 1.9 5.3 2.9 5.5 3.9C6.5 3.9 7.6 3.4 8.2 2.8Z"/>
            </svg>
            {["Finder","File","Edit","View","Go"].map(item => (
              <span key={item} className="text-[10px]" style={{ color: "rgba(255,255,255,0.75)" }}>{item}</span>
            ))}
          </div>
          <div className="flex items-center gap-2.5 text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>
            <span>Thu 12:41 PM</span>
          </div>
        </div>

        {/* Desktop content */}
        <div className="flex-1 flex items-center justify-center p-4 relative" style={{ height: "calc(100% - 24px - 52px)" }}>
          {/* Safari window */}
          <div
            className="rounded-lg overflow-hidden absolute"
            style={{
              width: "72%",
              top: "8%",
              left: "14%",
              boxShadow: "0 20px 48px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.08)",
            }}
          >
            {/* Safari chrome */}
            <div style={{ background: "linear-gradient(180deg,#3a3a3c,#2c2c2e)", padding: "6px 10px 0" }}>
              <div className="flex items-center gap-6 mb-1">
                <div className="flex gap-1.5">
                  {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }}/>)}
                </div>
                <div style={{ flex: 1, background: "#1c1c1e", borderRadius: "6px 6px 0 0", padding: "4px 10px", display: "flex", alignItems: "center", gap: 4, maxWidth: 180 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: "linear-gradient(135deg,#007aff,#5ac8fa)", flexShrink: 0 }}/>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.65)", fontFamily: "monospace" }}>yoursite.com</span>
                </div>
              </div>
              <div style={{ background: "#1c1c1e", padding: "3px 8px", display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 4, padding: "2.5px 8px" }}>
                  <span style={{ fontSize: 8.5, color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>https://yoursite.com/dashboard</span>
                </div>
              </div>
            </div>
            {/* Fake page content */}
            <div style={{ background: "#f8f8fa", padding: "12px 14px", height: 90, overflow: "hidden" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <div style={{ height: 7, background: "#e0e0e8", borderRadius: 4, width: 60 }}/>
                <div style={{ height: 7, background: "#6c63ff", borderRadius: 4, width: 40 }}/>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                {[["#6c63ff","#8b83ff"],["#007aff","#5ac8fa"],["#28c840","#74d97f"]].map(([from, to], i) => (
                  <div key={i} style={{ height: 28, borderRadius: 6, background: `linear-gradient(135deg,${from}20,${to}15)`, border: `1px solid ${from}30` }}/>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dock */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-1"
          style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)" }}
        >
          {["#007aff","#007aff","#30d158","#ff9f0a","#ff453a","#636366"].map((color, i) => (
            <div key={i} style={{ width: 28, height: 28, borderRadius: 8, background: i === 0 ? "linear-gradient(135deg,#007aff,#5ac8fa)" : `rgba(255,255,255,0.08)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: i === 0 ? "transparent" : `${color}40`, border: `1px solid ${color}50` }}/>
            </div>
          ))}
        </div>
      </div>

      {/* Floating labels */}
      <div className="absolute -left-2 top-1/3 hidden lg:flex flex-col gap-1.5 items-end">
        {[
          { text: "12 app frames", color: "#6c63ff" },
          { text: "Light & Dark mode", color: "#007aff" },
        ].map(({ text, color }) => (
          <div key={text} className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium" style={{ background: "rgba(10,12,16,0.85)", borderColor: color + "30", color, backdropFilter: "blur(8px)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }}/>
            {text}
          </div>
        ))}
      </div>

      <div className="absolute -right-2 top-1/3 hidden lg:flex flex-col gap-1.5">
        {[
          { text: "Export 1× / 2× / 3×", color: "#28c840" },
          { text: "Cmd+V paste", color: "#febc2e" },
        ].map(({ text, color }) => (
          <div key={text} className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium" style={{ background: "rgba(10,12,16,0.85)", borderColor: color + "30", color, backdropFilter: "blur(8px)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }}/>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="pt-32 pb-4 px-6 flex flex-col items-center text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/8 text-accent text-xs font-medium mb-8 animate-fade-in">
        <Sparkles size={11}/>
        MacBook M4 · 12 app frames · Export at 3×
      </div>

      {/* Headline */}
      <h1 className="font-syne font-bold text-5xl md:text-7xl leading-[1.06] tracking-tight text-text-primary max-w-4xl mb-6 animate-slide-up">
        Turn any screenshot into a{" "}
        <span className="text-accent">pixel-perfect</span>{" "}
        MacBook mockup
      </h1>

      <p className="text-text-secondary text-lg md:text-xl max-w-2xl mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: "0.08s" }}>
        Drop your screenshot, pick an app frame, choose a desk scene.
        Export as high-res PNG in seconds — no design skills needed.
      </p>

      {/* CTAs */}
      <div className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: "0.14s" }}>
        <Link href="/signup">
          <Button size="lg" className="gap-2 shadow-xl shadow-accent/25">
            Start for free
            <ArrowRight size={16}/>
          </Button>
        </Link>
        <Link href="/app/screen">
          <Button size="lg" variant="secondary" className="gap-2">
            Try the editor
          </Button>
        </Link>
      </div>

      <p className="mt-6 text-text-secondary text-xs animate-fade-in" style={{ animationDelay: "0.22s" }}>
        No credit card needed · Free tier forever · Export up to 2×
      </p>

      {/* Live preview */}
      <MockupPreview/>
    </section>
  );
}
