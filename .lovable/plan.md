# QR Code Landing Page (`/qr-code`)

A standalone, mobile-first conversion page designed for users scanning a QR code in vehicles, brochures, or business cards. Minimal layout, fast load, big tappable CTAs, and reuses existing booking + rate logic.

## Routing & Visibility

- New page `src/pages/QrLanding.tsx`, registered in `src/App.tsx` as `/qr-code`.
- Does NOT use the main `Layout` (no `Header`/`Footer`/main nav) so it stays distraction-free, as requested.
- Add `/qr-code` to `public/robots.txt` as `Disallow` (optional, since it's a landing not meant for SEO indexing) and exclude from `sitemap.xml`.
- Reuses the floating `WhatsAppButton` (sticky CTA) and `BookingModal` from the website.

## Page Sections

### 1. Sticky mini-header
- Small Track & Trace wordmark + phone icon (tap-to-call `+254 721 521 009`) on the right. No nav links.

### 2. Hero (above the fold)
- Background: existing safari/fleet hero image (e.g. `fleet-landcruiser.jpg`) with dark gradient overlay for legibility.
- Headline: "Reliable Transport in East Africa, Anytime, Anywhere"
- Sub: "Airport Transfers, Hotel Pickups, Corporate Travel, Safari Tours, Car Hire, School Trips"
- Two large stacked buttons (full width on mobile):
  - Primary (Saffron Gold): "Get Instant Quote / Book Now" → opens `BookingModal`
  - Secondary (WhatsApp green): "WhatsApp Us Now" → `https://wa.me/254721521009?text=...`

### 3. Quick Service Selector
- 7 large icon tiles in a 2-column grid (mobile) / 4-column (tablet+):
  Airport Transfers, Hotel Pickups, Corporate Travel, Safari & Day Tours, Car Hire, Group Transport, School Trips.
- Each tile uses Lucide icons (`Plane`, `Building2`, `Briefcase`, `Mountain`, `Car`, `Bus`, `GraduationCap`).
- Tapping a tile opens `BookingModal` with `initialVehicleType` + a pre-filled service hint (extend modal to also accept an optional `initialServiceId` prefill, mapped to existing `serviceTypes` from `src/data/rates.ts`).

### 4. Booking / Quote
- "Get Your Quote" anchor section with a single primary button that opens the existing `BookingModal` (already includes live budget estimate, vehicle + service selector).
- Secondary link: "View Full Rate Card" → routes to `/contact#rate-calculator` (add an `id="rate-calculator"` anchor on the existing `RateCalculator` section in `Contact.tsx` so the link scrolls to it).

### 5. Trust Builders
- Horizontal strip with 3 stat cards: "20+ Years Experience", "5,000+ Happy Clients", "24/7 Availability".
- Sub-line: "Licensed & Insured  |  Nairobi-based, East Africa-wide".
- Mini fleet strip: 4 thumbnails from `src/data/fleet.ts` (Land Cruiser, Hiace, Coaster, Mercedes Bus) in a horizontal scroll.

### 6. Why Choose Us
- 5 short benefit rows with Lucide icons:
  - Flight tracking & meet-and-greet (`PlaneLanding`)
  - English & Kiswahili speaking professional drivers (`Languages`)
  - Safe, clean, well-maintained vehicles (`ShieldCheck`)
  - Competitive rates, no hidden fees (`BadgeCheck`)
  - Real-time 24/7 support (`Headphones`)

### 7. Footer (compact)
- Phone, WhatsApp, Email (`info@tracktraceadventures.co.ke`), office address (Milestone Business Center, Northern Bypass, Nairobi).
- "Visit our full website →" link to `/`.
- Copyright line.

### Persistent
- `WhatsAppButton` floating sticky bottom-right (already in project).

## Technical Details

- File: `src/pages/QrLanding.tsx` (no `Layout` wrapper; renders own minimal shell).
- Route: add `<Route path="/qr-code" element={<QrLanding />} />` in `src/App.tsx`.
- Reused components: `BookingModal`, `WhatsAppButton`, `WhatsAppIcon`.
- BookingModal extension: add optional `initialServiceId?: string` prop, prefill `form.serviceId` when modal opens (mirrors existing `initialVehicleType` pattern). Service tile → modal mapping uses existing IDs from `src/data/rates.ts` (`airport`, `fullDay`, `longDist`, etc.).
- Contact page: add `id="rate-calculator"` to the rate calculator section so `/contact#rate-calculator` scrolls correctly.
- Styling: Tailwind, brand tokens (Deep Brown, Olive Gold, Cream, Saffron Gold), Playfair + Lato. No em-dashes. Uses Framer Motion for subtle fades only (keep it fast).
- Performance: lazy-load below-the-fold images with `loading="lazy"`, reuse already-bundled fleet assets (no new images needed).
- Mobile-first: hero buttons min height 56px, body font 16px+, generous tap targets, single-column under `md`.
- SEO: `<Seo>` not added (page is intentionally low-profile); add `<meta name="robots" content="noindex,nofollow">` inline on this page.

## Out of Scope

- Generating the actual QR image PNG (can be done after launch with the live URL).
- Analytics tracking for QR scans (can be added later if needed).
