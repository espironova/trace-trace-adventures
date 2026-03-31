

# Multi-Page Updates: Partners Section, Fleet Hero, Destinations Cleanup, Blog Photos, Hyphens

## Summary
Multiple changes across About, Destinations, Fleet, Blog, and Footer pages: add partners carousel, add "Why Track & Trace" section to About, swap images, remove destinations, clean up hyphens, and fix the About hero background.

---

## 1. Copy New Assets

| Uploaded File | Asset Path | Usage |
|---|---|---|
| `Our_Fleet_background_photo.jpg` | `src/assets/fleet-hero-bg.jpg` | Fleet page hero background |
| `Tourism_Regulatory_Authority.png` | `src/assets/partner-tra.png` | Partners carousel |
| `BNI.png` | `src/assets/partner-bni.png` | Partners carousel |
| `Eagles_management_Consultant.jfif` | `src/assets/partner-eagles.jfif` | Partners carousel |
| `mashariki_Shuttle.JPG` | `src/assets/partner-mashariki.jpg` | Partners carousel |
| `WhatsApp_Image_2026-03-26_at_12.41.59_1.jpeg` | `src/assets/fleet-coaster-new.jpg` | Fleet page: Toyota Coaster (exterior shot) |
| `WhatsApp_Image_2026-03-26_at_12.41.59.jpeg` | `src/assets/fleet-bus-interior.jpg` | Blog: replace an AI-generated photo |
| `WhatsApp_Image_2026-03-26_at_12.41.58_1.jpeg` | `src/assets/fleet-bus-interior-2.jpg` | Blog: replace an AI-generated photo |
| `WhatsApp_Image_2026-03-26_at_12.41.58.jpeg` | `src/assets/fleet-van-interior-new.jpg` | Blog/Fleet: van interior photo |
| `WhatsApp_Image_2026-03-26_at_12.41.56_1.jpeg` | `src/assets/fleet-nv350-interior.jpg` | Blog/Fleet: NV350 interior |

## 2. About Page (`src/pages/About.tsx`)

**Hero background**: Replace `fleetInterior` with `bg-primary` solid color (deep brown brand color). No background image since none of the uploaded photos are suitable as a generic About hero.

**Add "Why Track & Trace" section**: Copy the "Why Track & Trace / The Track & Trace Difference" section from the homepage (the 4-card grid with icons) and place it after the Values section, before the Partners section. Import the same icon assets.

**Add Partners & Regulation section** (before Footer, after Why Track & Trace):
- Title: "Partners & Regulation"
- Subtitle: "Working with trusted partners and operating under recognized authorities."
- Auto-scrolling horizontal logo carousel (CSS `@keyframes` marquee or Framer Motion)
- Partner logos in rounded containers with soft shadows, wide spacing
- Partners: BNI, Mashariki Shuttles, Tourism Regulatory Authority, Eagles Management Consultants
- Loop infinitely with smooth continuous scroll

**Remove em dashes** from About page text. Rephrase sentences to use periods, commas, or semicolons instead.

## 3. Destinations Page (`src/pages/Destinations.tsx`)

**Remove 3 destinations** from Kenya array:
- Tsavo National Park
- Nairobi National Park
- Samburu National Reserve

Also remove their imports (`tsavoImg`, `nairobiImg`, `samburuImg`).

**Remove abbreviations**: Check if any KE, TZ, UG, RW abbreviations remain (from current code review they appear to already be removed, but will verify and clean up any remnants).

## 4. Fleet Page (`src/pages/Fleet.tsx`)

**Replace hero background**: Change `bgFleetHero` import to use the new `Our_Fleet_background_photo.jpg` (wildlife safari photo with rhinos and zebras). Update the import path.

**Add new vehicle photos**: Consider adding the uploaded coaster exterior photo as an updated Toyota Coaster image, and the interior shots where appropriate in the fleet grid.

**Remove em dashes** from Fleet page text (capacity ranges like "1–6" use en dashes which are fine; replace "—" em dashes in descriptions).

## 5. Blog Page (`src/pages/BlogsReviews.tsx`)

**Replace AI-generated blog images** with the most appropriate real uploaded photos:
- `blog-safari-destinations.jpg` → use `maasai-mara.jpg` (real Maasai Mara photo)
- `blog-airport-tips.jpg` → use `fleet-sedan.jpg` (real Toyota Noah photo)
- `blog-4x4-adventure.jpg` → use `fleet-landcruiser.jpg` (real Land Cruiser photo)
- `blog-maasai-mara-season.jpg` → use `amboseli.jpg` (real Amboseli elephants photo)
- `blog-long-distance.jpg` → use the new bus interior photo (`fleet-bus-interior.jpg`)

## 6. Global Hyphen Cleanup

Replace em dashes (—) with proper punctuation (periods, commas, semicolons, or "and") across all pages:
- `About.tsx`
- `Fleet.tsx`
- `Index.tsx`
- `Services.tsx`
- `Destinations.tsx`
- `Footer.tsx`
- `BlogsReviews.tsx`
- `Contact.tsx`
- `RateCalculator.tsx`

---

## Files Modified

1. **`src/pages/About.tsx`** — New hero (solid brand color), add "Why Track & Trace" section, add Partners carousel, remove hyphens
2. **`src/pages/Destinations.tsx`** — Remove Tsavo, Nairobi NP, Samburu; remove any remaining abbreviations
3. **`src/pages/Fleet.tsx`** — New hero background image, remove hyphens
4. **`src/pages/BlogsReviews.tsx`** — Replace AI blog images with real fleet/destination photos
5. **`src/pages/Index.tsx`** — Remove hyphens
6. **`src/pages/Services.tsx`** — Remove hyphens
7. **`src/pages/Contact.tsx`** — Remove hyphens
8. **`src/components/Footer.tsx`** — Remove hyphens
9. **`src/components/RateCalculator.tsx`** — Remove hyphens

## Technical Notes

- Partners carousel: CSS animation (`translateX` keyframes) for smooth infinite scroll, duplicating logos for seamless loop
- Logo containers: `rounded-xl shadow-md bg-white p-6` with generous spacing for premium feel
- "Why Track & Trace" reuses the same `whyUs` data and icon imports from `Index.tsx`

