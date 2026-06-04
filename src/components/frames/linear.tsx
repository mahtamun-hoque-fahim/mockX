"use client";

interface LinearFrameProps {
  screenshot: string | null;
  title?: string;
  mode?: "dark" | "light";
}

const SIDEBAR_SECTIONS = [
  { label: "My Issues",   count: 4 },
  { label: "In Progress", count: 2 },
  { label: "Backlog",     count: 12 },
  { label: "Done",        count: 38 },
];

const TEAMS = ["Design", "Engineering", "Product"];

export function LinearFrame({ screenshot, title = "Issues", mode = "dark" }: LinearFrameProps) {
  const isDark  = mode === "dark";
  const appBg   = isDark ? "#111116" : "#ffffff";
  const sideBg  = isDark ? "#18181d" : "#f4f4f6";
  const textMain = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.82)";
  const textDim  = isDark ? "rgba(255,255,255,0.3)"  : "rgba(0,0,0,0.3)";
  const borderC  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const hoverBg  = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";

  return (
    <div style={{ borderRadius: "10px", overflow: "hidden", fontFamily: "-apple-system,BlinkMacSystemFont,'Inter',sans-serif", boxShadow: isDark ? "0 25px 60px rgba(0,0,0,0.65),0 0 0 0.5px rgba(255,255,255,0.07)" : "0 25px 60px rgba(0,0,0,0.2)" }}>
      {/* Title bar */}
      <div style={{ background: sideBg, height: 40, display: "flex", alignItems: "center", padding: "0 14px", gap: 8, borderBottom: `1px solid ${borderC}` }}>
        {(["#ff5f57","#febc2e","#28c840"] as const).map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }}/>)}
        <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: textDim }}>Linear</div>
      </div>

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <div style={{ width: 220, background: sideBg, borderRight: `1px solid ${borderC}`, flexShrink: 0, padding: "10px 8px" }}>
          {/* Workspace header */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", marginBottom: 10 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: "linear-gradient(135deg,#5e6ad2,#4f46e5)", flexShrink: 0 }}/>
            <span style={{ fontSize: 13, fontWeight: 600, color: textMain }}>My Workspace</span>
          </div>

          {/* Nav items */}
          {[
            { label: "Inbox",     dot: true  },
            { label: "My Issues", dot: false },
            { label: "Views",     dot: false },
          ].map((item, i) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 7, padding: "5px 8px", borderRadius: 5, background: i === 1 ? hoverBg : "transparent", marginBottom: 1 }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: i === 0 ? "rgba(94,106,210,0.3)" : "transparent", border: i === 0 ? "1px solid rgba(94,106,210,0.5)" : "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {item.dot && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#5e6ad2" }}/>}
              </div>
              <span style={{ fontSize: 12, color: i === 1 ? textMain : textDim }}>{item.label}</span>
            </div>
          ))}

          {/* Teams section */}
          <div style={{ padding: "10px 8px 4px", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: textDim, fontWeight: 600 }}>Teams</div>
          {TEAMS.map(team => (
            <div key={team} style={{ display: "flex", alignItems: "center", gap: 7, padding: "5px 8px", borderRadius: 5, marginBottom: 1 }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 8, color: textDim, fontWeight: 700 }}>{team[0]}</span>
              </div>
              <span style={{ fontSize: 12, color: textDim }}>{team}</span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, background: appBg, display: "flex", flexDirection: "column" }}>
          {/* Toolbar */}
          <div style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", borderBottom: `1px solid ${borderC}` }}>
            <div style={{ display: "flex", gap: 16 }}>
              {SIDEBAR_SECTIONS.map((s, i) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: i === 0 ? (isDark ? "#5e6ad2" : "#4f46e5") : textDim, borderBottom: i === 0 ? `1.5px solid ${isDark ? "#5e6ad2" : "#4f46e5"}` : "none", paddingBottom: 2 }}>
                  {s.label}
                  <span style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)", borderRadius: 4, padding: "0 4px", fontSize: 10 }}>{s.count}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["Filter","Group","Display"].map(btn => (
                <div key={btn} style={{ fontSize: 11, color: textDim, padding: "3px 8px", borderRadius: 4, background: hoverBg }}>{btn}</div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, lineHeight: 0, overflow: "hidden" }}>
            {screenshot
              ? <img src={screenshot} alt="Screenshot" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top" }}/>
              : <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", color: textDim, fontSize: 12, lineHeight: 1 }}>Drop screenshot here</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
