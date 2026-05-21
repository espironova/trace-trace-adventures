# Airport Transfers Landing Page

New dedicated route `/services/airport-transfers` plus a "Learn More" link from the existing Services page. Design, fonts, colors, spacing, cards, buttons, and motion patterns mirror the rest of the site exactly. No changes to header, footer, navbar, WhatsApp links, or contact details.

## What gets built

1. **New page** `src/pages/AirportTransfers.tsx` wrapped in the shared `Layout` so it inherits header/footer/WhatsApp button. Sections, in order:
   - **Hero** — full-width hero in the same style as `Services.tsx` hero (min-h-[80vh], primary gradient overlay, heroGold radial accent, eyebrow + serif H1 + sans subhead). Background image is the uploaded `airport_transfers.png` (copied to `src/assets/airport-transfers-hero.png` and imported).
     - Eyebrow: "Airport Transfers"
     - H1: "JKIA & Wilson Airport Transfers Nairobi"
     - Sub: "Professional 24/7 airport pickup and drop-off. Meet & greet service, real-time flight tracking, fixed pricing — no hidden fees."
   - **Service highlights** — 6 feature cards in a responsive grid (1 / 2 / 3 columns). Same card treatment used on About/Services: cream card surface, accent icon, serif title, sans body, framer-motion staggered fade-in-up on scroll, subtle lift on hover. Lucide icons: Handshake, PlaneTakeoff, BadgeDollarSign, Clock, Luggage, Wifi.
   - **How it works** — 3 numbered steps, same alternating/centered step pattern used elsewhere. Each step: heroGold circular number badge, serif heading, sans description.
     1. Book via WhatsApp or online
     2. Driver meets you at arrivals with name board
     3. Comfortable ride to your destination
   - **Vehicles available** — 3-card grid showing `fleet-sedan.jpg`, `fleet-noah-boot.jpg`, `fleet-hiace.jpg` with model name + short blurb, reusing the existing site card style.
   - **Coverage** — single centered band with serif H2 "We Cover All of Nairobi & Beyond" and the provided paragraph, styled like other intro bands on the site.
   - **Booking CTA** — primary accent "Book This Service" button (opens shared `BookingModal`) plus the exact same WhatsApp link/message and phone numbers already used site-wide (sourced from `WhatsAppButton.tsx` / footer). No new copy or numbers introduced.

2. **Route registration** — add `<Route path="/services/airport-transfers" element={<AirportTransfers />} />` in `src/App.tsx`.

3. **Services page update** (`src/pages/Services.tsx`) — under the Airport Transfers section (id `airport-transfers`), add a secondary "Learn More" link styled like the existing "Book This Service" button (same height/typography/tracking, outline variant using accent border + accent text so the two buttons read as a pair) that routes to `/services/airport-transfers`. No other changes to that page.

4. **SEO** — page-level title/description via the existing `Seo` pattern (or document head update consistent with other pages) targeting "JKIA airport transfers Nairobi".

## Technical notes

- Asset: copy `user-uploads://airport_transfers.png` → `src/assets/airport-transfers-hero.png`, import as ES6 module.
- Colors: only semantic tokens (`bg-primary`, `text-accent`, `text-heroGold`, `bg-background`, `bg-muted`, `text-primary-foreground`). No raw hex.
- Motion: reuse the `fadeInUp` pattern from `Services.tsx` for section reveals.
- WhatsApp: reuse the exact href from `WhatsAppButton.tsx` (`https://wa.me/254721521009?text=...`). Do not alter.
- Phone: reuse the existing `tel:+254721521009` already in the site (e.g., in `BookingModal`/footer).
- Responsive: mobile-first grids (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`), hero text sizes step with `md:` / `lg:` like `Services.tsx`.
- No edits to `Header`, `Footer`, `WhatsAppButton`, `BookingModal`, contact data, or any unrelated page.

## Files touched

- Add: `src/pages/AirportTransfers.tsx`
- Add: `src/assets/airport-transfers-hero.png` (copied from upload)
- Edit: `src/App.tsx` (one new route)
- Edit: `src/pages/Services.tsx` (add "Learn More" link under airport-transfers section)