"use client";

interface FigmaFrameProps {
  screenshot: string | null;
  title?: string;
  mode?: "dark" | "light";
}

const LAYERS = ["Frame 1", "Header", "Hero", "Cards", "Footer"];

export function FigmaFrame({ screenshot, title = "Design", mode = "dark" }: FigmaFrameProps) {
  const isDark = mode === "dark";
  const toolbarBg = isDark ? "#2c2c2c" : "#f5f5f5";
  const sideBg    = isDark ? "#1e1e1e" : "#f0f0f0";
  const canvasBg  = isDark ? "#1a1a1a" : "#e5e5e5";
  const textDim   = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";
  const textMain  = isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)";

  return (
    <div style={{ borderRadius: "10px", overflow: "hidden", fontFamily: "-apple-system,BlinkMacSystemFont,sans-serif", boxShadow: isDark ? "0 25px 60px rgba(0,0,0,0.65),0 0 0 0.5px rgba(255,255,255,0.07)" : "0 25px 60px rgba(0,0,0,0.2)" }}>
      {/* Top toolbar */}
      <div style={{ background: toolbarBg, height: 44, display: "flex", alignItems: "center", gap: 0, borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 6, paddingLeft: 14, paddingRight: 16 }}>
          {(["#ff5f57","#febc2e","#28c840"] as const).map(c => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }}/>
          ))}
        </div>
        {/* Figma logo */}
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 8 }}>
          <svg width="12" height="16" viewBox="0 0 12 18" fill="none">
            <path d="M6 9a3 3 0 100-6H3a3 3 0 000 6h3z" fill="#0acf83"/>
            <path d="M3 9a3 3 0 100 6h3a3 3 0 000-6H3z" fill="#a259ff"/>
            <path d="M9 9a3 3 0 110 6 3 3 0 010-6z" fill="#1abcfe"/>
            <path d="M6 3a3 3 0 110 6 3 3 0 010-6z" fill="#ff7262"/>
            <path d="M3 0a3 3 0 100 6h3V0H3z" fill="#f24e1e"/>
          </svg>
        </div>
        {/* Tool icons */}
        <div style={{ flex: 1, display: "flex", gap: 2, justifyContent: "center" }}>
          {["V","F","P","T","R"].map((t, i) => (
            <div key={t} style={{ width: 28, height: 28, borderRadius: 6, background: i === 0 ? "rgba(255,255,255,0.12)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: i === 0 ? textMain : textDim, fontWeight: 600 }}>{t}</div>
          ))}
        </div>
        {/* Right controls */}
        <div style={{ display: "flex", gap: 6, paddingRight: 14, alignItems: "center" }}>
          <div style={{ background: "#6366f1", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600, color: "white" }}>Share</div>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#0acf83", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "white" }}>M</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex" }}>
        {/* Left panel — Layers */}
        <div style={{ width: 180, background: sideBg, borderRight: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`, flexShrink: 0 }}>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
            {["Layers","Assets"].map((t, i) => (
              <div key={t} style={{ flex: 1, textAlign: "center", padding: "8px 0", fontSize: 11, color: i === 0 ? textMain : textDim, borderBottom: i === 0 ? "1px solid #6366f1" : "none", cursor: "default" }}>{t}</div>
            ))}
          </div>
          {/* Layer list */}
          <div style={{ padding: "6px 0" }}>
            {LAYERS.map((layer, i) => (
              <div key={layer} style={{ padding: "4px 12px", fontSize: 11, color: i === 0 ? (isDark ? "white" : "black") : textDim, background: i === 0 ? (isDark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.1)") : "transparent", display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.5 }}>
                  <rect x="1" y="1" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                </svg>
                {layer}
              </div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div style={{ flex: 1, background: canvasBg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, position: "relative" }}>
          {screenshot ? (
            <div style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.35)", borderRadius: 2 }}>
              <img src={screenshot} alt="Screenshot" style={{ display: "block", maxWidth: "100%", maxHeight: 260, objectFit: "contain" }}/>
            </div>
          ) : (
            <div style={{ color: textDim, fontSize: 12 }}>Drop screenshot here</div>
          )}
        </div>

        {/* Right panel — Properties */}
        <div style={{ width: 200, background: sideBg, borderLeft: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`, flexShrink: 0, padding: "10px 12px" }}>
          <div style={{ fontSize: 10, color: textDim, marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Design</div>
          {[["W","1440"],["H","900"],["X","0"],["Y","0"]].map(([label, val]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: textDim, width: 14 }}>{label}</span>
              <div style={{ flex: 1, background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", borderRadius: 4, padding: "3px 6px", fontSize: 11, color: textMain }}>{val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
