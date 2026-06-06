"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { MacOSMenuBar } from "@/components/macos/menubar";
import { MacOSDock }    from "@/components/macos/dock";
import { SafariFrame }  from "@/components/frames/safari";
import { ChromeFrame }  from "@/components/frames/chrome";
import { ArcFrame }     from "@/components/frames/arc";
import { FirefoxFrame } from "@/components/frames/firefox";
import { VSCodeFrame }   from "@/components/frames/vscode";
import { FinderFrame }   from "@/components/frames/finder";
import { TerminalFrame } from "@/components/frames/terminal";
import { FigmaFrame }    from "@/components/frames/figma";
import { NotionFrame }   from "@/components/frames/notion";
import { XcodeFrame }    from "@/components/frames/xcode";
import { LinearFrame }   from "@/components/frames/linear";
import { SlackFrame }    from "@/components/frames/slack";
import { DiscordFrame }  from "@/components/frames/discord";
import { FRAMES, type FrameId } from "@/components/frames";
import { MacBookAir13 } from "@/components/macbook/macbook-air-13";
import { MacBookAir15 } from "@/components/macbook/macbook-air-15";
import { MacBookPro14 } from "@/components/macbook/macbook-pro-14";
import { MacBookPro16 } from "@/components/macbook/macbook-pro-16";
import { MACBOOK_MODELS } from "@/components/macbook";
import { UpgradeModal }  from "@/components/pro/upgrade-modal";
import { Button } from "@/components/ui/button";
import { CustomUploadButton } from "@/components/editor/custom-upload-button";
import { Input }  from "@/components/ui/input";
import { Sun, Moon, Download, Save, Upload, X, Laptop, Check, Loader2, Zap } from "lucide-react";

const DESK_ENVS = [
  { id: "wood-dark",   label: "Dark Wood",   bg: "radial-gradient(ellipse at 50% 100%,#2c1810 0%,#1a0f08 60%,#0d0805 100%)", surface: "linear-gradient(180deg,#3d2214,#2c1810)" },
  { id: "glass",       label: "Glass Desk",  bg: "radial-gradient(ellipse at 50% 100%,#1a2035 0%,#0f1420 60%,#080c14 100%)", surface: "linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))" },
  { id: "minimal",     label: "Minimal",     bg: "radial-gradient(ellipse at 50% 100%,#f5f5f7 0%,#e8e8ec 100%)",             surface: "linear-gradient(180deg,#ffffff,#f0f0f5)" },
  { id: "dark-studio", label: "Dark Studio", bg: "radial-gradient(ellipse at 50% 80%,#0f0f14 0%,#060608 100%)",             surface: "linear-gradient(180deg,#1a1a22,#111116)" },
  { id: "floating",    label: "Floating",    bg: "transparent",                                                              surface: "transparent" },
];

const OUTER_BGS = [
  { id: "dark-1",  bg: "#0a0c10" },
  { id: "dark-2",  bg: "linear-gradient(135deg,#0f0c29,#302b63)" },
  { id: "purple",  bg: "linear-gradient(135deg,#1a0533,#3b0764)" },
  { id: "teal",    bg: "linear-gradient(135deg,#004d40,#00251a)" },
  { id: "light",   bg: "linear-gradient(135deg,#e8eaf6,#c5cae9)" },
  { id: "white",   bg: "#f5f5f7" },
];

const WALLPAPERS = [
  { id: "sonoma",  bg: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460,#533483)" },
  { id: "sequoia", bg: "linear-gradient(160deg,#0d1b2a,#1b4332,#74c69d)" },
  { id: "slate",   bg: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)" },
  { id: "ventura", bg: "linear-gradient(145deg,#667eea,#764ba2,#f093fb)" },
  { id: "dark",    bg: "#111113" },
  { id: "light",   bg: "linear-gradient(145deg,#e8eaf6,#c5cae9,#e3f2fd)" },
];

function isPro(role: string) { return role === "pro" || role === "admin"; }

function renderFrame(id: FrameId, screenshot: string|null, url: string, mode: "dark"|"light") {
  const p = { screenshot, url, mode };
  switch (id) {
    case "safari":   return <SafariFrame   {...p} />;
    case "chrome":   return <ChromeFrame   {...p} />;
    case "arc":      return <ArcFrame      {...p} />;
    case "firefox":  return <FirefoxFrame  {...p} />;
    case "vscode":   return <VSCodeFrame   screenshot={p.screenshot} mode={p.mode} />;
    case "finder":   return <FinderFrame   screenshot={p.screenshot} mode={p.mode} />;
    case "terminal": return <TerminalFrame screenshot={p.screenshot} mode={p.mode} />;
    case "figma":    return <FigmaFrame    screenshot={p.screenshot} mode={p.mode} />;
    case "notion":   return <NotionFrame   screenshot={p.screenshot} mode={p.mode} />;
    case "xcode":    return <XcodeFrame    screenshot={p.screenshot} mode={p.mode} />;
    case "linear":   return <LinearFrame   screenshot={p.screenshot} mode={p.mode} />;
    case "slack":    return <SlackFrame    screenshot={p.screenshot} mode={p.mode} />;
    case "discord":  return <DiscordFrame  screenshot={p.screenshot} mode={p.mode} />;
    default:         return <SafariFrame   {...p} />;
  }
}

function MacBookShell({ modelId, colorId, children }: { modelId: string; colorId: string; children: React.ReactNode }) {
  if (modelId === "pro-16") return <MacBookPro16 color={colorId as "spaceblack"|"silver"}>{children}</MacBookPro16>;
  if (modelId === "pro-14") return <MacBookPro14 color={colorId as "spaceblack"|"silver"}>{children}</MacBookPro14>;
  if (modelId === "air-15") return <MacBookAir15 color={colorId as "silver"|"starlight"|"midnight"|"skyblue"}>{children}</MacBookAir15>;
  return                           <MacBookAir13 color={colorId as "silver"|"starlight"|"midnight"|"skyblue"}>{children}</MacBookAir13>;
}

export interface SceneConfig {
  modelId: string; colorId: string; deskEnvId: string; outerBgId: string;
  dayNight: "night"|"day"; wallpaperId: string; frame: FrameId;
  mode: "dark"|"light"; url: string; screenshot: string|null;
}

interface SceneEditorProps {
  mockupId?: string;
  initialConfig?: SceneConfig;
  userRole?: string;
}

export function SceneEditor({ mockupId, initialConfig, userRole = "user" }: SceneEditorProps) {
  const [modelId,     setModelId]     = useState(initialConfig?.modelId     ?? "pro-14");
  const [colorId,     setColorId]     = useState(initialConfig?.colorId     ?? "spaceblack");
  const [deskEnvId,   setDeskEnvId]   = useState(initialConfig?.deskEnvId   ?? DESK_ENVS[0].id);
  const [outerBgId,   setOuterBgId]   = useState(initialConfig?.outerBgId   ?? OUTER_BGS[0].id);
  const [dayNight,    setDayNight]    = useState<"night"|"day">(initialConfig?.dayNight ?? "night");
  const [wallpaperId, setWallpaperId] = useState(initialConfig?.wallpaperId ?? WALLPAPERS[0].id);
  const [frame,       setFrame]       = useState<FrameId>(initialConfig?.frame ?? "safari");
  const [mode,        setMode]        = useState<"dark"|"light">(initialConfig?.mode ?? "dark");
  const [url,         setUrl]         = useState(initialConfig?.url         ?? "https://yoursite.com");
  const [screenshot,  setScreenshot]  = useState<string|null>(initialConfig?.screenshot ?? null);
  const [customBg,    setCustomBg]    = useState<string|null>(null);
  const [dragging,    setDragging]    = useState(false);
  const [exporting,   setExporting]   = useState(false);
  const [saveState,   setSaveState]   = useState<"idle"|"saving"|"saved"|"error">("idle");
  const [mockupTitle, setMockupTitle] = useState("");
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [upgradeTrigger, setUpgradeTrigger] = useState("");

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileRef   = useRef<HTMLInputElement>(null);
  const actionsRef = useRef({ handleSave: () => {}, handleExport: (_s: number) => {} });

  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      const file = e.clipboardData?.files[0];
      if (file?.type.startsWith("image/")) readFile(file);
    };
    window.addEventListener("paste", handler);
    return () => window.removeEventListener("paste", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (!meta) return;
      if (e.key === "s") { e.preventDefault(); actionsRef.current.handleSave(); }
      if (e.key === "e") { e.preventDefault(); actionsRef.current.handleExport(2); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []); // stable — reads through actionsRef

  const readFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setScreenshot(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) readFile(file);
  }, [readFile]);

  const handleExport = async (scale: number) => {
    if (!canvasRef.current) return;
    if (scale === 3 && !isPro(userRole)) {
      setUpgradeTrigger("3× export"); setUpgradeOpen(true); return;
    }

    setExporting(true);
    const canvas = canvasRef.current;

    let watermark: HTMLDivElement | null = null;
    if (!isPro(userRole)) {
      watermark = document.createElement("div");
      watermark.style.cssText = `
        position:absolute;bottom:14px;right:16px;z-index:9999;
        font-family:-apple-system,BlinkMacSystemFont,sans-serif;
        font-size:11px;font-weight:600;letter-spacing:0.02em;
        color:rgba(255,255,255,0.55);background:rgba(0,0,0,0.35);
        padding:3px 8px;border-radius:6px;pointer-events:none;
      `;
      watermark.textContent = "Made with mockX";
      canvas.appendChild(watermark);
    }

    try {
      const html2canvas = (await import("html2canvas")).default;
      const c = await html2canvas(canvas, { scale, useCORS: true, allowTaint: true, backgroundColor: null, logging: false });
      const link = document.createElement("a");
      link.download = `mockx-scene-${Date.now()}.png`;
      link.href = c.toDataURL("image/png");
      link.click();
    } finally {
      watermark?.remove();
      setExporting(false);
    }
  };

  const handleSave = async () => {
    setSaveState("saving");
    try {
      const config: SceneConfig = { modelId, colorId, deskEnvId, outerBgId, dayNight, wallpaperId, frame, mode, url, screenshot };
      // Generate thumbnail from canvas
      let thumbnailUrl: string | null = null;
      if (canvasRef.current) {
        const { generateThumbnail } = await import("@/lib/thumbnail");
        thumbnailUrl = await generateThumbnail(canvasRef.current);
      }
      const method = mockupId ? "PATCH" : "POST";
      const apiUrl = mockupId ? `/api/mockups/${mockupId}` : "/api/mockups";
      const res = await fetch(apiUrl, {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "scene", title: mockupTitle || null, config, thumbnailUrl }),
      });
      if (res.status === 403) { setSaveState("idle"); setUpgradeTrigger("Unlimited saves"); setUpgradeOpen(true); return; }
      if (!res.ok) throw new Error();
      setSaveState("saved"); setTimeout(() => setSaveState("idle"), 2500);
    } catch {
      setSaveState("error"); setTimeout(() => setSaveState("idle"), 2500);
    }
  };

  const pro = isPro(userRole);
  const currentFrame = FRAMES.find(f => f.id === frame) ?? FRAMES[0];
  const currentModel = MACBOOK_MODELS.find(m => m.id === modelId)!;

  actionsRef.current.handleSave   = handleSave;
  actionsRef.current.handleExport = handleExport;
  const deskEnv  = DESK_ENVS.find(d => d.id === deskEnvId)  ?? DESK_ENVS[0];
  const outerBg  = OUTER_BGS.find(b => b.id === outerBgId)  ?? OUTER_BGS[0];
  const wallpaper = WALLPAPERS.find(w => w.id === wallpaperId) ?? WALLPAPERS[0];
  const isDay = dayNight === "day";

  return (
    <>
      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} trigger={upgradeTrigger} />

      <div className="flex h-[calc(100vh-56px)]">
        <aside className="w-64 shrink-0 bg-surface border-r border-white/7 flex flex-col overflow-y-auto">
          <div className="p-4 space-y-5">

            <section>
              <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">MacBook Model</p>
              <div className="grid grid-cols-2 gap-1.5">
                {MACBOOK_MODELS.map(m => (
                  <button key={m.id} onClick={() => { setModelId(m.id); setColorId(m.colors[0].id); }} className={`py-2 px-2 rounded-xl border text-left transition-all text-xs ${modelId === m.id ? "bg-accent/15 border-accent/30 text-accent" : "bg-surface-elevated border-white/7 text-text-secondary hover:border-white/15"}`}>
                    <div className="font-medium truncate">{m.label}</div>
                    <div className="opacity-60 text-[10px]">{m.subtitle}</div>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">Color</p>
              <div className="flex gap-2">
                {currentModel.colors.map(col => (
                  <button key={col.id} onClick={() => setColorId(col.id)} title={col.label} className={`w-7 h-7 rounded-full transition-all ${colorId === col.id ? "ring-2 ring-accent ring-offset-1 ring-offset-surface scale-110" : "hover:scale-105"}`} style={{ background: col.hex, border: "1px solid rgba(255,255,255,0.1)" }} />
                ))}
              </div>
            </section>

            <section>
              <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">Lighting</p>
              <div className="flex items-center gap-2 bg-surface-elevated rounded-xl p-1">
                {(["night","day"] as const).map(t => (
                  <button key={t} onClick={() => setDayNight(t)} className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${dayNight === t ? "bg-accent text-white shadow" : "text-text-secondary hover:text-text-primary"}`}>
                    {t === "night" ? <Moon size={12}/> : <Sun size={12}/>}
                    {t === "night" ? "Night" : "Day"}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">Desk Environment</p>
              <div className="grid grid-cols-2 gap-1.5">
                {DESK_ENVS.map(d => (
                  <button key={d.id} onClick={() => setDeskEnvId(d.id)} className={`py-2 px-2 rounded-xl border text-xs transition-all ${deskEnvId === d.id ? "bg-accent/15 border-accent/30 text-accent" : "bg-surface-elevated border-white/7 text-text-secondary hover:border-white/15"}`}>
                    {d.label}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">Canvas Background</p>
              <div className="grid grid-cols-6 gap-1.5">
                {OUTER_BGS.map(b => (
                  <button key={b.id} onClick={() => setOuterBgId(b.id)} className={`aspect-square rounded-lg transition-all ${outerBgId === b.id ? "ring-2 ring-accent ring-offset-1 ring-offset-surface" : "hover:scale-105"}`} style={{ background: b.bg, border: "1px solid rgba(255,255,255,0.08)" }} />
                ))}
              </div>
            </section>

            <section>
              <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">macOS Wallpaper</p>
              <div className="grid grid-cols-6 gap-1.5">
                {WALLPAPERS.map(w => (
                  <button key={w.id} onClick={() => setWallpaperId(w.id)} className={`aspect-square rounded-lg transition-all ${wallpaperId === w.id ? "ring-2 ring-accent ring-offset-1 ring-offset-surface" : "hover:scale-105"}`} style={{ background: w.bg }} />
                ))}
              </div>
            </section>

            <section>
              <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">App Frame</p>
              <div className="grid grid-cols-4 gap-1.5">
                {FRAMES.map(f => (
                  <button key={f.id} onClick={() => setFrame(f.id)} className={`py-2 px-1 rounded-xl border text-xs font-medium transition-all ${frame === f.id ? "bg-accent/15 border-accent/30 text-accent" : "bg-surface-elevated border-white/7 text-text-secondary hover:border-white/15"}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">Screen Mode</p>
              <div className="flex items-center gap-2 bg-surface-elevated rounded-xl p-1">
                {(["dark","light"] as const).map(m => (
                  <button key={m} onClick={() => setMode(m)} className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${mode === m ? "bg-accent text-white shadow" : "text-text-secondary hover:text-text-primary"}`}>
                    {m === "dark" ? <Moon size={12}/> : <Sun size={12}/>}
                    {m === "dark" ? "Dark" : "Light"}
                  </button>
                ))}
              </div>
            </section>

            {currentFrame.supportsUrl && (
              <section>
                <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">URL</p>
                <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://yoursite.com" className="text-xs" />
              </section>
            )}

            <section>
              <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">Screenshot</p>
              <button onClick={() => fileRef.current?.click()} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop} className={`w-full border-2 border-dashed rounded-xl py-4 flex flex-col items-center gap-2 text-xs transition-all ${dragging ? "border-accent/60 bg-accent/5 text-accent" : "border-white/10 hover:border-white/20 text-text-secondary"}`}>
                <Upload size={16}/><span>Drop, paste (⌘V) or click</span>
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) readFile(f); }} />
              {screenshot && (
                <button onClick={() => setScreenshot(null)} className="mt-1.5 w-full flex items-center justify-center gap-1.5 text-xs text-text-secondary hover:text-red-400 transition-colors py-1">
                  <X size={12}/> Clear
                </button>
              )}
            </section>
          </div>

          <div className="p-4 border-t border-white/7 mt-auto space-y-2">
            <Input value={mockupTitle} onChange={e => setMockupTitle(e.target.value)} placeholder="Mockup title (optional)" className="text-xs" />
            <Button variant={saveState === "saved" ? "secondary" : "primary"} className="w-full text-xs gap-2" onClick={handleSave} disabled={saveState === "saving"}>
              {saveState === "saving" ? <Loader2 size={12} className="animate-spin"/> : saveState === "saved" ? <Check size={12}/> : <Save size={12}/>}
              {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved!" : saveState === "error" ? "Error — retry" : "Save Mockup"}
            </Button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="h-12 border-b border-white/7 flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <Laptop size={13}/><span>Scene Mockup</span>
              {mockupId && <span className="text-accent">· Editing</span>}
              <span className="hidden sm:inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-md bg-surface-elevated border border-white/7 text-[10px] text-text-secondary font-mono">⌘S</span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-elevated border border-white/7 text-[10px] text-text-secondary font-mono">⌘E</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 bg-surface-elevated rounded-xl border border-white/7 p-0.5">
                {[1,2,3].map(s => (
                  <button key={s} onClick={() => handleExport(s)} disabled={exporting} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-40 relative ${s === 3 && !pro ? "text-text-secondary/50" : "text-text-secondary hover:text-text-primary hover:bg-white/5"}`}>
                    {s}×{s === 3 && !pro && <Zap size={7} className="absolute -top-0.5 -right-0.5 text-accent"/>}
                  </button>
                ))}
              </div>
              <Button size="sm" onClick={() => handleExport(2)} disabled={exporting} className="gap-1.5">
                <Download size={13}/>{exporting ? "Exporting…" : "Export PNG"}
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto editor-canvas flex items-center justify-center p-12" onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop}>
            <div ref={canvasRef} className="relative overflow-hidden" style={{ background: customBg ? `url(${customBg}) center/cover no-repeat` : outerBg.bg, borderRadius: 20, width: "min(960px,100%)", minHeight: 520, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "52px 52px 0", boxShadow: "0 40px 100px rgba(0,0,0,0.7)" }}>
              <div style={{ position:"absolute",inset:0,background:isDay?"radial-gradient(ellipse at 50% -20%,rgba(255,200,100,0.14),transparent 65%)":"radial-gradient(ellipse at 50% -20%,rgba(80,60,200,0.1),transparent 65%)",pointerEvents:"none" }}/>
              {deskEnv.surface !== "transparent" && <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"32%",background:deskEnv.surface,borderTop:"1px solid rgba(255,255,255,0.04)" }}/>}
              <div style={{ position:"relative",zIndex:2,width:"76%" }}>
                <MacBookShell modelId={modelId} colorId={colorId}>
                  <div style={{ width:"100%",height:"100%",background:wallpaper.bg,display:"flex",flexDirection:"column",position:"relative",overflow:"hidden" }}>
                    <MacOSMenuBar mode={mode}/>
                    <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"10px 14px 56px" }}>
                      <div style={{ width:"88%" }}>{renderFrame(frame, screenshot, url, mode)}</div>
                    </div>
                    <MacOSDock mode={mode}/>
                  </div>
                </MacBookShell>
                <div style={{ position:"absolute",bottom:-14,left:"8%",right:"8%",height:22,background:"radial-gradient(ellipse,rgba(0,0,0,0.55) 0%,transparent 70%)",filter:"blur(8px)",zIndex:-1 }}/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
