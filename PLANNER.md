# mockX — PLANNER.md

## Product

MacBook mockup tool. Two distinct mockup types. Landing page + app + admin.

---

## Architecture

```
src/
├── app/
│   ├── page.tsx                        # Landing page
│   ├── (auth)/login|signup             # Auth pages
│   ├── (app)/dashboard|screen|scene|mockups  # App (auth-protected)
│   ├── admin/                          # Admin panel (role=admin)
│   └── api/auth|mockups                # API routes
├── components/
│   ├── ui/                             # button, input, badge
│   ├── frames/                         # Safari, Chrome, Arc, VSCode, Finder, Terminal
│   ├── macbook/                        # MacBook Air 13, Pro 14 hardware frames
│   ├── macos/                          # MenuBar, Dock
│   ├── editor/                         # ScreenEditor, SceneEditor
│   └── landing/                        # Navbar, Hero, MockupTypes, FramesMarquee, Pricing, Footer
└── lib/
    ├── auth.ts                         # Better Auth server config
    ├── auth-client.ts                  # Better Auth client
    ├── db/schema.ts                    # Drizzle schema (users, sessions, accounts, verifications, mockups, presets, feedback)
    └── db/index.ts                     # Neon HTTP driver
```

---

## Routes

| Route | Auth | Description |
|---|---|---|
| `/` | No | Landing page |
| `/login` | No | Sign in |
| `/signup` | No | Create account |
| `/app/dashboard` | Yes | Quick start + recent mockups |
| `/app/screen` | Yes | Screen Mockup editor (Type 2) |
| `/app/scene` | Yes | Scene Mockup editor (Type 1) |
| `/app/mockups` | Yes | Saved mockups library |
| `/admin` | admin | Overview stats |
| `/admin/users` | admin | User management |
| `/admin/mockups` | admin | All mockups |
| `/admin/presets` | admin | Preset management |
| `/admin/feedback` | admin | Feedback inbox |
| `/admin/settings` | admin | Feature flags |
| `/api/auth/[...all]` | — | Better Auth handler |
| `/api/mockups` | Yes | GET list / POST create |
| `/api/mockups/[id]` | Yes | GET / PATCH / DELETE |

---

## DB Schema

### users
- id, name, email, emailVerified, image, role (guest/user/pro/admin), banned, createdAt, updatedAt

### sessions / accounts / verifications
- Standard Better Auth tables

### mockups
- id, userId, type (scene/screen), title, config (jsonb), thumbnailUrl, isPublic, shareSlug, createdAt, updatedAt

### presets
- id, category (wallpaper/desk/background), label, value (css/url), thumbnailUrl, isActive, sortOrder, createdAt

### feedback
- id, userId, message, type (bug/suggestion/other), status (open/reviewed/closed), createdAt

---

## Mockup Types

### Type 1 — Scene Mockup (`/app/scene`)
Controls: MacBook model, color, desk environment, day/night lighting, outer background, macOS wallpaper, app frame, screenshot upload

MacBook models: Air 13 M4 (4 colors), Air 15 M4 (4 colors), Pro 14 M4 (2 colors), Pro 16 M4 (2 colors)
Desk envs: Dark Wood, Glass Desk, Minimal White, Dark Studio, Floating
Outer backgrounds: 6 presets (dark solids + gradients)

### Type 2 — Screen Mockup (`/app/screen`)
Controls: macOS mode (light/dark), wallpaper, app frame, URL/title, screenshot upload, dock toggle

App frames: Safari, Chrome, Arc, VS Code, Finder, Terminal
Coming soon: Figma, Notion, Xcode, Linear

---

## Export

- Uses `html2canvas` (dynamic import, client-side only)
- Scale: 1×, 2×, 3× (3× gated to Pro in Phase 3)
- Output: PNG download via anchor click
- Free tier: watermark overlay (Phase 3)

---

## Phase Checklist

### Phase 1 — Complete ✓
- [x] Project scaffold (Next.js 15, Drizzle, Better Auth, Tailwind)
- [x] Auth pages (login, signup)
- [x] Screen editor (Type 2) — full
- [x] Scene editor (Type 1) — full
- [x] All 6 app frames
- [x] MacBook Air 13 + Pro 14 hardware frames
- [x] macOS MenuBar + Dock components
- [x] PNG export (html2canvas, 1×/2×/3×)
- [x] Dashboard
- [x] Admin panel (6 pages)
- [x] API routes (mockups CRUD)
- [x] DB schema (5 tables)
- [x] Landing page (full)

### Phase 2
- [ ] Mockup save to DB (wire up Save button in editors)
- [ ] Saved mockups library with thumbnails
- [ ] Re-edit saved mockup (hydrate editor from config JSON)
- [ ] Public share link (generate slug, read-only view)
- [ ] Multi-window stacking (Type 2, up to 3 windows)
- [ ] MacBook Air 15 + Pro 16 hardware frames

### Phase 3
- [ ] Lemon Squeezy Pro subscription
- [ ] 3× export gate (Pro only)
- [ ] Watermark on free exports
- [ ] Custom background image upload (Cloudinary)
- [ ] Unlimited saves gate (Pro)
- [ ] Feedback submission form

### Phase 4
- [ ] SEO pass (Airborne)
- [ ] Cloudflare Pages dual-deploy
- [ ] Umami analytics
- [ ] OG image generation (`@vercel/og`)
- [ ] Sitemap + robots.txt
