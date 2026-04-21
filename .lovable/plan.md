

# About Hero: Add Background Image + Update Title

## Changes

### 1. Copy uploaded image
- `user-uploads://About_us.jpg` → `src/assets/about-hero-bg.jpg`

### 2. `src/pages/About.tsx` hero section
- Import `aboutHeroBg from "@/assets/about-hero-bg.jpg"`
- Add `<img src={aboutHeroBg}>` as absolute-positioned background (object-cover, full inset)
- Keep the brown gradient overlay on top at reduced opacity (e.g. `from-primary/85 via-primary/75 to-primary/60`) so the photo shows through while text stays readable
- Keep the radial/blur accents above the image
- Replace `Our Story` heading text with `Track & Trace Adventures Since 2005`

No other sections change.

