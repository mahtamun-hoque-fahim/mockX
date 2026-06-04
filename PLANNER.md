# mockX — PLANNER.md

## Product

MacBook mockup tool. Two distinct mockup types. Landing page + app + admin.

---

## Architecture

```
src/
├── app/
│   ├── page.tsx                              # Landing page (hero, how-it-works, types, frames, pricing)
│   ├── layout.tsx                            # Root layout + fonts (Syne, Onest, JetBrains Mono)
│   ├── globals.css                           # Tailwind + CSS vars + editor-canvas dot grid
│   ├── sitemap.ts                            # Dynamic sitemap (static + public share pages)
│   ├── robots.ts                             # Robots.txt
│   ├── (auth)/login|signup                   # Auth pages (Better Auth email/password)
│   ├── (app)/dashboard|screen|scene|mockups|settings  # App (auth-protected)
│   ├── admin/dashboard|users|mockups|presets|feedback|settings  # Admin (role=admin)
│   ├── share/[slug]                          # Public read-only mockup view
│   └── api/
│       ├── auth/[...all]                     # Better Auth handler
│       ├── og                                # OG image generation (next/og, edge runtime)
│       ├── mockups (GET list / POST create)  # Save limit enforced: 20 free / unlimited Pro
│       ├── mockups/[id] (GET/PATCH/DELETE)
│       ├── mockups/[id]/share (POST/DELETE)  # Toggle public + generate slug
│       ├── user/profile (PATCH)
│       ├── user/password (PATCH)
│       └── feedback (POST)
├── components/
│   ├── ui/                 # button, input, badge
│   ├── pro/                # UpgradeModal (fires on 3× export, save limit, share)
│   ├── frames/             # Safari, Chrome, Arc, Firefox, VS Code, Finder, Terminal
│   ├── macbook/            # MacBook Air 13/15 M4, Pro 14/16 M4 (CSS/SVG frames)
│   ├── macos/              # MenuBar, Dock (SVG icons only)
│   ├── editor/             # ScreenEditor, SceneEditor (multi-window, save, re-edit, gating)
│   ├── mockups/            # MockupsGrid (edit/delete/share actions, gradient previews)
│   ├── settings/           # AccountSettings (name, password, sign out, danger zone)
│   └── landing/            # Navbar, Hero, HowItWorks, MockupTypes, FramesMarquee,
│                           # Pricing, FeedbackWidget, Footer
└── lib/
    ├── auth.ts             # Better Auth server config
    ├── auth-client.ts      # Better Auth client
    ├── db/schema.ts        # Drizzle schema (7 tables)
    ├── db/index.ts         # Neon HTTP driver (edge-compatible)
    └── utils.ts            # cn(), formatDate(), generateSlug()
```

---

## Routes

| Route | Auth | Description |
|---|---|---|
| `/` | No | Landing page |
| `/login` | No | Sign in |
| `/signup` | No | Create account |
| `/app/dashboard` | Yes | Recent mockups + quick start |
| `/app/screen` | Yes | Screen Mockup editor (Type 2) · `?id=` for re-edit |
| `/app/scene` | Yes | Scene Mockup editor (Type 1) · `?id=` for re-edit |
| `/app/mockups` | Yes | Saved mockups library (edit/delete/share) |
| `/app/settings` | Yes | Account settings |
| `/share/[slug]` | No | Public read-only mockup view |
| `/admin` | admin | Stats dashboard (live from DB) |
| `/admin/users` | admin | User management |
| `/admin/mockups` | admin | All mockups |
| `/admin/presets` | admin | Preset management |
| `/admin/feedback` | admin | Feedback inbox |
| `/admin/settings` | admin | Feature flags |
| `/api/auth/[...all]` | — | Better Auth handler |
| `/api/og` | No | OG image generation (edge runtime) |
| `/api/mockups` | Yes | GET list / POST create (save limit enforced) |
| `/api/mockups/[id]` | Yes | GET / PATCH / DELETE |
| `/api/mockups/[id]/share` | Yes | POST generate slug / DELETE revoke |
| `/api/user/profile` | Yes | PATCH name |
| `/api/user/password` | Yes | PATCH password |
| `/api/feedback` | No | POST feedback |

---

## DB Schema

### users
id, name, email, emailVerified, image, role (guest/user/pro/admin), banned, createdAt, updatedAt

### sessions / accounts / verifications
Standard Better Auth tables

### mockups
id, userId, type (scene/screen), title, config (jsonb), thumbnailUrl, isPublic, shareSlug, createdAt, updatedAt

### presets
id, category (wallpaper/desk/background), label, value (css/url), thumbnailUrl, isActive, sortOrder, createdAt

### feedback
id, userId, message, type (bug/suggestion/other), status (open/reviewed/closed), createdAt

---

## Mockup Types

### Type 1 — Scene Mockup (`/app/scene`)
Controls: MacBook model (Air 13/15 M4, Pro 14/16 M4), color, desk env (5 options), day/night, outer bg (6), macOS wallpaper (6), browser frame (4), screenshot, screen mode

Export: 1×/2× free (watermarked) · 3× Pro only

### Type 2 — Screen Mockup (`/app/screen`)
Controls: macOS mode, wallpaper (8), frame (7: Safari/Chrome/Arc/Firefox/VSCode/Finder/Terminal), URL/title, screenshot (drag/drop/paste), dock toggle, multi-window (up to 3, stacked)

Export: 1×/2× free (watermarked) · 3× Pro only

---

## Pro Gating

| Feature | Free | Pro |
|---|---|---|
| Export 1× / 2× | ✓ | ✓ |
| Export 3× | Modal → upgrade | ✓ |
| Watermark on export | Yes | No |
| Save limit | 20 mockups (403 enforced) | Unlimited |
| Share links | ✓ | ✓ |
| Custom bg upload | — | Planned |

---

## Deployment

### Vercel (primary)
```bash
# Connect repo, add env vars from .env.example, deploy
```

### Cloudflare Pages (secondary)
```bash
npm run build:cf          # builds via @opennextjs/cloudflare
# Set CF Pages build command: npm run build:cf
# Set output dir: .open-next/assets
# Add nodejs_compat flag in wrangler.jsonc
# Env vars: add via CF dashboard
```

---

## Phase Checklist

### Phase 1 ✓
- [x] Scaffold (Next.js 15, Drizzle, Better Auth, Tailwind)
- [x] Auth pages (login, signup)
- [x] Screen editor (Type 2) — 7 frames, multi-window, drag/drop/paste
- [x] Scene editor (Type 1) — 4 MacBook models, 5 desk envs, day/night
- [x] macOS MenuBar + Dock (SVG icons)
- [x] PNG export (html2canvas, 1×/2×/3×)
- [x] Dashboard
- [x] Admin panel (6 pages + live DB stats)
- [x] API routes (auth, mockups CRUD, feedback)
- [x] DB schema (7 tables)
- [x] Landing page (hero, types, frames marquee, pricing)

### Phase 2 ✓
- [x] MacBook Air 15 M4 + Pro 16 M4 frames
- [x] Firefox browser frame
- [x] Multi-window stacking (Type 2, up to 3)
- [x] Save to DB (both editors) with title
- [x] Re-edit from saved config (?id= param)
- [x] Mockups library (grid, edit/delete/share)
- [x] Share link system (slug, public view, unshare)
- [x] Settings page (profile, password, sign out)
- [x] API: profile, password, share

### Phase 3 + 4 ✓
- [x] Pro upgrade modal (Zap icon trigger, feature list, price)
- [x] 3× export gate (Pro only, upgrade modal on click)
- [x] Watermark on free exports (html2canvas overlay)
- [x] Save limit enforcement (20 free, 403 → upgrade modal)
- [x] Feedback form (landing footer + API)
- [x] OG image route (/api/og, edge runtime, next/og)
- [x] Share page OG metadata (title, description, og:image, twitter:card)
- [x] Landing metadata (openGraph, twitter, keywords)
- [x] How It Works section (landing page)
- [x] sitemap.ts (static + public share pages)
- [x] robots.ts
- [x] Dashboard with real recent mockups
- [x] Admin stats from live DB
- [x] Cloudflare Pages config (wrangler.jsonc, open-next.config.ts)
- [x] @opennextjs/cloudflare + wrangler devDependencies

### Phase 5 ✓
- [x] Lemon Squeezy billing (checkout, portal, webhook handler — full subscribe/cancel flow)
- [x] Subscriptions table in DB (lsSubscriptionId, lsCustomerId, status, currentPeriodEnd)
- [x] Settings billing section (plan badge, manage billing / upgrade CTA)
- [x] Upgrade success banner on return from Lemon Squeezy (?upgraded=1)
- [x] Pro upgrade confirmation email (Resend)
- [x] Welcome email on signup (Better Auth databaseHooks)
- [x] Figma frame (layers panel, canvas, properties panel)
- [x] Notion frame (sidebar, page list, content area)
- [x] Xcode frame (navigator, editor, status bar)
- [x] 10 total app frames (up from 7)
- [x] Thumbnail generation on save (html2canvas 0.13× JPEG stored as thumbnailUrl)
- [x] Admin role change UI (inline select dropdown, PATCH /api/admin/users/[id])
- [x] Umami analytics (optional script in layout, guarded by NEXT_PUBLIC_UMAMI_ID)
- [x] .env.example with all Phase 5 vars (LS keys, Umami, Cloudinary)

### Phase 6 ✓
- [x] PWA manifest + icon (next/og-generated, maskable, 192+512)
- [x] Custom 404 page (animated MacBook frame graphic)
- [x] Global error.tsx + app-level error.tsx (error boundaries)
- [x] Cloudinary upload API (/api/upload, Pro-gated, 8MB limit, JPEG/PNG/WebP)
- [x] Custom wallpaper upload in Screen editor (Pro badge, upgrade modal)
- [x] Custom background upload in Scene editor (Pro badge, upgrade modal)
- [x] CustomUploadButton component (reusable, Pro-gate aware)
- [x] Linear frame (sidebar, issues list, toolbar with filter/group)
- [x] Slack frame (aubergine sidebar, channels, DMs, message input)
- [x] 12 total app frames (Safari Chrome Arc Firefox VSCode Finder Terminal Figma Notion Xcode Linear Slack)
- [x] Cursor-based pagination in GET /api/mockups (?cursor= ISO string)
- [x] MockupsGrid with Load More button (fetches next page on click)
- [x] Mockups page updated for paginated API shape
- [x] Rate limiting in feedback API (Upstash Redis with no-op fallback)
- [x] src/lib/ratelimit.ts — graceful degradation if Upstash not configured
- [x] Frames marquee: 12 frames, double-row, second row reverse direction
- [x] App layout: sticky header, Pro badge, avatar links to settings
- [x] .env.example: Upstash Redis vars added

### Phase 7 (future)
- [ ] Admin: bulk delete mockups
- [ ] Discord frame
- [ ] Email verification flow (resend verification link)
- [ ] Mockup duplication (clone button in grid)
- [ ] Keyboard shortcuts in editor (⌘S save, ⌘E export)
- [ ] Dark/light mode for mockX UI itself (currently dark-only)
