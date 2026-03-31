

# Track and Trace Adventures — Major Update Plan

This is a large update touching nearly every page. Here is the breakdown:

---

## 1. Rebrand from "Kenya" to "East Africa"

Update all references across the site where "Kenya" appears in general branding context to "East Africa". This affects:
- **HeroSection.tsx**: "Your Gateway to Kenya's Greatest Adventures" → "East Africa's"
- **Index.tsx**: Services description, CTA banner ("Ready to Explore Kenya?"), "Why Us" section (local expertise text), destinations section header
- **Services.tsx**: Page subtitle, safari tour descriptions
- **About.tsx**: Story text, vision/mission, values section
- **Destinations.tsx**: Header text
- **Footer, Header** if they contain Kenya-only references

*Note: Specific Kenya locations (like "Nairobi") remain unchanged — only generic "Kenya" branding gets updated to "East Africa".*

---

## 2. Add New Services (Home + Services pages)

Add 5 new service categories to **both** the homepage services grid and the Services page:

1. **Hotel-to-Hotel Transfers** — Within Nairobi city transfers
2. **Corporate Cocktail Transport** — Event and cocktail transport
3. **Conference Transport** — Corporate conferences and meetings
4. **International Schools Transport** — Sports, education trips, co-curricular activities
5. **Dinner Transport** — Evening event pickups (6pm-11pm)

Each will have a title, description, icon, feature list, and use existing fleet images as backgrounds. The homepage will show a curated selection (perhaps 6 cards in a 2x3 grid), and the Services page will have full detailed sections for all services.

---

## 3. About Page — 20 Years Badge

- Add a prominent "20 Years" badge/icon in the hero or story section of the About page
- Use a styled circular or shield-shaped badge with "20+" and "Years of Excellence" text
- Built with Tailwind CSS + Lucide icons (no external image needed)
- Update the existing "10+ Years" references to "20+ Years" across the site

---

## 4. Rate Calculator + Rate Sheet

### Rate Calculator
Create a new **RateCalculator** component placed on:
- A dedicated section on the homepage (after destinations or before CTA)
- The Services page
- Optionally the Contact page

The calculator form will include:
- **Vehicle type** dropdown (8-Pax Safari, 8-Pax Van, 14-Pax Coaster, 22-Pax Mercedes Shuttle, 33/37-Pax Mercedes Bus, 45-Pax Bus)
- **Service type** dropdown (Long distance, Full-day disposal, Airport transfer, Hotel-to-hotel, Dinner, Corporate cocktail, Standby)
- **For long distance**: a km input field (min 120km)
- **Number of days** (for applicable services)
- A "Calculate" button that shows the estimated cost
- Results display with driver's allowance shown separately as an additional cost

### Rate data (from the uploaded PDF):

```text
Vehicle Types & Rates:
- 8-Pax Safari: Long dist 25,000/day | Full-day 25,000 | Airport 15,000 | Hotel 10,000 | Dinner 10,000 | Cocktail 10,000 | Standby 10,000
- 8-Pax Van: Long dist 130/km | Full-day 20,000 | Airport 10,000 | Hotel 12,000 | Dinner 10,000 | Cocktail 12,000 | Standby 12,000
- 14-Pax Coaster: Long dist 60/km | Full-day 12,000 | Airport 7,000 | Hotel 8,000 | Dinner 8,000 | Cocktail 10,000 | Standby 10,000
- 22-Pax Mercedes: Long dist 100/km | Full-day 17,000 | Airport 12,000 | Hotel 12,000 | Dinner 12,000 | Cocktail 12,000 | Standby 12,000
- 33/37-Pax Bus: Long dist 130/km | Full-day 20,000 | Airport 15,000 | Hotel 15,000 | Dinner 15,000 | Cocktail 15,000 | Standby 15,000
- 45-Pax Bus: Long dist 150/km | Full-day 30,000 | Airport 18,000 | Hotel 18,000 | Dinner 18,000 | Cocktail 15,000 | Standby 25,000

Driver Allowances: 2,500 | 2,000 | 2,000 | 2,500 | 3,000 | 4,000
```

### Rate Sheet
A styled table/card view showing all rates in a readable format, placed below the calculator as a reference section. Includes a note about excluded costs (driver allowance, park entrance fees, parking fees).

---

## 5. Homepage Destinations — 4 East Africa Cards

Replace the current 3 Kenya-only destination cards with 4 cards representing East Africa:
- **Maasai Mara, Kenya** 🇰🇪
- **Arusha, Tanzania** 🇹🇿
- **Kampala, Uganda** 🇺🇬
- **Kigali, Rwanda** 🇷🇼

Each with a placeholder/stock-style image (using existing assets or placeholder), country flag emoji, short description, and link to the destinations page.

---

## 6. Destinations Page — Country Sections with Carousels

Completely restructure the Destinations page:

### Structure
- Hero section (updated for East Africa)
- **4 country tabs/sections** with flag emojis:
  - 🇰🇪 **Kenya** (17 destinations): Mombasa, Diani Beach, Watamu, Malindi, Lake Elementaita, Lake Naivasha, Lake Nakuru, Hell's Gate, Maasai Mara, Amboseli, Mount Kenya, Aberdare, Kisumu, 14 Falls, Ngare Ndare, Camp Dunda, Nanyuki
  - 🇹🇿 **Tanzania** (5): Mount Kilimanjaro, Dar es Salaam, Zanzibar, Lake Manyara, Arusha
  - 🇺🇬 **Uganda** (5): Bwindi Impenetrable, Murchison Falls, Rwenzori Mountains, Kampala, Jinja
  - 🇷🇼 **Rwanda** (4): Kigali, Lake Kivu, Nyungwe Forest, Akagera

### Each country section
- Country header with flag
- Animated carousel of destination cards (Framer Motion)
- Each card: destination name, short description, and a "Book This Trip" CTA
- Use existing images where available, placeholder for new destinations

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/RateCalculator.tsx` | **Create** — calculator form + rate sheet |
| `src/pages/Index.tsx` | **Modify** — East Africa text, new services, 4 destination cards, add calculator section |
| `src/pages/Services.tsx` | **Modify** — East Africa text, add 5 new service sections |
| `src/pages/About.tsx` | **Modify** — 20 years badge, East Africa text |
| `src/pages/Destinations.tsx` | **Rewrite** — country sections with carousels, all destinations |
| `src/components/HeroSection.tsx` | **Modify** — East Africa text |
| `src/components/Footer.tsx` | **Modify** — East Africa references if present |

---

## Technical Notes

- Rate data will be hardcoded as a TypeScript constant (no backend needed)
- Calculator uses React state for form + computed result display
- Destination carousels reuse the existing Framer Motion carousel pattern from Services page
- New destinations without images will use `public/placeholder.svg` until real images are added
- The 20-years badge is a pure CSS/Tailwind component with Lucide Award icon
- All new services content written with professional marketing copy matching existing tone

