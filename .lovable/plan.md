

# Services Hero + Blogs/Contact Hero Refinement

## 1. Services Page Hero (`src/pages/Services.tsx`)

### Copy uploaded photo
- `user-uploads://Gemini_Generated_Image_7zvv1b7zvv1b7zvv.png` → `src/assets/services-hero-bg.jpg`

### Update hero section
- Import `servicesHeroBg from "@/assets/services-hero-bg.jpg"`
- Add `<img>` as absolute-positioned background (object-cover, full inset) behind existing gradient
- Reduce gradient opacity to `from-primary/85 via-primary/75 to-primary/65` so the JKIA airport photo shows through while preserving text contrast
- Keep existing radial/blur accents on top
- Replace copy:
  - Eyebrow: `What We Offer` (unchanged)
  - H1: `Car Hire & Transport Services in East Africa` (was `Our Services`)
  - Subtitle: `Reliable car hire, airport transfers, safari vehicles, and corporate transport in Kenya and East Africa. Professional service, well-maintained vehicles, and competitive pricing for all your travel needs.`

## 2. Blogs & Reviews Hero (`src/pages/BlogsReviews.tsx`)

Make the plain hero feel more polished and reduce vertical size:
- Reduce padding from current (likely `py-24`) to `py-14 md:py-16`
- Add layered visual interest without a photo:
  - Base: existing brown gradient
  - Add subtle radial highlight: `bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(244,196,48,0.18),transparent_60%)]`
  - Add soft accent blurs (saffron + cream) in corners, similar to other heroes
  - Add a thin gold accent rule (`h-px w-16 bg-heroGold`) above the eyebrow for a magazine feel
- Keep all existing copy intact

## 3. Contact Us Hero (`src/pages/Contact.tsx`)

Apply the same treatment as Blogs:
- Reduce padding to `py-14 md:py-16`
- Add radial highlight + corner blur accents over the brown gradient
- Add the thin gold accent rule above the eyebrow
- Keep existing copy intact

## Files Modified
1. `src/assets/services-hero-bg.jpg` — new (copied from upload)
2. `src/pages/Services.tsx` — hero background image + new text
3. `src/pages/BlogsReviews.tsx` — refined, shorter hero
4. `src/pages/Contact.tsx` — refined, shorter hero

