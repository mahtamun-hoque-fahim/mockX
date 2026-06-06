"use client";

interface DiscordFrameProps {
  screenshot: string | null;
  title?: string;
  mode?: "dark" | "light";
}

const SERVERS   = ["General", "Design", "Dev", "Gaming", "Music"];
const CHANNELS  = ["general", "announcements", "off-topic", "resources", "showcase"];
const MEMBERS   = ["Alex Chen", "Jordan Park", "Sam Rivera", "Casey Kim"];

export function DiscordFrame({ screenshot, title = "#general", mode = "dark" }: DiscordFrameProps) {
  const isDark    = mode === "dark";
  const serverBg  = "#1e1f22";
  const sidebarBg = isDark ? "#2b2d31" : "#f2f3f5";
  const mainBg    = isDark ? "#313338" : "#ffffff";
  const textMain  = isDark ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.82)";
  const textDim   = isDark ? "rgba(255,255,255,0.40)" : "rgba(0,0,0,0.40)";
  const textSide  = isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.60)";
  const borderC   = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const activeChannel = title.replace("#", "") || "general";

  return (
    <div style={{ borderRadius: 10, overflow: "hidden", fontFamily: "-apple-system,BlinkMacSystemFont,'gg sans','Noto Sans',sans-serif", boxShadow: isDark ? "0 25px 60px rgba(0,0,0,0.65),0 0 0 0.5px rgba(255,255,255,0.07)" : "0 25px 60px rgba(0,0,0,0.2)" }}>
      {/* Title bar */}
      <div style={{ background: "#1e1f22", height: 40, display: "flex", alignItems: "center", padding: "0 14px", gap: 8 }}>
        {(["#ff5f57","#febc2e","#28c840"] as const).map(c => (
          <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
        ))}
        <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: textDim }}>Discord</div>
      </div>

      <div style={{ display: "flex" }}>
        {/* Server icons strip */}
        <div style={{ width: 72, background: serverBg, display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 0", gap: 8, flexShrink: 0 }}>
          {/* Home icon */}
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#5865f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          </div>
          <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.1)", borderRadius: 1 }} />
          {SERVERS.map((s, i) => (
            <div key={s} style={{ width: 48, height: 48, borderRadius: i === 0 ? 16 : "50%", background: i === 0 ? "#5865f2" : isDark ? "#383a40" : "#e3e5e8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: i === 0 ? "white" : textSide, transition: "border-radius 0.15s", flexShrink: 0 }}>
              {s.charAt(0)}
            </div>
          ))}
        </div>

        {/* Channel sidebar */}
        <div style={{ width: 220, background: sidebarBg, flexShrink: 0, display: "flex", flexDirection: "column" }}>
          {/* Server header */}
          <div style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", borderBottom: `1px solid ${borderC}`, flexShrink: 0 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: textMain }}>My Server</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={textDim} strokeWidth="2" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
          </div>

          <div style={{ flex: 1, overflowY: "hidden", padding: "8px 0" }}>
            <div style={{ padding: "4px 14px 4px", fontSize: 11, fontWeight: 700, color: textDim, textTransform: "uppercase", letterSpacing: "0.06em" }}>Text Channels</div>
            {CHANNELS.map((ch, i) => (
              <div key={ch} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 8px 5px 14px", borderRadius: 4, margin: "1px 8px", background: ch === activeChannel || (i === 0 && !CHANNELS.includes(activeChannel)) ? isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" : "transparent" }}>
                <span style={{ fontSize: 16, color: textDim, lineHeight: 1 }}>#</span>
                <span style={{ fontSize: 13, color: ch === activeChannel || (i === 0 && !CHANNELS.includes(activeChannel)) ? textMain : textSide }}>{ch}</span>
                {i === 1 && <div style={{ marginLeft: "auto", width: 16, height: 16, borderRadius: "50%", background: "#ed4245", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "white", fontWeight: 700 }}>2</div>}
              </div>
            ))}

            <div style={{ padding: "10px 14px 4px", fontSize: 11, fontWeight: 700, color: textDim, textTransform: "uppercase", letterSpacing: "0.06em" }}>Members — {MEMBERS.length}</div>
            {MEMBERS.map(member => (
              <div key={member} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 14px" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: `hsl(${member.charCodeAt(0) * 7 % 360},55%,48%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "white", fontWeight: 700, flexShrink: 0, position: "relative" }}>
                  {member.charAt(0)}
                  <div style={{ position: "absolute", bottom: -1, right: -1, width: 10, height: 10, borderRadius: "50%", background: "#23a55a", border: `2px solid ${sidebarBg}` }} />
                </div>
                <span style={{ fontSize: 13, color: textSide }}>{member.split(" ")[0]}</span>
              </div>
            ))}
          </div>

          {/* User bar */}
          <div style={{ height: 52, background: isDark ? "#232428" : "#ebedef", borderTop: `1px solid ${borderC}`, display: "flex", alignItems: "center", padding: "0 10px", gap: 8, flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#5865f2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "white", fontWeight: 700, flexShrink: 0 }}>
              U
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: textMain }}>You</div>
              <div style={{ fontSize: 10, color: textDim }}>#0001</div>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {[
                <path key="mic" d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />,
                <><path key="h1" d="M3 18v-6a9 9 0 0 1 18 0v6" /><path key="h2" d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></>,
              ].map((paths, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", cursor: "default" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={textDim} strokeWidth="2" strokeLinecap="round">{paths}</svg>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main chat area */}
        <div style={{ flex: 1, background: mainBg, display: "flex", flexDirection: "column" }}>
          {/* Channel header */}
          <div style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", borderBottom: `1px solid ${borderC}`, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18, color: textDim, lineHeight: 1 }}>#</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: textMain }}>{activeChannel}</span>
              <span style={{ fontSize: 12, color: textDim }}>A chill place to chat</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {(["search","bell","pin"] as const).map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={textDim} strokeWidth="1.8" strokeLinecap="round">
                  {i === 0 && <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></>}
                  {i === 1 && <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>}
                  {i === 2 && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>}
                </svg>
              ))}
            </div>
          </div>

          {/* Messages content */}
          <div style={{ flex: 1, lineHeight: 0, overflow: "hidden" }}>
            {screenshot
              ? <img src={screenshot} alt="Screenshot" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top" }} />
              : <div style={{ height: 240, display: "flex", alignItems: "center", justifyContent: "center", color: textDim, fontSize: 12, lineHeight: 1 }}>Drop screenshot here</div>
            }
          </div>

          {/* Message input */}
          <div style={{ padding: "0 16px 16px", flexShrink: 0 }}>
            <div style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)", border: `1px solid ${borderC}`, borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={textDim} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
              <span style={{ flex: 1, fontSize: 13, color: textDim }}>Message #{activeChannel}</span>
              <div style={{ display: "flex", gap: 6 }}>
                {[0,1,2].map(i => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={textDim} strokeWidth="1.8" strokeLinecap="round">
                    {i === 0 && <><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></>}
                    {i === 1 && <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>}
                    {i === 2 && <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.07 6.07l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></>}
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
