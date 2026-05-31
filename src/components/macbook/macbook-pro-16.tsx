"use client";

interface MacBookPro16Props {
  children: React.ReactNode;
  color?: "spaceblack" | "silver";
}

const COLORS = {
  spaceblack: { body: ["#1a1c22","#13151a","#0e1015"], hinge: "#090a0e", base: ["#13151a","#0e1015"] },
  silver:     { body: ["#c8c8cc","#b0b0b5","#9a9a9f"], hinge: "#8a8a8f", base: ["#b0b0b5","#9a9a9f"] },
};

export function MacBookPro16({ children, color = "spaceblack" }: MacBookPro16Props) {
  const c = COLORS[color];
  const [top, mid, bot] = c.body;

  return (
    <div style={{ position: "relative", userSelect: "none" }}>
      {/* Lid */}
      <div
        style={{
          background: `linear-gradient(180deg,${top} 0%,${mid} 55%,${bot} 100%)`,
          borderRadius: "14px 14px 0 0",
          padding: "8px 8px 0",
          boxShadow: `
            0 0 0 0.5px rgba(0,0,0,0.28),
            0 -1px 0 rgba(255,255,255,0.10) inset,
            0 50px 100px rgba(0,0,0,0.65),
            0 14px 32px rgba(0,0,0,0.45)
          `,
        }}
      >
        {/* Port indicators — left */}
        <div style={{ position: "absolute", left: -2, top: "38%", display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ width: 16, height: 4, background: "rgba(255,255,255,0.12)", borderRadius: "0 2px 2px 0", border: "0.5px solid rgba(255,255,255,0.06)" }} />
          {[0,1].map(i => <div key={i} style={{ width: 11, height: 5, background: "rgba(255,255,255,0.08)", borderRadius: "0 2px 2px 0", border: "0.5px solid rgba(255,255,255,0.05)" }} />)}
          <div style={{ width: 13, height: 6, background: "rgba(255,255,255,0.07)", borderRadius: "0 2px 2px 0", border: "0.5px solid rgba(255,255,255,0.04)" }} />
        </div>

        {/* Port indicators — right */}
        <div style={{ position: "absolute", right: -2, top: "46%", display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ width: 11, height: 7, background: "rgba(255,255,255,0.07)", borderRadius: "2px 0 0 2px", border: "0.5px solid rgba(255,255,255,0.04)" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "0.5px solid rgba(255,255,255,0.04)" }} />
        </div>

        {/* Screen — Pro 16 has 3456×2234 */}
        <div style={{ background: "#070707", borderRadius: "8px 8px 0 0", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 124, height: 25, background: "#070707", borderRadius: "0 0 14px 14px", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#181818", border: "1px solid rgba(255,255,255,0.04)" }} />
          </div>
          <div style={{ aspectRatio: "3456/2234", overflow: "hidden" }}>
            {children}
          </div>
        </div>

        {/* Apple logo */}
        <div style={{ position: "absolute", top: "46%", left: "50%", transform: "translate(-50%,-50%)", width: 24, height: 28, pointerEvents: "none", opacity: 0.07 }}>
          <svg viewBox="0 0 13 15" fill={color === "spaceblack" ? "white" : "black"}>
            <path d="M10.5 7.9C10.5 6.2 11.5 5.3 11.5 5.3C10.6 4.1 9.3 3.9 8.8 3.9C7.6 3.8 6.4 4.6 5.8 4.6C5.2 4.6 4.1 3.9 3.2 3.9C1.7 3.9 0 5.1 0 7.6C0 10.9 2.1 14.1 3.4 14.1C4.1 14.1 4.8 13.5 5.8 13.5C6.8 13.5 7.4 14.1 8.3 14.1C9.7 14.1 11.5 11 11.5 11C11.5 11 10.5 10.5 10.5 7.9ZM8.2 2.8C8.8 2.1 9.2 1.1 9.1 0C8.2 0.1 7.1 0.6 6.4 1.3C5.8 1.9 5.3 2.9 5.5 3.9C6.5 3.9 7.6 3.4 8.2 2.8Z" />
          </svg>
        </div>
      </div>

      {/* Hinge */}
      <div style={{ height: 5, background: `linear-gradient(180deg,${c.hinge},rgba(0,0,0,0.55))`, boxShadow: "0 1px 10px rgba(0,0,0,0.65)" }} />

      {/* Base — Pro 16 is the thickest */}
      <div style={{ height: 20, background: `linear-gradient(180deg,${c.base[0]},${c.base[1]})`, borderRadius: "0 0 10px 10px", position: "relative", boxShadow: "0 10px 28px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(0,0,0,0.22)" }}>
        <div style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", width: 110, height: 9, background: "rgba(0,0,0,0.06)", borderRadius: 5, border: `0.5px solid ${color === "spaceblack" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.07)"}` }} />
      </div>
    </div>
  );
}
