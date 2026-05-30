# mockX

MacBook mockup tool — two mockup types, all app frames, export at any resolution.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v3** (dark-first design system)
- **Neon PostgreSQL** + **Drizzle ORM**
- **Better Auth** (email/password)
- **Resend** (transactional email)
- **html2canvas** (PNG export)
- **Vercel** (primary) + **Cloudflare Pages** (secondary)

## Mockup Types

| Type | Route | Description |
|---|---|---|
| Screen Mockup | `/app/screen` | macOS desktop with choosable app frame |
| Scene Mockup | `/app/scene` | Full MacBook hardware on a desk scene |

## Local Setup

```bash
git clone https://github.com/mahtamun-hoque-fahim/mockX
cd mockX
npm install
cp .env.example .env.local
# Fill in .env.local
npm run db:push
npm run dev
```

## Env Vars

See `.env.example` — all vars documented there.

## Database

```bash
npm run db:push      # push schema to Neon
npm run db:generate  # generate migration files
npm run db:studio    # open Drizzle Studio
```

## Grant admin role

```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

## Deploy

**Vercel:** connect repo, add env vars, deploy.

**Cloudflare Pages:** `npm run build` → output `/.next/`. Set build command and root directory in CF Pages settings.

## Build Phases

- [x] Phase 1 — Core scaffold, auth, both editors, dashboard, admin
- [ ] Phase 2 — Mockup save/load, share links, multi-window
- [ ] Phase 3 — Pro tier (Lemon Squeezy), 3× export gate, watermarks
- [ ] Phase 4 — SEO pass, Cloudflare dual-deploy, analytics
