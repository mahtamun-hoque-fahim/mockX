"use client";

interface ArcFrameProps {
  screenshot: string | null;
  url?: string;
  title?: string;
  mode?: "dark" | "light";
}

export function ArcFrame({ screenshot, url = "https://example.com", title, mode = "dark" }: ArcFrameProps) {
  const isDark = mode === "dark";

  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        boxShadow: isDark
          ? "0 25px 60px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(255,255,255,0.07)"
          : "0 25px 60px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(0,0,0,0.1)",
      }}
    >
      {/* Arc sidebar */}
      <div
        style={{
          width: 56,
          background: isDark
            ? "linear-gradient(180deg,#1e1b2e,#16131f)"
            : "linear-gradient(180deg,#e8e4f8,#ddd8f5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "12px 0",
          gap: 8,
          flexShrink: 0,
        }}
      >
        {/* Traffic lights vertical */}
        {(["#ff5f57", "#febc2e", "#28c840"] as const).map((color, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
        ))}
        <div style={{ flex: 1 }} />
        {/* Arc logo */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: "linear-gradient(135deg,#6c63ff,#a855f7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2C5.1 2 2 5.1 2 9C2 12.9 5.1 16 9 16C12.9 16 16 12.9 16 9" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M12 2L16 6V2H12Z" fill="white"/>
          </svg>
        </div>
        <div style={{ height: 24 }} />
        {/* Space + tabs */}
        {[1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: i === 1
                ? (isDark ? "rgba(108,99,255,0.3)" : "rgba(108,99,255,0.2)")
                : "transparent",
              border: i === 1
                ? "1px solid rgba(108,99,255,0.4)"
                : "1px solid transparent",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Address bar */}
        <div
          style={{
            background: isDark ? "#1e1b2e" : "#eceaf8",
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              flex: 1,
              background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
              borderRadius: 8,
              padding: "4px 10px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="9" height="10" viewBox="0 0 9 12" fill="none">
              <rect x="0.5" y="4" width="8" height="7.5" rx="1.5" fill={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)"} />
              <path d="M2.5 4V2.5C2.5 1.1 7 1.1 7 2.5V4" stroke={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)"} strokeWidth="1.1" fill="none" />
            </svg>
            <span style={{ fontSize: 11, color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)" }}>
              {url}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ background: isDark ? "#161320" : "#fff", lineHeight: 0, overflow: "hidden", flex: 1 }}>
          {screenshot ? (
            <img src={screenshot} alt="Screenshot" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top" }} />
          ) : (
            <div style={{ height: 240, display: "flex", alignItems: "center", justifyContent: "center", color: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)", fontSize: 13 }}>
              Drop screenshot here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
