"use client";

interface TerminalFrameProps {
  screenshot: string | null;
  title?: string;
  mode?: "dark" | "light";
}

export function TerminalFrame({ screenshot, title = "zsh", mode = "dark" }: TerminalFrameProps) {
  const isDark = mode === "dark";

  return (
    <div style={{ borderRadius: "10px", overflow: "hidden", fontFamily: "'JetBrains Mono', monospace", boxShadow: isDark ? "0 25px 60px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(255,255,255,0.07)" : "0 25px 60px rgba(0,0,0,0.2)" }}>
      {/* Title bar */}
      <div style={{ background: isDark ? "#1e1e1e" : "#ececec", padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
        {(["#ff5f57", "#febc2e", "#28c840"] as const).map(c => (
          <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
        ))}
        <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)" }}>
          {title} — 80×24
        </div>
      </div>
      {/* Terminal content */}
      <div style={{ background: isDark ? "#1e1e1e" : "#fff", lineHeight: 0, overflow: "hidden" }}>
        {screenshot ? (
          <img src={screenshot} alt="Screenshot" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top" }} />
        ) : (
          <div style={{ height: 240, background: isDark ? "#1e1e1e" : "#fff", padding: 16, fontFamily: "monospace", fontSize: 12, color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)", lineHeight: 1.6 }}>
            <span style={{ color: "#28c840" }}>user@macbook</span>
            <span style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)" }}>:</span>
            <span style={{ color: "#007aff" }}>~/projects</span>
            <span style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)" }}> $ </span>
            <span style={{ borderRight: "2px solid", borderColor: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}>&nbsp;</span>
          </div>
        )}
      </div>
    </div>
  );
}
