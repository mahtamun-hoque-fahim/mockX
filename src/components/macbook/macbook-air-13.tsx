"use client";

interface MacBookAir13Props {
  children: React.ReactNode; // the screen content
  color?: "silver" | "starlight" | "midnight" | "skyblue";
}

const COLORS = {
  silver:    { body: ["#c8c8cc","#b0b0b5","#9a9a9f"], hinge: "#8a8a8f", base: ["#b0b0b5","#9a9a9f"] },
  starlight: { body: ["#e8e0d0","#d4cbbf","#bfb5a8"], hinge: "#a89f93", base: ["#d4cbbf","#bfb5a8"] },
  midnight:  { body: ["#1a1f2e","#14171e","#0e1018"], hinge: "#0a0c12", base: ["#14171e","#0e1018"] },
  skyblue:   { body: ["#a8c8e8","#8fb8dc","#76a4cc"], hinge: "#628fbc", base: ["#8fb8dc","#76a4cc"] },
};

export function MacBookAir13({ children, color = "silver" }: MacBookAir13Props) {
  const c = COLORS[color];
  const [top, mid, bot] = c.body;

  return (
    <div style={{ position: "relative", userSelect: "none" }}>
      {/* Lid / display housing */}
      <div
        style={{
          background: `linear-gradient(180deg, ${top} 0%, ${mid} 50%, ${bot} 100%)`,
          borderRadius: "14px 14px 0 0",
          padding: "6px 6px 0",
          boxShadow: `
            0 0 0 0.5px rgba(0,0,0,0.18),
            0 -1px 0 rgba(255,255,255,0.25) inset,
            0 40px 80px rgba(0,0,0,0.55),
            0 10px 24px rgba(0,0,0,0.35)
          `,
        }}
      >
        {/* Screen bezel */}
        <div
          style={{
            background: "#0a0a0a",
            borderRadius: "10px 10px 0 0",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Notch */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 110,
              height: 22,
              background: "#0a0a0a",
              borderRadius: "0 0 12px 12px",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#1c1c1c", border: "1px solid rgba(255,255,255,0.04)" }} />
          </div>
          {/* Screen content */}
          <div style={{ aspectRatio: "2560/1664", overflow: "hidden", position: "relative" }}>
            {children}
          </div>
        </div>

        {/* Apple logo on lid back — visible as subtle reflection */}
        <div
          style={{
            position: "absolute",
            top: "48%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 20,
            height: 24,
            pointerEvents: "none",
            opacity: 0.08,
          }}
        >
          <svg viewBox="0 0 13 15" fill={color === "midnight" ? "white" : "black"}>
            <path d="M10.5 7.9C10.5 6.2 11.5 5.3 11.5 5.3C10.6 4.1 9.3 3.9 8.8 3.9C7.6 3.8 6.4 4.6 5.8 4.6C5.2 4.6 4.1 3.9 3.2 3.9C1.7 3.9 0 5.1 0 7.6C0 10.9 2.1 14.1 3.4 14.1C4.1 14.1 4.8 13.5 5.8 13.5C6.8 13.5 7.4 14.1 8.3 14.1C9.7 14.1 11.5 11 11.5 11C11.5 11 10.5 10.5 10.5 7.9ZM8.2 2.8C8.8 2.1 9.2 1.1 9.1 0C8.2 0.1 7.1 0.6 6.4 1.3C5.8 1.9 5.3 2.9 5.5 3.9C6.5 3.9 7.6 3.4 8.2 2.8Z" />
          </svg>
        </div>
      </div>

      {/* Hinge */}
      <div style={{ height: 3, background: `linear-gradient(180deg, ${c.hinge} 0%, rgba(0,0,0,0.4) 100%)`, boxShadow: "0 1px 6px rgba(0,0,0,0.5)" }} />

      {/* Base / keyboard deck — tapered Air shape */}
      <div
        style={{
          height: 16,
          background: `linear-gradient(180deg, ${c.base[0]} 0%, ${c.base[1]} 100%)`,
          borderRadius: "0 0 10px 10px",
          position: "relative",
          boxShadow: "0 6px 20px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(0,0,0,0.15)",
        }}
      >
        {/* Trackpad hint */}
        <div style={{ position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)", width: 90, height: 7, background: "rgba(0,0,0,0.06)", borderRadius: 5, border: "0.5px solid rgba(0,0,0,0.08)" }} />
      </div>
    </div>
  );
}
