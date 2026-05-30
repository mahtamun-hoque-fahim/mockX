"use client";

interface MacBookPro14Props {
  children: React.ReactNode;
  color?: "spaceblack" | "silver";
}

const COLORS = {
  spaceblack: { body: ["#1a1c22","#13151a","#0e1015"], hinge: "#090a0e", base: ["#13151a","#0e1015"] },
  silver:     { body: ["#c8c8cc","#b0b0b5","#9a9a9f"], hinge: "#8a8a8f", base: ["#b0b0b5","#9a9a9f"] },
};

export function MacBookPro14({ children, color = "spaceblack" }: MacBookPro14Props) {
  const c = COLORS[color];
  const [top, mid, bot] = c.body;
  const textColor = color === "spaceblack" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  return (
    <div style={{ position: "relative", userSelect: "none" }}>
      {/* Lid */}
      <div
        style={{
          background: `linear-gradient(180deg,${top} 0%,${mid} 55%,${bot} 100%)`,
          borderRadius: "14px 14px 0 0",
          padding: "7px 7px 0",
          boxShadow: `
            0 0 0 0.5px rgba(0,0,0,0.25),
            0 -1px 0 rgba(255,255,255,0.12) inset,
            0 45px 90px rgba(0,0,0,0.6),
            0 12px 28px rgba(0,0,0,0.4)
          `,
        }}
      >
        {/* Port indicators left side */}
        <div style={{ position: "absolute", left: -2, top: "40%", display: "flex", flexDirection: "column", gap: 5 }}>
          {/* MagSafe */}
          <div style={{ width: 14, height: 4, background: "rgba(255,255,255,0.12)", borderRadius: "0 2px 2px 0", border: "0.5px solid rgba(255,255,255,0.06)" }} />
          {/* 2x USB-C */}
          {[0,1].map(i => (
            <div key={i} style={{ width: 10, height: 5, background: "rgba(255,255,255,0.08)", borderRadius: "0 2px 2px 0", border: "0.5px solid rgba(255,255,255,0.05)" }} />
          ))}
          {/* HDMI */}
          <div style={{ width: 12, height: 6, background: "rgba(255,255,255,0.07)", borderRadius: "0 2px 2px 0", border: "0.5px solid rgba(255,255,255,0.04)" }} />
        </div>

        {/* Port indicators right side */}
        <div style={{ position: "absolute", right: -2, top: "50%", display: "flex", flexDirection: "column", gap: 5 }}>
          {/* SD card */}
          <div style={{ width: 10, height: 7, background: "rgba(255,255,255,0.07)", borderRadius: "2px 0 0 2px", border: "0.5px solid rgba(255,255,255,0.04)" }} />
          {/* Headphone */}
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "0.5px solid rgba(255,255,255,0.04)" }} />
        </div>

        {/* Screen bezel — Pro has thinner bezels */}
        <div style={{ background: "#080808", borderRadius: "8px 8px 0 0", overflow: "hidden", position: "relative" }}>
          {/* Notch */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 118, height: 24, background: "#080808", borderRadius: "0 0 14px 14px", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.04)" }} />
          </div>
          <div style={{ aspectRatio: "3024/1964", overflow: "hidden" }}>
            {children}
          </div>
        </div>

        {/* Apple logo */}
        <div style={{ position: "absolute", top: "47%", left: "50%", transform: "translate(-50%,-50%)", width: 22, height: 26, pointerEvents: "none", opacity: 0.07 }}>
          <svg viewBox="0 0 13 15" fill={color === "spaceblack" ? "white" : "black"}>
            <path d="M10.5 7.9C10.5 6.2 11.5 5.3 11.5 5.3C10.6 4.1 9.3 3.9 8.8 3.9C7.6 3.8 6.4 4.6 5.8 4.6C5.2 4.6 4.1 3.9 3.2 3.9C1.7 3.9 0 5.1 0 7.6C0 10.9 2.1 14.1 3.4 14.1C4.1 14.1 4.8 13.5 5.8 13.5C6.8 13.5 7.4 14.1 8.3 14.1C9.7 14.1 11.5 11 11.5 11C11.5 11 10.5 10.5 10.5 7.9ZM8.2 2.8C8.8 2.1 9.2 1.1 9.1 0C8.2 0.1 7.1 0.6 6.4 1.3C5.8 1.9 5.3 2.9 5.5 3.9C6.5 3.9 7.6 3.4 8.2 2.8Z" />
          </svg>
        </div>
      </div>

      {/* Hinge */}
      <div style={{ height: 4, background: `linear-gradient(180deg,${c.hinge},rgba(0,0,0,0.5))`, boxShadow: "0 1px 8px rgba(0,0,0,0.6)" }} />

      {/* Base */}
      <div style={{ height: 18, background: `linear-gradient(180deg,${c.base[0]},${c.base[1]})`, borderRadius: "0 0 10px 10px", position: "relative", boxShadow: "0 8px 24px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(0,0,0,0.18)" }}>
        <div style={{ position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)", width: 100, height: 8, background: "rgba(0,0,0,0.06)", borderRadius: 5, border: `0.5px solid ${textColor}` }} />
      </div>
    </div>
  );
}
