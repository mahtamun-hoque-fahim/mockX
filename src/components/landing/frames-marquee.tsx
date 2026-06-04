const FRAMES_SHOWCASE = [
  { label: "Safari",   desc: "macOS Safari",         color: "#007aff" },
  { label: "Chrome",   desc: "Google Chrome",         color: "#4285f4" },
  { label: "Arc",      desc: "Arc Browser",           color: "#6c63ff" },
  { label: "Firefox",  desc: "Mozilla Firefox",       color: "#ff6611" },
  { label: "VS Code",  desc: "Visual Studio Code",    color: "#007acc" },
  { label: "Finder",   desc: "macOS Finder",          color: "#28c840" },
  { label: "Terminal", desc: "macOS Terminal",        color: "#1e1e1e" },
  { label: "Figma",    desc: "Figma Design",          color: "#a259ff" },
  { label: "Notion",   desc: "Notion",                color: "#ffffff" },
  { label: "Xcode",    desc: "Apple Xcode",           color: "#1a73e8" },
  { label: "Linear",   desc: "Linear Issues",         color: "#5e6ad2" },
  { label: "Slack",    desc: "Slack",                 color: "#4a154b" },
];

// SVG path for a generic monitor/window icon per frame
const ICON_PATH = "M2 3h20a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V5a2 2 0 012-2zM8 21h8M12 17v4";

function FrameChip({ label, desc, color }: { label: string; desc: string; color: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/8 bg-surface-elevated shrink-0 select-none">
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: color + "22", border: `1px solid ${color}33` }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke={color}>
          <path d={ICON_PATH}/>
        </svg>
      </div>
      <div>
        <div className="text-xs font-semibold text-text-primary">{label}</div>
        <div className="text-[10px] text-text-secondary">{desc}</div>
      </div>
    </div>
  );
}

export function FramesMarquee() {
  return (
    <section id="frames" className="py-20 overflow-hidden border-t border-white/5">
      <div className="text-center mb-10 px-6">
        <h2 className="font-syne font-bold text-4xl text-text-primary mb-3">
          12 app frames
        </h2>
        <p className="text-text-secondary text-lg">
          Browser, IDE, design tool, or native macOS — every workflow covered
        </p>
      </div>

      {/* Row 1 */}
      <div className="relative mb-4">
        <div className="flex animate-marquee gap-4 w-max">
          {[...FRAMES_SHOWCASE, ...FRAMES_SHOWCASE].map((f, i) => (
            <FrameChip key={i} {...f} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to right,#0a0c10,transparent)" }}/>
        <div className="absolute inset-y-0 right-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to left,#0a0c10,transparent)" }}/>
      </div>

      {/* Row 2 — reverse direction */}
      <div className="relative">
        <div className="flex gap-4 w-max" style={{ animation: "marquee 32s linear infinite reverse" }}>
          {[...FRAMES_SHOWCASE.slice().reverse(), ...FRAMES_SHOWCASE.slice().reverse()].map((f, i) => (
            <FrameChip key={i} {...f} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to right,#0a0c10,transparent)" }}/>
        <div className="absolute inset-y-0 right-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to left,#0a0c10,transparent)" }}/>
      </div>
    </section>
  );
}
