# mockX — DESIGN_GUIDE.md

## Design System

### Philosophy
Dark-first. Clean, minimal, tool-focused. The editor canvas is the star — the UI around it disappears.

---

## Color Tokens

| Token | Value | Usage |
|---|---|---|
| `bg` | `#0A0C10` | Page background |
| `surface` | `#131720` | Cards, sidebars, panels |
| `surface-elevated` | `#1A1F2E` | Inputs, hover states, nested surfaces |
| `accent` | `#6C63FF` | Primary actions, active states, highlights |
| `accent-hover` | `#7B74FF` | Accent hover |
| `text-primary` | `#F2F2F3` | Headings, labels, important text |
| `text-secondary` | `rgba(255,255,255,0.45)` | Body text, descriptions, meta |
| `border` | `rgba(255,255,255,0.07)` | All borders (Tailwind: `border-white/7`) |

### Tailwind usage
```html
<!-- Backgrounds -->
<div class="bg-bg">         <!-- Page -->
<div class="bg-surface">    <!-- Card -->
<div class="bg-surface-elevated">  <!-- Input, nested -->

<!-- Borders — always use opacity variant -->
<div class="border border-white/7">   <!-- default -->
<div class="border border-white/10">  <!-- slightly visible -->
<div class="border border-white/15">  <!-- hover -->
<div class="border border-accent/30"> <!-- active/focus -->

<!-- Text -->
<p class="text-text-primary">
<p class="text-text-secondary">
```

---

## Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / Headings | Syne | 700 | 28px–72px |
| UI labels / body | Onest | 400–600 | 11px–16px |
| Code / mono | JetBrains Mono | 400 | 11px–13px |

```html
<h1 class="font-syne font-bold">
<p class="font-onest">
<code class="font-mono">
```

---

## Spacing & Radius

| Token | Value |
|---|---|
| Base radius | `10px` (rounded-xl in Tailwind) |
| Large radius | `16px` (rounded-2xl) |
| XL radius | `20px` (rounded-3xl) |
| Standard padding | `p-4` (16px) or `p-5` (20px) |
| Page padding | `p-8` (32px) |

---

## Components

### Button variants
```tsx
<Button variant="primary">   // accent bg, shadow
<Button variant="secondary"> // surface-elevated, white/10 border
<Button variant="ghost">     // no bg, text-secondary
<Button variant="danger">    // red tint
```

### Badge variants
```tsx
<Badge variant="default">  // subtle white/8
<Badge variant="pro">      // accent tint
<Badge variant="admin">    // red tint
<Badge variant="success">  // green tint
<Badge variant="warning">  // yellow tint
<Badge variant="danger">   // red tint
```

---

## Editor Layout

```
┌─────────────────────────────────────────────┐
│  Top bar: Logo + nav tabs + Export controls  │  h-14
├─────────────┬───────────────────────────────┤
│             │                               │
│  Left panel │  Canvas (editor-canvas bg)    │
│  w-64       │  flex-1, overflow-auto        │
│  Controls   │  Mockup preview centered      │
│             │                               │
└─────────────┴───────────────────────────────┘
```

### Canvas background
```css
/* Subtle dot grid — defined in globals.css */
.editor-canvas {
  background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

---

## macOS UI Rules

### Traffic lights
- Red: `#ff5f57` / ring `#e0443e`
- Yellow: `#febc2e` / ring `#d4a017`
- Green: `#28c840` / ring `#1aab29`
- Size: 12×12px, gap: 6px

### Menu bar
- Dark: `rgba(28,28,30,0.92)` + `blur(20px)`
- Light: `rgba(236,236,236,0.92)` + `blur(20px)`
- Height: 24px
- Font: `-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif`

### Dock
- Dark: `rgba(255,255,255,0.10)` + `blur(30px)`
- App icon size: 44×44px, radius: 12px
- Active indicator: 4px dot below icon

---

## Icons
Use **lucide-react** exclusively. Never use emoji in code/UI.

```tsx
import { Monitor, Laptop, Download, Save } from "lucide-react";
// Standard sizes: 12, 13, 14, 16, 18, 20, 24
```

---

## Animations

| Name | Usage |
|---|---|
| `animate-fade-in` | Fade in elements |
| `animate-slide-up` | Slide up on mount |
| `animate-marquee` | Horizontal scroll loop |

---

## Do / Don't

| Do | Don't |
|---|---|
| Use `border-white/7` for all borders | Hard-code `border-gray-800` |
| Use `font-syne` for all headings | Mix heading fonts |
| Use `lucide-react` icons | Use emoji |
| Dark mode only for tool UI | Add light mode to the app shell |
| Use `text-text-secondary` for descriptions | Use `text-gray-*` |
| Consistent `rounded-xl`/`rounded-2xl` | Mix arbitrary border radii |
