export { SafariFrame }   from "./safari";
export { ChromeFrame }   from "./chrome";
export { ArcFrame }      from "./arc";
export { FirefoxFrame }  from "./firefox";
export { VSCodeFrame }   from "./vscode";
export { FinderFrame }   from "./finder";
export { TerminalFrame } from "./terminal";
export { FigmaFrame }    from "./figma";
export { NotionFrame }   from "./notion";
export { XcodeFrame }    from "./xcode";

export type FrameId =
  | "safari" | "chrome" | "arc" | "firefox"
  | "vscode" | "finder" | "terminal"
  | "figma"  | "notion" | "xcode";

export const FRAMES: { id: FrameId; label: string; supportsUrl: boolean }[] = [
  { id: "safari",   label: "Safari",   supportsUrl: true  },
  { id: "chrome",   label: "Chrome",   supportsUrl: true  },
  { id: "arc",      label: "Arc",      supportsUrl: true  },
  { id: "firefox",  label: "Firefox",  supportsUrl: true  },
  { id: "vscode",   label: "VS Code",  supportsUrl: false },
  { id: "finder",   label: "Finder",   supportsUrl: false },
  { id: "terminal", label: "Terminal", supportsUrl: false },
  { id: "figma",    label: "Figma",    supportsUrl: false },
  { id: "notion",   label: "Notion",   supportsUrl: false },
  { id: "xcode",    label: "Xcode",    supportsUrl: false },
];
