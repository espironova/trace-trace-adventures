# Service Detail Pages (7 new pages)

Create 7 new service detail pages that mirror the existing `/services/airport-transfers` page, then add "Learn More" links on `/services`.

## New routes

| Route | Page file | Hero image |
|---|---|---|
| `/services/sgr-transfers` | `src/pages/SgrTransfers.tsx` | upload `SGR_TRANSFER.png` -> `src/assets/sgr-transfers-hero.png` |
| `/services/safari-tours` | `src/pages/SafariTours.tsx` | existing `fleet-landcruiser.jpg` |
| `/services/car-hire` | `src/pages/CarHire.tsx` | existing `fleet-hiace.jpg` |
| `/services/long-distance` | `src/pages/LongDistance.tsx` | upload `LONG_DISTANCE_TRANSFERS.png` -> `src/assets/long-distance-hero.png` |
| `/services/corporate-transport` | `src/pages/CorporateTransport.tsx` | upload `Corporate_Transport.png` -> `src/assets/corporate-transport-hero.png` |
| `/services/hotel-transfers` | `src/pages/HotelTransfers.tsx` | upload `Hotel_Transfers.png` -> `src/assets/hotel-transfers-hero.png` |
| `/services/schools-transport` | `src/pages/SchoolsTransport.tsx` | upload `school_transport.png` -> `src/assets/schools-transport-hero.png` |

## Shared page template

Each page reuses the exact pattern from `AirportTransfers.tsx`:

1. `Layout` wrapper, `Seo` tags with page-specific title/description.
2. Hero: full-width image + primary gradient overlay + heroGold radial accent, serif H1, sans subhead, framer-motion fade-in.
3. Service highlights: 6 cream cards in 1/2/3 col grid with Lucide icons, staggered fade-in-up, hover lift.
4. How it works: 3 numbered steps in the same numbered-circle pattern.
5. Section specific to the page (vehicles / destinations / routes / trip types / services covered) as 3-6 image or text cards.
6. Coverage band where applicable -- centered serif heading + paragraph on muted background.
7. Booking CTA reusing existing WhatsApp link `https://wa.me/254721521009?text=...`, `tel:+254721521009`, and `BookingModal`.

All headings, subheads, feature labels, steps, and coverage copy come verbatim from the user's spec.

### Per-page section data

- **SGR Transfers**: vehicles -> hiace, noah-boot, van.
- **Safari Tours**: 6 destination cards (Maasai Mara, Amboseli, Lake Nakuru, Tsavo, Samburu, Bwindi) using existing destination images from `src/assets` (will inspect `src/pages/Destinations.tsx` / `src/assets` to pick the right files; fall back to nearest match if any are missing).
- **Car Hire**: vehicles -> sedan, hiace, landcruiser, van.
- **Long Distance**: 6 route cards (icon + city pair, no images required).
- **Corporate Transport**: 4 "services covered" cards + vehicles (coaster-ext, bus, sedan).
- **Hotel Transfers**: vehicles -> sedan, noah-boot, van.
- **Schools Transport**: 4 trip-type cards + vehicles (coaster-ext, bus, hiace).

## Routing

`src/App.tsx`: add the 7 new `<Route>` entries pointing to the new page components.

## Services page links

`src/pages/Services.tsx`: replace the current `airport-transfers`-only conditional with a `learnMoreMap` keyed by `service.id`:

```text
airport-transfers      -> /services/airport-transfers   (already exists)
sgr-transfers          -> /services/sgr-transfers
safari-tours           -> /services/safari-tours
car-hire               -> /services/car-hire
long-distance          -> /services/long-distance
hotel-transfers        -> /services/hotel-transfers
corporate-cocktail     -> /services/corporate-transport
conference-transport   -> /services/corporate-transport
schools-transport      -> /services/schools-transport
```

Render the existing outline-style "Learn More" button (same classes) whenever the id is in the map. No other Services.tsx changes.

## Out of scope

No edits to Header, Footer, Navbar, WhatsAppButton, BookingModal, contact details, or any other page. All colors via semantic tokens (`accent`, `heroGold`, `primary`, `muted`).
