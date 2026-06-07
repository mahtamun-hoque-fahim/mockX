import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

function MockupPreview() {
  return (
    <div className="relative mx-auto mt-16 mb-4" style={{ width: "min(860px, 92vw)" }}>
      {/* Glow */}
      <div
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: "70%", height: 120, background: "radial-gradient(ellipse, rgba(108,99,255,0.25) 0%, transparent 70%)", filter: "blur(20px)" }}
      />

      {/* macOS frame */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 30%,#0f3460 60%,#533483 100%)",
          aspectRatio: "16/10",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Menu bar */}
        <div className="flex items-center justify-between px-4 shrink-0" style={{ background: "rgba(28,28,30,0.92)", height: 24 }}>
          <div className="flex items-center gap-3.5">
            <svg width="11" height="13" viewBox="0 0 13 15" fill="rgba(255,255,255,0.85)">
              <path d="M10.5 7.9C10.5 6.2 11.5 5.3 11.5 5.3C10.6 4.1 9.3 3.9 8.8 3.9C7.6 3.8 6.4 4.6 5.8 4.6C5.2 4.6 4.1 3.9 3.2 3.9C1.7 3.9 0 5.1 0 7.6C0 10.9 2.1 14.1 3.4 14.1C4.1 14.1 4.8 13.5 5.8 13.5C6.8 13.5 7.4 14.1 8.3 14.1C9.7 14.1 11.5 11 11.5 11C11.5 11 10.5 10.5 10.5 7.9ZM8.2 2.8C8.8 2.1 9.2 1.1 9.1 0C8.2 0.1 7.1 0.6 6.4 1.3C5.8 1.9 5.3 2.9 5.5 3.9C6.5 3.9 7.6 3.4 8.2 2.8Z"/>
            </svg>
            {["Finder","File","Edit","View","Go"].map(item => (
              <span key={item} className="text-[10px]" style={{ color: "rgba(255,255,255,0.75)" }}>{item}</span>
            ))}
          </div>
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>Thu 12:41 PM</span>
        </div>

        {/* Desktop — fills remaining height */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>

          {/* Safari window — fills desktop with top/left/right/bottom */}
          <div
            className="rounded-lg overflow-hidden absolute"
            style={{
              top: "5%", left: "7%", right: "7%", bottom: "13%",
              display: "flex", flexDirection: "column",
              boxShadow: "0 20px 48px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.08)",
            }}
          >
            {/* Safari chrome */}
            <div style={{ background: "linear-gradient(180deg,#3a3a3c,#2c2c2e)", padding: "6px 10px 0", flexShrink: 0 }}>
              <div className="flex items-center gap-4 mb-1">
                <div className="flex gap-1.5">
                  {["#ff5f57","#febc2e","#28c840"].map(c => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }}/>
                  ))}
                </div>
                <div style={{ flex: 1, background: "#1c1c1e", borderRadius: "6px 6px 0 0", padding: "4px 10px", display: "flex", alignItems: "center", gap: 4, maxWidth: 200 }}>
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

            {/* Page content — fills all remaining window height */}
            <div style={{ flex: 1, background: "#f5f5f7", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {/* App top nav */}
              <div style={{ background: "white", borderBottom: "1px solid #e8e8ec", padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <div style={{ width: 14, height: 14, borderRadius: 3, background: "#6c63ff" }}/>
                  <div style={{ width: 36, height: 5, background: "#1a1a2e", borderRadius: 3 }}/>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  {[28, 22, 26, 20].map((w, i) => <div key={i} style={{ width: w, height: 5, background: "#c0c0cc", borderRadius: 3 }}/>)}
                </div>
                <div style={{ width: 46, height: 18, borderRadius: 6, background: "#6c63ff" }}/>
              </div>

              {/* Main content area */}
              <div style={{ flex: 1, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
                {/* Stat cards row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                  {[
                    { val: "2,847", lbl: "Mockups", clr: "#6c63ff" },
                    { val: "94%",   lbl: "Exports",  clr: "#007aff" },
                    { val: "12.3k", lbl: "Views",    clr: "#28c840" },
                    { val: "Pro",   lbl: "Plan",     clr: "#ff9f0a" },
                  ].map(({ val, lbl, clr }) => (
                    <div key={lbl} style={{ background: "white", borderRadius: 8, padding: "8px 10px", border: "1px solid #e8e8ec" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#1a1a2e", marginBottom: 2 }}>{val}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: clr }}/>
                        <span style={{ fontSize: 8, color: "#888" }}>{lbl}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent mockups grid */}
                <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, overflow: "hidden" }}>
                  {[
                    { bg: "linear-gradient(135deg,#6c63ff20,#8b83ff15)", border: "#6c63ff30", h: "55%" },
                    { bg: "linear-gradient(135deg,#007aff20,#5ac8fa15)", border: "#007aff30", h: "45%" },
                    { bg: "linear-gradient(135deg,#28c84020,#74d97f15)", border: "#28c84030", h: "65%" },
                    { bg: "linear-gradient(135deg,#ff9f0a20,#ffcc0215)", border: "#ff9f0a30", h: "50%" },
                    { bg: "linear-gradient(135deg,#ff453a20,#ff6b6015)", border: "#ff453a30", h: "60%" },
                    { bg: "linear-gradient(135deg,#30d15820,#34c75915)", border: "#30d15830", h: "40%" },
                  ].map(({ bg, border, h }, i) => (
                    <div key={i} style={{ background: "white", borderRadius: 8, border: "1px solid #e8e8ec", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                      <div style={{ flex: 1, background: bg, border: `1px solid ${border}`, margin: 6, borderRadius: 6, minHeight: 40 }}/>
                      <div style={{ padding: "4px 8px 6px" }}>
                        <div style={{ width: h, height: 4, background: "#e0e0e8", borderRadius: 3, marginBottom: 3 }}/>
                        <div style={{ width: "40%", height: 3, background: "#ebebf0", borderRadius: 3 }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dock */}
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-1"
            style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(20px)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.14)" }}
          >
            {[
              "linear-gradient(135deg,#007aff,#5ac8fa)",
              "linear-gradient(135deg,#6c63ff,#8b83ff)",
              "linear-gradient(135deg,#30d158,#34c759)",
              "linear-gradient(135deg,#ff9f0a,#ffcc02)",
              "linear-gradient(135deg,#ff453a,#ff6b60)",
              "rgba(255,255,255,0.12)",
            ].map((bg, i) => (
              <div key={i} style={{ width: 28, height: 28, borderRadius: 8, background: bg, border: "1px solid rgba(255,255,255,0.12)" }}/>
            ))}
          </div>
        </div>
      </div>

      {/* Floating labels */}
      <div className="absolute -left-2 top-1/3 hidden xl:flex flex-col gap-1.5 items-end">
        {[{ text: "13 app frames", color: "#6c63ff" }, { text: "Light & Dark mode", color: "#007aff" }].map(({ text, color }) => (
          <div key={text} className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium" style={{ background: "rgba(10,12,16,0.85)", borderColor: color + "30", color, backdropFilter: "blur(8px)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }}/>
            {text}
          </div>
        ))}
      </div>
      <div className="absolute -right-2 top-1/3 hidden xl:flex flex-col gap-1.5">
        {[{ text: "Export 1× / 2× / 3×", color: "#28c840" }, { text: "Cmd+V paste", color: "#febc2e" }].map(({ text, color }) => (
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
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/8 text-accent text-xs font-medium mb-8 animate-fade-in">
        <Sparkles size={11}/>
        MacBook M4 · 13 app frames · Export at 3×
      </div>

      <h1 className="font-syne font-bold text-5xl md:text-7xl leading-[1.06] tracking-tight text-text-primary max-w-4xl mb-6 animate-slide-up">
        Turn any screenshot into a{" "}
        <span className="text-accent">pixel-perfect</span>{" "}
        MacBook mockup
      </h1>

      <p className="text-text-secondary text-lg md:text-xl max-w-2xl mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: "0.08s" }}>
        Drop your screenshot, pick an app frame, choose a desk scene.
        Export as high-res PNG in seconds — no design skills needed.
      </p>

      <div className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: "0.14s" }}>
        <Link href="/signup">
          <Button size="lg" className="gap-2 shadow-xl shadow-accent/25">
            Start for free <ArrowRight size={16}/>
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

      <MockupPreview/>
    </section>
  );
}
