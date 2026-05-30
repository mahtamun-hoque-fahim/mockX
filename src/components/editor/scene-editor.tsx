"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { MacOSMenuBar } from "@/components/macos/menubar";
import { MacOSDock } from "@/components/macos/dock";
import { SafariFrame } from "@/components/frames/safari";
import { ChromeFrame } from "@/components/frames/chrome";
import { ArcFrame } from "@/components/frames/arc";
import { FRAMES, type FrameId } from "@/components/frames";
import { MacBookAir13 } from "@/components/macbook/macbook-air-13";
import { MacBookPro14 } from "@/components/macbook/macbook-pro-14";
import { MACBOOK_MODELS } from "@/components/macbook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sun, Moon, Download, Save, Upload, X, Laptop } from "lucide-react";

const DESK_ENVS = [
  { id: "wood-dark",   label: "Dark Wood",    bg: "radial-gradient(ellipse at 50% 100%,#2c1810 0%,#1a0f08 60%,#0d0805 100%)", surface: "linear-gradient(180deg,#3d2214,#2c1810)" },
  { id: "glass",       label: "Glass Desk",   bg: "radial-gradient(ellipse at 50% 100%,#1a2035 0%,#0f1420 60%,#080c14 100%)", surface: "linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))" },
  { id: "minimal",     label: "Minimal",      bg: "radial-gradient(ellipse at 50% 100%,#f5f5f7 0%,#e8e8ec 100%)",             surface: "linear-gradient(180deg,#ffffff,#f0f0f5)" },
  { id: "dark-studio", label: "Dark Studio",  bg: "radial-gradient(ellipse at 50% 80%,#0f0f14 0%,#060608 100%)",             surface: "linear-gradient(180deg,#1a1a22,#111116)" },
  { id: "floating",    label: "Floating",     bg: "transparent",                                                              surface: "transparent" },
];

const OUTER_BGS = [
  { id: "dark-1",   bg: "#0a0c10" },
  { id: "dark-2",   bg: "linear-gradient(135deg,#0f0c29,#302b63)" },
  { id: "purple",   bg: "linear-gradient(135deg,#1a0533,#3b0764)" },
  { id: "teal",     bg: "linear-gradient(135deg,#004d40,#00251a)" },
  { id: "light",    bg: "linear-gradient(135deg,#e8eaf6,#c5cae9)" },
  { id: "white",    bg: "#f5f5f7" },
];

const WALLPAPERS = [
  { id: "sonoma",    bg: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460,#533483)" },
  { id: "sequoia",   bg: "linear-gradient(160deg,#0d1b2a,#1b4332,#74c69d)" },
  { id: "slate",     bg: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)" },
  { id: "ventura",   bg: "linear-gradient(145deg,#667eea,#764ba2,#f093fb)" },
  { id: "dark",      bg: "#111113" },
  { id: "light",     bg: "linear-gradient(145deg,#e8eaf6,#c5cae9,#e3f2fd)" },
];

function renderFrame(id: FrameId, screenshot: string | null, url: string, mode: "dark"|"light") {
  const p = { screenshot, url, mode };
  if (id === "chrome")   return <ChromeFrame {...p} />;
  if (id === "arc")      return <ArcFrame   {...p} />;
  return                        <SafariFrame {...p} />;
}

function MacBookShell({ modelId, colorId, children }: { modelId: string; colorId: string; children: React.ReactNode }) {
  if (modelId === "pro-14" || modelId === "pro-16") {
    return <MacBookPro14 color={colorId as any}>{children}</MacBookPro14>;
  }
  return <MacBookAir13 color={colorId as any}>{children}</MacBookAir13>;
}

export function SceneEditor() {
  const [modelId, setModelId]       = useState("pro-14");
  const [colorId, setColorId]       = useState("spaceblack");
  const [deskEnv, setDeskEnv]       = useState(DESK_ENVS[0]);
  const [outerBg, setOuterBg]       = useState(OUTER_BGS[0]);
  const [dayNight, setDayNight]     = useState<"night"|"day">("night");
  const [wallpaper, setWallpaper]   = useState(WALLPAPERS[0]);
  const [frame, setFrame]           = useState<FrameId>("safari");
  const [mode, setMode]             = useState<"dark"|"light">("dark");
  const [url, setUrl]               = useState("https://yoursite.com");
  const [screenshot, setScreenshot] = useState<string|null>(null);
  const [dragging, setDragging]     = useState(false);
  const [exporting, setExporting]   = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileRef   = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      const file = e.clipboardData?.files[0];
      if (file?.type.startsWith("image/")) readFile(file);
    };
    window.addEventListener("paste", handler);
    return () => window.removeEventListener("paste", handler);
  }, []);

  const readFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setScreenshot(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) readFile(file);
  }, [readFile]);

  const handleExport = async (scale = 2) => {
    if (!canvasRef.current) return;
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(canvasRef.current, { scale, useCORS: true, allowTaint: true, backgroundColor: null, logging: false });
      const link = document.createElement("a");
      link.download = `mockx-scene-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setExporting(false);
    }
  };

  const currentModel = MACBOOK_MODELS.find(m => m.id === modelId)!;
  const isDay = dayNight === "day";
  const lightOverlay = isDay ? "rgba(255,200,100,0.04)" : "rgba(10,10,30,0.08)";

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* ── Left panel ── */}
      <aside className="w-64 shrink-0 bg-surface border-r border-white/7 flex flex-col overflow-y-auto">
        <div className="p-4 space-y-5">

          {/* MacBook model */}
          <section>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">MacBook Model</p>
            <div className="grid grid-cols-2 gap-1.5">
              {MACBOOK_MODELS.map(m => (
                <button key={m.id} onClick={() => { setModelId(m.id); setColorId(m.colors[0].id); }} className={`py-2 px-2 rounded-xl border text-left transition-all text-xs ${modelId === m.id ? "bg-accent/15 border-accent/30 text-accent" : "bg-surface-elevated border-white/7 text-text-secondary hover:border-white/15"}`}>
                  <div className="font-medium">{m.label}</div>
                  <div className="opacity-60 text-[10px]">{m.subtitle}</div>
                </button>
              ))}
            </div>
          </section>

          {/* Color */}
          <section>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">Color</p>
            <div className="flex gap-2">
              {currentModel.colors.map(col => (
                <button key={col.id} onClick={() => setColorId(col.id)} title={col.label} className={`w-7 h-7 rounded-full transition-all duration-150 ${colorId === col.id ? "ring-2 ring-accent ring-offset-1 ring-offset-surface scale-110" : "hover:scale-105"}`} style={{ background: col.hex, border: "1px solid rgba(255,255,255,0.1)" }} />
              ))}
            </div>
          </section>

          {/* Day / Night */}
          <section>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">Lighting</p>
            <div className="flex items-center gap-2 bg-surface-elevated rounded-xl p-1">
              {(["night","day"] as const).map(t => (
                <button key={t} onClick={() => setDayNight(t)} className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${dayNight === t ? "bg-accent text-white shadow" : "text-text-secondary hover:text-text-primary"}`}>
                  {t === "night" ? <Moon size={12}/> : <Sun size={12}/>}
                  {t === "night" ? "Night" : "Day"}
                </button>
              ))}
            </div>
          </section>

          {/* Desk environment */}
          <section>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">Desk Environment</p>
            <div className="grid grid-cols-2 gap-1.5">
              {DESK_ENVS.map(d => (
                <button key={d.id} onClick={() => setDeskEnv(d)} className={`py-2 px-2 rounded-xl border text-xs transition-all ${deskEnv.id === d.id ? "bg-accent/15 border-accent/30 text-accent" : "bg-surface-elevated border-white/7 text-text-secondary hover:border-white/15"}`}>
                  {d.label}
                </button>
              ))}
            </div>
          </section>

          {/* Outer background */}
          <section>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">Canvas Background</p>
            <div className="grid grid-cols-6 gap-1.5">
              {OUTER_BGS.map(b => (
                <button key={b.id} onClick={() => setOuterBg(b)} className={`aspect-square rounded-lg transition-all ${outerBg.id === b.id ? "ring-2 ring-accent ring-offset-1 ring-offset-surface" : "hover:scale-105"}`} style={{ background: b.bg, border: "1px solid rgba(255,255,255,0.08)" }} />
              ))}
            </div>
          </section>

          {/* Wallpaper */}
          <section>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">macOS Wallpaper</p>
            <div className="grid grid-cols-6 gap-1.5">
              {WALLPAPERS.map(w => (
                <button key={w.id} onClick={() => setWallpaper(w)} className={`aspect-square rounded-lg transition-all ${wallpaper.id === w.id ? "ring-2 ring-accent ring-offset-1 ring-offset-surface" : "hover:scale-105"}`} style={{ background: w.bg }} />
              ))}
            </div>
          </section>

          {/* App frame */}
          <section>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">App Frame</p>
            <div className="grid grid-cols-3 gap-1.5">
              {FRAMES.filter(f => f.supportsUrl || f.id === "vscode").map(f => (
                <button key={f.id} onClick={() => setFrame(f.id)} className={`py-2 px-1 rounded-xl border text-xs font-medium transition-all ${frame === f.id ? "bg-accent/15 border-accent/30 text-accent" : "bg-surface-elevated border-white/7 text-text-secondary hover:border-white/15"}`}>
                  {f.label}
                </button>
              ))}
            </div>
          </section>

          {/* URL */}
          <section>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">URL</p>
            <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://yoursite.com" className="text-xs" />
          </section>

          {/* Screenshot */}
          <section>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">Screenshot</p>
            <button
              onClick={() => fileRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`w-full border-2 border-dashed rounded-xl py-4 flex flex-col items-center gap-2 text-xs transition-all ${dragging ? "border-accent/60 bg-accent/5 text-accent" : "border-white/10 hover:border-white/20 text-text-secondary"}`}
            >
              <Upload size={16}/>
              <span>Drop, paste (⌘V) or click</span>
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) readFile(f); }} />
            {screenshot && (
              <button onClick={() => setScreenshot(null)} className="mt-1.5 w-full flex items-center justify-center gap-1.5 text-xs text-text-secondary hover:text-red-400 transition-colors py-1">
                <X size={12}/> Clear screenshot
              </button>
            )}
          </section>
        </div>

        <div className="p-4 border-t border-white/7 mt-auto">
          <Button variant="secondary" className="w-full text-xs gap-2"><Save size={13}/> Save Mockup</Button>
        </div>
      </aside>

      {/* ── Canvas ── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="h-12 border-b border-white/7 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <Laptop size={13}/>
            <span>Scene Mockup</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 bg-surface-elevated rounded-xl border border-white/7 p-0.5">
              {[1,2,3].map(s => (
                <button key={s} onClick={() => handleExport(s)} disabled={exporting} className="px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all disabled:opacity-40">{s}×</button>
              ))}
            </div>
            <Button size="sm" onClick={() => handleExport(2)} disabled={exporting} className="gap-1.5">
              <Download size={13}/>
              {exporting ? "Exporting…" : "Export PNG"}
            </Button>
          </div>
        </div>

        <div
          className="flex-1 overflow-auto editor-canvas flex items-center justify-center p-12"
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          {/* Outer background */}
          <div
            ref={canvasRef}
            className="relative overflow-hidden"
            style={{
              background: outerBg.bg,
              borderRadius: 20,
              width: "min(960px, 100%)",
              minHeight: 540,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              padding: "60px 60px 0",
              boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
            }}
          >
            {/* Ambient light overlay */}
            {isDay
              ? <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% -20%,rgba(255,200,100,0.12),transparent 60%)",pointerEvents:"none" }}/>
              : <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% -20%,rgba(80,60,200,0.08),transparent 60%)",pointerEvents:"none" }}/>
            }

            {/* Desk surface */}
            {deskEnv.surface !== "transparent" && (
              <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"30%",background:deskEnv.surface,borderTop:"1px solid rgba(255,255,255,0.04)" }}/>
            )}

            {/* MacBook */}
            <div style={{ position:"relative",zIndex:2,width:"78%" }}>
              <MacBookShell modelId={modelId} colorId={colorId}>
                {/* macOS desktop inside screen */}
                <div style={{ width:"100%",height:"100%",background:wallpaper.bg,display:"flex",flexDirection:"column",position:"relative",overflow:"hidden" }}>
                  <MacOSMenuBar mode={mode}/>
                  <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"12px 16px 60px",position:"relative" }}>
                    <div style={{ width:"90%" }}>
                      {renderFrame(frame, screenshot, url, mode)}
                    </div>
                  </div>
                  <MacOSDock mode={mode}/>
                </div>
              </MacBookShell>

              {/* Reflection / shadow under laptop */}
              <div style={{ position:"absolute",bottom:-12,left:"10%",right:"10%",height:20,background:"radial-gradient(ellipse,rgba(0,0,0,0.5) 0%,transparent 70%)",filter:"blur(8px)",zIndex:-1 }}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
