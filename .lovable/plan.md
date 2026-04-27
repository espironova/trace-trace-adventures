## Problem

When the site is shared or indexed, two Lovable-branded assets show up:

1. **Favicon in browser tabs / Google search results** — `public/favicon.ico` still exists. Browsers and crawlers automatically request `/favicon.ico` and use it in preference to anything declared in `<head>`, so even though `index.html` references `/favicon.png` (the company logo), the old `favicon.ico` (Lovable icon) keeps winning.
2. **Social link previews (WhatsApp, Facebook, LinkedIn, Twitter, iMessage, etc.)** — both `index.html` and `src/lib/seo.ts` set `og:image` / `twitter:image` to a Lovable-hosted preview screenshot:
   `https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/.../id-preview-...lovable.app-...png`
   That screenshot is taken inside the Lovable preview chrome, so the Lovable icon is visible in shared link cards.

`lovable.migrate.json` also references the same Lovable URL as `ogImage`.

## Fix

### 1. Delete the Lovable favicon.ico
- Remove `public/favicon.ico` so browsers fall back to the declared `/favicon.png` (already the Track & Trace logo).

### 2. Replace the OG / Twitter preview image with the company logo
- Copy `src/assets/logo.png` to `public/og-image.png` so it's served from the site's own domain at `/og-image.png` (full URL: `https://tracktraceadventures.co.ke/og-image.png`).
- Update `index.html`:
  - `<meta property="og:image" content="https://tracktraceadventures.co.ke/og-image.png">`
  - `<meta name="twitter:image" content="https://tracktraceadventures.co.ke/og-image.png">`
- Update `src/lib/seo.ts`:
  - `DEFAULT_OG_IMAGE = "https://tracktraceadventures.co.ke/og-image.png"`
- Update `lovable.migrate.json`:
  - `"ogImage": "https://tracktraceadventures.co.ke/og-image.png"`

### 3. Note on cached previews
After deploying, existing previews on Facebook, WhatsApp, LinkedIn, Twitter, and Google may still show the old Lovable image until their caches refresh. The user may need to:
- Re-share the link in WhatsApp (it re-fetches after a few hours/days).
- Use Facebook's Sharing Debugger and LinkedIn's Post Inspector to force a re-scrape.
- Wait for Google to recrawl (or request reindex in Search Console).

This is normal cache behavior, not a code issue.

## Files Modified
1. `public/favicon.ico` — deleted
2. `public/og-image.png` — new (copy of `src/assets/logo.png`)
3. `index.html` — update `og:image` and `twitter:image`
4. `src/lib/seo.ts` — update `DEFAULT_OG_IMAGE`
5. `lovable.migrate.json` — update `ogImage`
