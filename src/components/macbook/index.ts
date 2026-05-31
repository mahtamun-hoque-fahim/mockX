export { MacBookAir13 } from "./macbook-air-13";
export { MacBookAir15 } from "./macbook-air-15";
export { MacBookPro14 } from "./macbook-pro-14";
export { MacBookPro16 } from "./macbook-pro-16";

export type MacBookModelId = "air-13" | "air-15" | "pro-14" | "pro-16";

export const MACBOOK_MODELS: {
  id: MacBookModelId;
  label: string;
  subtitle: string;
  colors: { id: string; label: string; hex: string }[];
}[] = [
  {
    id: "air-13",
    label: 'MacBook Air 13"',
    subtitle: "M4 chip",
    colors: [
      { id: "silver",    label: "Silver",    hex: "#c8c8cc" },
      { id: "starlight", label: "Starlight", hex: "#e8e0d0" },
      { id: "midnight",  label: "Midnight",  hex: "#1a1f2e" },
      { id: "skyblue",   label: "Sky Blue",  hex: "#a8c8e8" },
    ],
  },
  {
    id: "air-15",
    label: 'MacBook Air 15"',
    subtitle: "M4 chip",
    colors: [
      { id: "silver",    label: "Silver",    hex: "#c8c8cc" },
      { id: "starlight", label: "Starlight", hex: "#e8e0d0" },
      { id: "midnight",  label: "Midnight",  hex: "#1a1f2e" },
      { id: "skyblue",   label: "Sky Blue",  hex: "#a8c8e8" },
    ],
  },
  {
    id: "pro-14",
    label: 'MacBook Pro 14"',
    subtitle: "M4 Pro chip",
    colors: [
      { id: "spaceblack", label: "Space Black", hex: "#1a1c22" },
      { id: "silver",     label: "Silver",      hex: "#c8c8cc" },
    ],
  },
  {
    id: "pro-16",
    label: 'MacBook Pro 16"',
    subtitle: "M4 Max chip",
    colors: [
      { id: "spaceblack", label: "Space Black", hex: "#1a1c22" },
      { id: "silver",     label: "Silver",      hex: "#c8c8cc" },
    ],
  },
];
