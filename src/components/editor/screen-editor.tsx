"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { MacOSMenuBar } from "@/components/macos/menubar";
import { MacOSDock } from "@/components/macos/dock";
import { SafariFrame }   from "@/components/frames/safari";
import { ChromeFrame }   from "@/components/frames/chrome";
import { ArcFrame }      from "@/components/frames/arc";
import { FirefoxFrame }  from "@/components/frames/firefox";
import { VSCodeFrame }   from "@/components/frames/vscode";
import { FinderFrame }   from "@/components/frames/finder";
import { TerminalFrame } from "@/components/frames/terminal";
import { FRAMES, type FrameId } from "@/components/frames";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";
import {
  Monitor, Sun, Moon, Download, Save,
  Upload, ToggleLeft, ToggleRight, X,
  Plus, Minus, Check, Loader2,
} from "lucide-react";

/* ─── types ─────────────────────────────────────────────────── */
export interface ScreenWindow {
  id: string;
  screenshot: string | null;
  url: string;
  title: string;
}

export interface ScreenConfig {
  frame: FrameId;
  wallpaperId: string;
  mode: "dark" | "light";
  showDock: boolean;
  windows: ScreenWindow[];
}

/* ─── constants ──────────────────────────────────────────────── */
const WALLPAPERS = [
  { id: "sonoma-dark",   bg: "linear-gradient(135deg,#1a1a2e 0%,#16213e 30%,#0f3460 60%,#533483 100%)" },
  { id: "sequoia",       bg: "linear-gradient(160deg,#0d1b2a 0%,#1b4332 35%,#2d6a4f 65%,#74c69d 100%)" },
  { id: "slate",         bg: "linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)" },
  { id: "ventura",       bg: "linear-gradient(145deg,#667eea 0%,#764ba2 50%,#f093fb 100%)" },
  { id: "dark-solid",    bg: "#111113" },
  { id: "light-clouds",  bg: "linear-gradient(145deg,#e8eaf6,#c5cae9,#e3f2fd)" },
  { id: "sunrise",       bg: "linear-gradient(135deg,#f9a825,#f57f17,#e64a19)" },
  { id: "ocean",         bg: "linear-gradient(180deg,#0077b6,#023e8a,#03045e)" },
];

function getWallpaper(id: string) {
  return WALLPAPERS.find(w => w.id === id) ?? WALLPAPERS[0];
}

function newWindow(): ScreenWindow {
  return { id: Math.random().toString(36).slice(2), screenshot: null, url: "https://yoursite.com", title: "" };
}

/* ─── frame renderer ─────────────────────────────────────────── */
function renderFrame(id: FrameId, win: ScreenWindow, mode: "dark"|"light") {
  const p = { screenshot: win.screenshot, url: win.url, title: win.title, mode };
  switch (id) {
    case "safari":   return <SafariFrame   {...p} />;
    case "chrome":   return <ChromeFrame   {...p} />;
    case "arc":      return <ArcFrame      {...p} />;
    case "firefox":  return <FirefoxFrame  {...p} />;
    case "vscode":   return <VSCodeFrame   screenshot={p.screenshot} title={p.title} mode={p.mode} />;
    case "finder":   return <FinderFrame   screenshot={p.screenshot} title={p.title} mode={p.mode} />;
    case "terminal": return <TerminalFrame screenshot={p.screenshot} title={p.title} mode={p.mode} />;
    default:         return <SafariFrame   {...p} />;
  }
}

/* ─── component ──────────────────────────────────────────────── */
interface ScreenEditorProps {
  mockupId?: string;
  initialConfig?: ScreenConfig;
}

export function ScreenEditor({ mockupId, initialConfig }: ScreenEditorProps) {
  const [frame, setFrame]         = useState<FrameId>(initialConfig?.frame ?? "safari");
  const [wallpaper, setWallpaper] = useState(getWallpaper(initialConfig?.wallpaperId ?? "sonoma-dark"));
  const [mode, setMode]           = useState<"dark"|"light">(initialConfig?.mode ?? "dark");
  const [showDock, setShowDock]   = useState(initialConfig?.showDock ?? true);
  const [windows, setWindows]     = useState<ScreenWindow[]>(initialConfig?.windows ?? [newWindow()]);
  const [activeWin, setActiveWin] = useState(0);
  const [dragging, setDragging]   = useState(false);
  const [exporting, setExporting] = useState(false);
  const [saveState, setSaveState] = useState<"idle"|"saving"|"saved"|"error">("idle");
  const [mockupTitle, setMockupTitle] = useState("");

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileRef   = useRef<HTMLInputElement>(null);

  /* paste anywhere */
  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      const file = e.clipboardData?.files[0];
      if (file?.type.startsWith("image/")) readFile(file);
    };
    window.addEventListener("paste", handler);
    return () => window.removeEventListener("paste", handler);
  }, [activeWin]);

  const readFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setWindows(prev => prev.map((w, i) => i === activeWin ? { ...w, screenshot: e.target?.result as string } : w));
    };
    reader.readAsDataURL(file);
  }, [activeWin]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) readFile(file);
  }, [readFile]);

  const updateWindow = (idx: number, patch: Partial<ScreenWindow>) => {
    setWindows(prev => prev.map((w, i) => i === idx ? { ...w, ...patch } : w));
  };

  const addWindow = () => {
    if (windows.length >= 3) return;
    setWindows(prev => [...prev, newWindow()]);
    setActiveWin(windows.length);
  };

  const removeWindow = (idx: number) => {
    if (windows.length <= 1) return;
    setWindows(prev => prev.filter((_, i) => i !== idx));
    setActiveWin(Math.max(0, activeWin - 1));
  };

  const handleExport = async (scale = 2) => {
    if (!canvasRef.current) return;
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(canvasRef.current, { scale, useCORS: true, allowTaint: true, backgroundColor: null, logging: false });
      const link = document.createElement("a");
      link.download = `mockx-screen-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setExporting(false);
    }
  };

  const handleSave = async () => {
    setSaveState("saving");
    try {
      const config: ScreenConfig = { frame, wallpaperId: wallpaper.id, mode, showDock, windows };
      const method = mockupId ? "PATCH" : "POST";
      const url    = mockupId ? `/api/mockups/${mockupId}` : "/api/mockups";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "screen", title: mockupTitle || null, config }),
      });
      if (!res.ok) throw new Error();
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    } catch {
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 2500);
    }
  };

  const currentFrame = FRAMES.find(f => f.id === frame)!;
  const win = windows[activeWin] ?? windows[0];

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* ── Left panel ── */}
      <aside className="w-64 shrink-0 bg-surface border-r border-white/7 flex flex-col overflow-y-auto">
        <div className="p-4 space-y-5">

          {/* macOS mode */}
          <section>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">macOS Mode</p>
            <div className="flex items-center gap-2 bg-surface-elevated rounded-xl p-1">
              {(["dark","light"] as const).map(m => (
                <button key={m} onClick={() => setMode(m)} className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${mode === m ? "bg-accent text-white shadow" : "text-text-secondary hover:text-text-primary"}`}>
                  {m === "dark" ? <Moon size={12}/> : <Sun size={12}/>}
                  {m === "dark" ? "Dark" : "Light"}
                </button>
              ))}
            </div>
          </section>

          {/* Wallpaper */}
          <section>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">Wallpaper</p>
            <div className="grid grid-cols-4 gap-1.5">
              {WALLPAPERS.map(w => (
                <button key={w.id} onClick={() => setWallpaper(w)} title={w.id} className={`aspect-square rounded-lg transition-all duration-150 ${wallpaper.id === w.id ? "ring-2 ring-accent ring-offset-1 ring-offset-surface" : "hover:scale-105"}`} style={{ background: w.bg }} />
              ))}
            </div>
          </section>

          {/* App frame */}
          <section>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">App Frame</p>
            <div className="grid grid-cols-3 gap-1.5">
              {FRAMES.map(f => (
                <button key={f.id} onClick={() => setFrame(f.id)} className={`py-2 px-1 rounded-xl text-xs font-medium transition-all border ${frame === f.id ? "bg-accent/15 border-accent/30 text-accent" : "bg-surface-elevated border-white/7 text-text-secondary hover:text-text-primary hover:border-white/15"}`}>
                  {f.label}
                </button>
              ))}
            </div>
          </section>

          {/* Windows */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] uppercase tracking-widest text-text-secondary font-medium">Windows ({windows.length}/3)</p>
              {windows.length < 3 && (
                <button onClick={addWindow} className="flex items-center gap-1 text-[10px] text-accent hover:text-accent-hover transition-colors">
                  <Plus size={10}/> Add
                </button>
              )}
            </div>
            <div className="space-y-1.5">
              {windows.map((w, i) => (
                <div key={w.id} onClick={() => setActiveWin(i)} className={`flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer transition-all ${activeWin === i ? "bg-accent/10 border-accent/25" : "bg-surface-elevated border-white/7 hover:border-white/15"}`}>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${activeWin === i ? "bg-accent text-white" : "bg-white/8 text-text-secondary"}`}>{i + 1}</div>
                  <span className="text-xs text-text-secondary truncate flex-1">{w.url.replace(/^https?:\/\//, "") || "Window"}</span>
                  {windows.length > 1 && (
                    <button onClick={e => { e.stopPropagation(); removeWindow(i); }} className="text-text-secondary hover:text-red-400 transition-colors">
                      <X size={11}/>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* URL / Title for active window */}
          <section>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">
              {currentFrame.supportsUrl ? "URL" : "Window Title"} — Window {activeWin + 1}
            </p>
            <Input
              value={currentFrame.supportsUrl ? win.url : win.title}
              onChange={e => updateWindow(activeWin, currentFrame.supportsUrl ? { url: e.target.value } : { title: e.target.value })}
              placeholder={currentFrame.supportsUrl ? "https://yoursite.com" : "Window title"}
              className="text-xs"
            />
          </section>

          {/* Screenshot upload */}
          <section>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">Screenshot — Window {activeWin + 1}</p>
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
            {win.screenshot && (
              <button onClick={() => updateWindow(activeWin, { screenshot: null })} className="mt-1.5 w-full flex items-center justify-center gap-1.5 text-xs text-text-secondary hover:text-red-400 transition-colors py-1">
                <X size={12}/> Clear
              </button>
            )}
          </section>

          {/* Dock toggle */}
          <section>
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-widest text-text-secondary font-medium">Dock</p>
              <button onClick={() => setShowDock(v => !v)} className="text-text-secondary hover:text-text-primary transition-colors">
                {showDock ? <ToggleRight size={18} className="text-accent"/> : <ToggleLeft size={18}/>}
              </button>
            </div>
          </section>
        </div>

        {/* Save section */}
        <div className="p-4 border-t border-white/7 mt-auto space-y-2">
          <Input value={mockupTitle} onChange={e => setMockupTitle(e.target.value)} placeholder="Mockup title (optional)" className="text-xs" />
          <Button
            variant={saveState === "saved" ? "secondary" : "primary"}
            className="w-full text-xs gap-2"
            onClick={handleSave}
            disabled={saveState === "saving"}
          >
            {saveState === "saving" && <Loader2 size={12} className="animate-spin"/>}
            {saveState === "saved"  && <Check size={12}/>}
            {saveState === "error"  && <X size={12}/>}
            {saveState === "idle"   && <Save size={12}/>}
            {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved!" : saveState === "error" ? "Error — retry" : "Save Mockup"}
          </Button>
        </div>
      </aside>

      {/* ── Canvas ── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="h-12 border-b border-white/7 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <Monitor size={13}/>
            <span>Screen Mockup</span>
            {mockupId && <span className="text-accent">· Editing</span>}
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

        {/* Canvas */}
        <div className="flex-1 overflow-auto editor-canvas flex items-center justify-center p-8" onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop}>
          <div
            ref={canvasRef}
            style={{
              background: wallpaper.bg,
              borderRadius: 12,
              overflow: "hidden",
              position: "relative",
              width: "min(900px,100%)",
              aspectRatio: "16/10",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
            }}
          >
            <MacOSMenuBar mode={mode}/>
            <div className="flex-1 relative" style={{ paddingBottom: showDock ? 72 : 8 }}>
              {/* Stacked windows — rendered back to front */}
              {windows.map((w, i) => {
                const isActive = i === activeWin;
                const offset   = (windows.length - 1 - i) * 18;
                return (
                  <div
                    key={w.id}
                    onClick={() => setActiveWin(i)}
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: `${16 + offset}px ${24 + offset}px`,
                      zIndex: isActive ? windows.length : i,
                      transition: "all 0.2s ease",
                      cursor: isActive ? "default" : "pointer",
                      filter: isActive ? "none" : `brightness(0.6) blur(0.5px)`,
                      transform: isActive ? "none" : `scale(${0.96 - (windows.length - 1 - i) * 0.02}) translateY(${(windows.length - 1 - i) * 6}px)`,
                    }}
                  >
                    <div style={{ width: "100%", maxWidth: 720 }}>
                      {renderFrame(frame, w, mode)}
                    </div>
                  </div>
                );
              })}
            </div>
            {showDock && <MacOSDock mode={mode} activeApp={frame === "safari" ? "Safari" : "Finder"}/>}
          </div>
        </div>
      </main>
    </div>
  );
}
