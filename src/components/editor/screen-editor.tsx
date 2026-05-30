"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { MacOSMenuBar } from "@/components/macos/menubar";
import { MacOSDock } from "@/components/macos/dock";
import { SafariFrame } from "@/components/frames/safari";
import { ChromeFrame } from "@/components/frames/chrome";
import { ArcFrame } from "@/components/frames/arc";
import { VSCodeFrame } from "@/components/frames/vscode";
import { FinderFrame } from "@/components/frames/finder";
import { TerminalFrame } from "@/components/frames/terminal";
import { FRAMES, type FrameId } from "@/components/frames";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Monitor, Sun, Moon, Download, Save, Upload,
  ToggleLeft, ToggleRight, ChevronDown, X
} from "lucide-react";

const WALLPAPERS = [
  { id: "sonoma-dark",   label: "Sonoma Dusk",    bg: "linear-gradient(135deg,#1a1a2e 0%,#16213e 30%,#0f3460 60%,#533483 100%)" },
  { id: "sequoia",       label: "Sequoia",         bg: "linear-gradient(160deg,#0d1b2a 0%,#1b4332 35%,#2d6a4f 65%,#74c69d 100%)" },
  { id: "slate",         label: "M4 Slate",        bg: "linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)" },
  { id: "ventura",       label: "Ventura Mist",    bg: "linear-gradient(145deg,#667eea 0%,#764ba2 50%,#f093fb 100%)" },
  { id: "dark-solid",    label: "Pure Dark",       bg: "#111113" },
  { id: "light-clouds",  label: "Light Clouds",    bg: "linear-gradient(145deg,#e8eaf6,#c5cae9,#e3f2fd)" },
  { id: "sunrise",       label: "Sunrise",         bg: "linear-gradient(135deg,#f9a825,#f57f17,#e64a19)" },
  { id: "ocean",         label: "Deep Ocean",      bg: "linear-gradient(180deg,#0077b6,#023e8a,#03045e)" },
];

function renderFrame(
  id: FrameId,
  screenshot: string | null,
  url: string,
  title: string,
  mode: "dark" | "light"
) {
  const props = { screenshot, url, title, mode };
  switch (id) {
    case "safari":   return <SafariFrame   {...props} />;
    case "chrome":   return <ChromeFrame   {...props} />;
    case "arc":      return <ArcFrame      {...props} />;
    case "vscode":   return <VSCodeFrame   screenshot={screenshot} title={title} mode={mode} />;
    case "finder":   return <FinderFrame   screenshot={screenshot} title={title} mode={mode} />;
    case "terminal": return <TerminalFrame screenshot={screenshot} title={title} mode={mode} />;
    default:         return <SafariFrame   {...props} />;
  }
}

interface ScreenEditorProps {
  onSave?: (config: ScreenConfig) => void;
}

export interface ScreenConfig {
  frame: FrameId;
  wallpaperId: string;
  mode: "dark" | "light";
  url: string;
  title: string;
  showDock: boolean;
  screenshot: string | null;
}

export function ScreenEditor({ onSave }: ScreenEditorProps) {
  const [frame, setFrame]           = useState<FrameId>("safari");
  const [wallpaper, setWallpaper]   = useState(WALLPAPERS[0]);
  const [mode, setMode]             = useState<"dark"|"light">("dark");
  const [url, setUrl]               = useState("https://yoursite.com");
  const [title, setTitle]           = useState("");
  const [showDock, setShowDock]     = useState(true);
  const [screenshot, setScreenshot] = useState<string|null>(null);
  const [dragging, setDragging]     = useState(false);
  const [exporting, setExporting]   = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileRef   = useRef<HTMLInputElement>(null);

  // Paste support
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
      const canvas = await html2canvas(canvasRef.current, {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `mockx-screen-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setExporting(false);
    }
  };

  const currentFrame = FRAMES.find(f => f.id === frame)!;
  const isDark = mode === "dark";

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
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${mode === m ? "bg-accent text-white shadow" : "text-text-secondary hover:text-text-primary"}`}
                >
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
                <button
                  key={w.id}
                  onClick={() => setWallpaper(w)}
                  title={w.label}
                  className={`aspect-square rounded-lg transition-all duration-150 ${wallpaper.id === w.id ? "ring-2 ring-accent ring-offset-1 ring-offset-surface" : "hover:scale-105"}`}
                  style={{ background: w.bg }}
                />
              ))}
            </div>
          </section>

          {/* App frame */}
          <section>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">App Frame</p>
            <div className="grid grid-cols-3 gap-1.5">
              {FRAMES.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFrame(f.id)}
                  className={`py-2 px-1 rounded-xl text-xs font-medium transition-all duration-150 border ${frame === f.id ? "bg-accent/15 border-accent/30 text-accent" : "bg-surface-elevated border-white/7 text-text-secondary hover:text-text-primary hover:border-white/15"}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </section>

          {/* URL / Title */}
          <section>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">
              {currentFrame.supportsUrl ? "URL" : "Window Title"}
            </p>
            <Input
              value={currentFrame.supportsUrl ? url : title}
              onChange={e => currentFrame.supportsUrl ? setUrl(e.target.value) : setTitle(e.target.value)}
              placeholder={currentFrame.supportsUrl ? "https://yoursite.com" : "Window title"}
              className="text-xs"
            />
          </section>

          {/* Screenshot upload */}
          <section>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-medium">Screenshot</p>
            <button
              onClick={() => fileRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`w-full border-2 border-dashed rounded-xl py-4 flex flex-col items-center gap-2 text-xs transition-all duration-200 ${dragging ? "border-accent/60 bg-accent/5 text-accent" : "border-white/10 hover:border-white/20 text-text-secondary"}`}
            >
              <Upload size={16} />
              <span>Drop, paste (⌘V) or click</span>
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if(f) readFile(f); }} />
            {screenshot && (
              <button onClick={() => setScreenshot(null)} className="mt-1.5 w-full flex items-center justify-center gap-1.5 text-xs text-text-secondary hover:text-red-400 transition-colors py-1">
                <X size={12}/> Clear screenshot
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

        {/* Save */}
        <div className="p-4 border-t border-white/7 mt-auto">
          <Button
            variant="secondary"
            className="w-full text-xs gap-2"
            onClick={() => onSave?.({ frame, wallpaperId: wallpaper.id, mode, url, title, showDock, screenshot })}
          >
            <Save size={13}/> Save Mockup
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
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 bg-surface-elevated rounded-xl border border-white/7 p-0.5">
              {[1, 2, 3].map(s => (
                <button key={s} onClick={() => handleExport(s)} disabled={exporting} className="px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all disabled:opacity-40">
                  {s}×
                </button>
              ))}
            </div>
            <Button size="sm" onClick={() => handleExport(2)} disabled={exporting} className="gap-1.5">
              <Download size={13}/>
              {exporting ? "Exporting…" : "Export PNG"}
            </Button>
          </div>
        </div>

        {/* Canvas area */}
        <div
          className="flex-1 overflow-auto editor-canvas flex items-center justify-center p-8"
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <div
            ref={canvasRef}
            style={{
              background: wallpaper.bg,
              borderRadius: 12,
              overflow: "hidden",
              position: "relative",
              width: "min(900px, 100%)",
              aspectRatio: "16/10",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
            }}
          >
            {/* Menu bar */}
            <MacOSMenuBar mode={mode} />

            {/* Desktop content */}
            <div className="flex-1 flex items-center justify-center p-6 relative" style={{ paddingBottom: showDock ? 72 : 24 }}>
              <div style={{ width: "88%", maxWidth: 720 }}>
                {renderFrame(frame, screenshot, url, title, mode)}
              </div>
            </div>

            {/* Dock */}
            {showDock && <MacOSDock mode={mode} activeApp={frame === "safari" ? "Safari" : "Finder"} />}
          </div>
        </div>
      </main>
    </div>
  );
}
