

# Destinations Page Redesign + Fleet Hero + New Images

## Summary

Major redesign of the Destinations page layout, add background images to hero sections, update Fleet hero with animated design, add remaining destination images, and replace "Book Trip" with car-hire wording.

---

## 1. Copy Assets

- `Background_Destination.png` → `src/assets/bg-destinations.png` (Destinations hero background)
- `Background_our_fleet_design_hero_section.JPG` → `src/assets/bg-fleet-hero.jpg` (Fleet hero background)
- `Kisumu.jpg` → `src/assets/kisumu.jpg`
- `mt_Kenya_Hiking_and_Climbing.avif` → `src/assets/mt-kenya.avif`
- `Amboseli_National_Park.jpg` → update `src/assets/amboseli.jpg`
- `Masai_Mara_National_Reserve.jpg` → update `src/assets/maasai-mara.jpg`

(Hells-Gate-National-2, lake-nakuru-2, Mombasa-2 are alternate shots — skip since we already have images for those destinations)

## 2. Destinations Page Redesign (`src/pages/Destinations.tsx`)

**Hero section**: Replace solid `bg-primary` with a full-bleed background image using `bg-destinations.png`, with a dark overlay for text readability.

**Remove**: Destination counts (line 199: "X destinations") and country abbreviations.

**Replace "Book Trip"** with **"Hire a Vehicle"** — fits the car hire business model.

**New layout per country section**: Instead of carousels, each destination appears as a full-width row with:
- **Left side (40%)**: Destination name, description text, and "Hire a Vehicle" CTA link
- **Right side (60%)**: Large destination photo in a card format
- Alternating layout: odd rows = text left / photo right, even rows = photo left / text right
- Each destination animates in with Framer Motion `whileInView` (slide from left for text, slide from right for photo, meeting in the middle)
- Country header remains (flag + country name) but without the count line

## 3. Fleet Page Hero Update (`src/pages/Fleet.tsx`)

Replace the solid `bg-primary` hero with the uploaded background image (`bg-fleet-hero.jpg`). Add a dark gradient overlay. Within the hero, add an animated fleet showcase: auto-cycling through fleet vehicle images with crossfade transitions (similar to the homepage hero carousel pattern), showing each vehicle name as overlay text.

## 4. Update Remaining Placeholder Destinations

Replace `ph` references:
- Mount Kenya → `mt-kenya.avif`
- Kisumu → `kisumu.jpg`

This eliminates all remaining placeholders on the Destinations page.

---

## Files Modified

1. **`src/pages/Destinations.tsx`** — Full redesign: background hero image, remove carousels, new split-layout per destination, remove counts, replace "Book Trip" with "Hire a Vehicle", add Kisumu + Mt Kenya images
2. **`src/pages/Fleet.tsx`** — Hero section with background image + animated vehicle showcase carousel
3. **`src/pages/Index.tsx`** — Update any "Book Trip" references to "Hire a Vehicle" if present

## Technical Notes

- The new destination layout uses CSS Grid (60/40 split) with `whileInView` animations for the meet-in-middle effect
- Fleet hero uses `AnimatePresence` with crossfade for vehicle image cycling (reuses pattern from `HeroSection.tsx`)
- Background images use `object-cover` with absolute positioning and gradient overlays

