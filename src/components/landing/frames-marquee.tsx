const FRAMES_SHOWCASE = [
  { label: "Safari",   desc: "macOS Safari",          color: "#007aff" },
  { label: "Chrome",   desc: "Google Chrome",          color: "#4285f4" },
  { label: "Arc",      desc: "Arc Browser",            color: "#6c63ff" },
  { label: "VS Code",  desc: "Visual Studio Code",     color: "#007acc" },
  { label: "Finder",   desc: "macOS Finder",           color: "#28c840" },
  { label: "Terminal", desc: "macOS Terminal",         color: "#1e1e1e" },
  { label: "Figma",    desc: "Coming soon",            color: "#a259ff" },
  { label: "Notion",   desc: "Coming soon",            color: "#ffffff" },
  { label: "Xcode",    desc: "Coming soon",            color: "#1a73e8" },
  { label: "Linear",   desc: "Coming soon",            color: "#5e6ad2" },
];

function FrameChip({ label, desc, color }: { label: string; desc: string; color: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/8 bg-surface-elevated shrink-0">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: color + "22", border: `1px solid ${color}33` }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2.5"/>
          <path d="M8 21h8M12 17v4"/>
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
    <section id="frames" className="py-20 overflow-hidden">
      <div className="text-center mb-10 px-6">
        <h2 className="font-syne font-bold text-4xl text-text-primary mb-3">Every app frame you need</h2>
        <p className="text-text-secondary text-lg">Browser, IDE, or native macOS — pick what fits your screenshot</p>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="flex animate-marquee gap-4 w-max">
          {[...FRAMES_SHOWCASE, ...FRAMES_SHOWCASE].map((f, i) => (
            <FrameChip key={i} {...f} />
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to right,#0a0c10,transparent)" }}/>
        <div className="absolute inset-y-0 right-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to left,#0a0c10,transparent)" }}/>
      </div>
    </section>
  );
}
