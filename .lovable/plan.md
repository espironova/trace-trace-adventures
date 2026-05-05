## Problem diagnosis

Two separate issues are visible in the Google result for "track and trace adventures":

**1. The orange/red square (the so-called "Lovable icon")**
Google fetches `/favicon.ico` first when picking a search-result icon. Live test:

```
GET https://www.tracktraceadventures.co.ke/favicon.ico  ->  404
GET https://www.tracktraceadventures.co.ke/icon.png     ->  200 (1600x1600 PNG, 328 KB)
GET https://www.tracktraceadventures.co.ke/favicon.png  ->  200 (tiny, 2.9 KB, ~16x16)
```

The current state:
- `public/favicon.ico` exists locally but the live host returns 404 (the `apex -> www` 308 plus a missing route makes `/favicon.ico` unreachable on www).
- `public/favicon.png` is only a 16x16 thumbnail (2.8 KB) — too small/blurry for Google.
- Next.js (after the migration workflow runs) auto-promotes `apple-touch-icon.png` to `/icon.png` at 1600x1600. Google ignores oversized icons, so it falls back to a generic placeholder — that is the "orange Lovable" square the user sees. (On phones Google often shows the Knowledge-Graph photo from your Google Business Profile instead, which is why mobile looks fine.)

**2. Sitelinks pointing to wrong / 404 pages**
The Google result shows links to `Safari Tours`, `About Us`, `All Team Members`, `Contact Us`. Live test:

```
/safari-tours       -> 404
/all-team-members   -> 404
/team               -> 404
/tours              -> 404
```

These URLs do not exist in `src/App.tsx`. They are historical paths from a previous version of the site that Google has not yet recrawled. Reindexing alone will not fix them because the URLs simply do not resolve. The fix is server-side 301 redirects so the legacy links land on the right new page (and Google's index updates over the next crawl).

There is currently no `vercel.json` and no redirect logic anywhere in the repo, so nothing routes those legacy paths.

---

## Plan

### 1. Replace favicon assets with properly sized files (high priority)

Use the existing brand mark (the lion-and-mountain logo from `src/assets/logo.png`) as the source. Generate:

- `public/favicon.ico` — multi-size .ico containing 16x16, 32x32, 48x48 (this is the file Google uses).
- `public/favicon-32x32.png` — 32x32 PNG.
- `public/favicon-96x96.png` — 96x96 PNG (recommended size for Google search result favicons; minimum is 48x48 and must be a multiple of 48).
- Replace `public/favicon.png` with a 96x96 version (currently 16x16).
- Replace `public/apple-touch-icon.png` with a clean 180x180 version (currently 1600x1600, way too large; Next.js promotes this oversized file to `/icon.png` and `/apple-icon.png`, which is part of why Google rejects it).
- Keep `public/icon-192.png` and `public/icon-512.png` for PWA / `site.webmanifest` (already present and correctly sized).

Update `index.html` `<head>` to declare the icons explicitly so both the Vite preview AND the Next.js migration pick them up:

```html
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

Generation will be done in the build environment with ImageMagick (`nix run nixpkgs#imagemagick`) from `src/assets/logo.png`. The result is committed to `public/` so the GitHub migration workflow (`migrate-to-nextjs.yml`) picks them up like any other static asset and Vercel serves them on the next deploy.

### 2. Add `vercel.json` with 301 redirects for legacy URLs

Create a new file at the repo root: `vercel.json`. Redirects are applied by Vercel's edge before Next.js routing, so they work whether the SPA or migrated Next.js app is deployed.

```json
{
  "redirects": [
    { "source": "/safari-tours",     "destination": "/services",  "permanent": true },
    { "source": "/all-team-members", "destination": "/about",     "permanent": true },
    { "source": "/team",             "destination": "/about",     "permanent": true },
    { "source": "/about-us",         "destination": "/about",     "permanent": true },
    { "source": "/contact-us",       "destination": "/contact",   "permanent": true },
    { "source": "/tours",            "destination": "/destinations", "permanent": true },
    { "source": "/car-hire",         "destination": "/services",  "permanent": true },
    { "source": "/airport-transfers","destination": "/services",  "permanent": true }
  ]
}
```

(Final list will be confirmed against any other 404s discovered while implementing — for example `/blog`, `/reviews`, `/our-fleet`.)

301 redirects tell Google to transfer the indexed page (and any link equity) to the new URL. After the next crawl the sitelinks will update to the correct destinations.

### 3. Verify and re-submit

After deploy:
- `curl -I https://www.tracktraceadventures.co.ke/favicon.ico` should return 200 (not 404) and `Content-Type: image/x-icon`.
- `curl -I https://www.tracktraceadventures.co.ke/safari-tours` should return 308/301 to `/services`.
- In Google Search Console: re-submit the sitemap and request reindex of `/`, `/about`, `/services`, `/contact`. Favicon updates can take 1–2 weeks even after fixing — this is on Google's side and we cannot speed it up.

### Files to add or modify

- `public/favicon.ico` (regenerated, multi-size)
- `public/favicon.png` (regenerated to 96x96)
- `public/favicon-32x32.png` (new)
- `public/favicon-96x96.png` (new)
- `public/apple-touch-icon.png` (regenerated to 180x180)
- `index.html` (add the icon `<link>` tags)
- `vercel.json` (new — 301 redirects)

### Out of scope

- No code/UI changes.
- No changes to the Next.js migration workflow (`.github/workflows/migrate-to-nextjs.yml`); the migration already copies `public/` and respects `vercel.json`.
- We cannot force Google to re-crawl on a schedule. The fixes are correct and durable — refreshing the search snippet is on Google's side.
