# BatesStamp

Free, in-browser Bates numbering for PDFs. Files never leave your computer.

## What it does

Drag in one or more PDFs, configure prefix / start number / padding / position, click stamp. Get back stamped PDFs (or a ZIP for batches). Everything happens client-side via [pdf-lib](https://github.com/Hopding/pdf-lib).

## Running locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Building

```bash
pnpm build
```

Outputs a static site to `out/`. Deploy that directory anywhere — no server needed.

## Deploy to Cloudflare Pages

1. Push to GitHub.
2. Cloudflare Pages → Create project → connect repo.
3. Build command: `pnpm build`
4. Build output directory: `out`
5. Environment variable: `NODE_VERSION=20` (or higher).

The `public/_headers` file ships strict CSP, security headers, and cache rules for Cloudflare Pages automatically.

## Architecture

- **Next.js 16** with `output: 'export'` for static generation.
- **pdf-lib** for stamping (pure JS, runs in browser).
- **JSZip** for batch ZIP downloads.
- **file-saver** for triggering downloads.
- **Service worker** (`public/sw.js`) for offline support — cache-first for the app shell.
- No analytics, no telemetry, no third-party CDN scripts at runtime.

## Project layout

```
app/                       # Next.js routes (landing, FAQ, alternatives pages)
components/                # React components — BatesTool, DropZone, OptionsPanel, etc.
lib/
  ├── stamp.ts             # Core PDF stamping logic
  ├── batch.ts             # Multi-file orchestration + ZIP
  └── positions.ts         # Stamp position presets
public/
  ├── _headers             # Cloudflare Pages CSP + cache headers
  ├── sw.js                # Service worker
  └── manifest.webmanifest # PWA manifest
scripts/
  └── smoke.ts             # Node smoke test for stamp logic
```

## Smoke test

```bash
pnpm dlx tsx scripts/smoke.ts
```

Generates `/tmp/sample.pdf` and `/tmp/sample-stamped.pdf`. Open both to verify output.

## Before launching publicly

- [ ] Generate icons: `public/icon-192.png`, `public/icon-512.png`, `public/icon-maskable.png`, `public/og-image.png`, `public/favicon.ico`.
- [ ] Buy domain. Update `SITE_URL` in `app/layout.tsx` and `app/sitemap.ts`.
- [ ] Manual browser test: Chrome, Firefox, Safari, Edge, locked-down corporate Edge, a Citrix demo.
- [ ] Edge cases: 500-page PDF, encrypted PDF (verify clear error), already-stamped PDF, corrupted PDF.
- [ ] Confirm Network tab during stamping shows zero requests — the privacy promise must hold.
- [ ] Lighthouse audit — target 95+ on all categories.
- [ ] Submit sitemap to Google Search Console + Bing Webmaster Tools.

## Launch channels

- r/paralegal — "Built a free Bates numbering tool that works offline / no upload"
- r/Lawyertalk, r/legaltech
- LawSites blog tip submission (Bob Ambrogi)
- LegalTechHub directory
- Hacker News Show HN (privacy / in-browser angle)
