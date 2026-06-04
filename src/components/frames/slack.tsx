"use client";

interface SlackFrameProps {
  screenshot: string | null;
  title?: string;
  mode?: "dark" | "light";
}

const CHANNELS   = ["general","random","design","engineering","product-updates"];
const DM_MEMBERS = ["Alex Chen","Jordan Park","Sam Rivera"];

export function SlackFrame({ screenshot, title = "#general", mode = "dark" }: SlackFrameProps) {
  const isDark  = mode === "dark";
  const sidebarBg = isDark ? "#1a1d21" : "#3f0f40";   // Slack aubergine
  const mainBg    = isDark ? "#212529" : "#ffffff";
  const textSide  = "rgba(255,255,255,0.72)";
  const textDim   = "rgba(255,255,255,0.45)";
  const textMain  = isDark ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.82)";
  const borderC   = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";

  const displayName = title.startsWith("#") ? title : `#${title}`;

  return (
    <div style={{ borderRadius: "10px", overflow: "hidden", fontFamily: "-apple-system,BlinkMacSystemFont,'Lato',sans-serif", boxShadow: isDark ? "0 25px 60px rgba(0,0,0,0.65),0 0 0 0.5px rgba(255,255,255,0.07)" : "0 25px 60px rgba(0,0,0,0.2)" }}>
      {/* Title bar — Slack native titlte bar bg */}
      <div style={{ background: "#1a1d21", height: 40, display: "flex", alignItems: "center", padding: "0 14px", gap: 8 }}>
        {(["#ff5f57","#febc2e","#28c840"] as const).map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }}/>)}
        <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: textDim }}>Slack</div>
      </div>

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <div style={{ width: 220, background: sidebarBg, flexShrink: 0, padding: "8px 0" }}>
          {/* Workspace name */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 14px 10px" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>Workspace</span>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#007a5a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            </div>
          </div>

          {/* Search bar */}
          <div style={{ margin: "0 8px 10px", background: "rgba(255,255,255,0.1)", borderRadius: 6, padding: "5px 10px", display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={textDim} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
            <span style={{ fontSize: 12, color: textDim }}>Search {"{"}workspace{"}"}</span>
          </div>

          {/* Channels */}
          <div style={{ padding: "4px 14px 4px", fontSize: 11, fontWeight: 700, color: textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>Channels</div>
          {CHANNELS.map((ch, i) => (
            <div key={ch} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 14px", background: ch === title.replace("#","") || (i === 0 && title === "#general") ? "rgba(255,255,255,0.1)" : "transparent" }}>
              <span style={{ fontSize: 13, color: textDim }}>#</span>
              <span style={{ fontSize: 13, color: ch === title.replace("#","") || (i === 0 && title === "#general") ? "white" : textSide }}>{ch}</span>
              {i === 4 && <div style={{ marginLeft: "auto", width: 16, height: 16, borderRadius: "50%", background: "#cd2553", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "white", fontWeight: 700 }}>3</div>}
            </div>
          ))}

          {/* DMs */}
          <div style={{ padding: "10px 14px 4px", fontSize: 11, fontWeight: 700, color: textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>Direct Messages</div>
          {DM_MEMBERS.map(member => (
            <div key={member} style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 14px" }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: `hsl(${member.charCodeAt(0) * 5 % 360},50%,45%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "white", fontWeight: 700, flexShrink: 0 }}>
                {member.charAt(0)}
              </div>
              <span style={{ fontSize: 12, color: textSide }}>{member}</span>
              <div style={{ marginLeft: "auto", width: 7, height: 7, borderRadius: "50%", background: "#007a5a", flexShrink: 0 }}/>
            </div>
          ))}
        </div>

        {/* Main area */}
        <div style={{ flex: 1, background: mainBg, display: "flex", flexDirection: "column" }}>
          {/* Channel header */}
          <div style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", borderBottom: `1px solid ${borderC}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: textMain }}>{displayName}</span>
              <span style={{ fontSize: 12, color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)" }}>142 members</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {["🔍","📌","@"].map((icon, i) => (
                <span key={i} style={{ fontSize: 14, opacity: 0.5, cursor: "default" }}>{icon}</span>
              ))}
            </div>
          </div>

          {/* Messages content */}
          <div style={{ flex: 1, lineHeight: 0, overflow: "hidden" }}>
            {screenshot
              ? <img src={screenshot} alt="Screenshot" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top" }}/>
              : <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", color: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)", fontSize: 12, lineHeight: 1 }}>Drop screenshot here</div>
            }
          </div>

          {/* Message input */}
          <div style={{ padding: "8px 14px", borderTop: `1px solid ${borderC}` }}>
            <div style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)", border: `1px solid ${borderC}`, borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)" }}>Message {displayName}</span>
              <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                {["😊","📎","Aa"].map((icon, i) => (
                  <span key={i} style={{ fontSize: 12, opacity: 0.4, cursor: "default" }}>{icon}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
