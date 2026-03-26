# Update Track & Trace Adventures Website

## Summary

Integrate the uploaded company logo, real fleet photos, PDF content, brand colors from the logo, rename Reviews to Blogs & Reviews, and convert the hero to a carousel using the fleet photos.

## Brand Colors (from logo)

The logo uses these colors that will replace the current palette:

- **Deep Brown** (#5C3A1E) — primary (borders, dark sections)
- **Olive Gold** (#8B7D2A) — accent (CTAs, highlights) — the green-gold ring
- **Dark Brown** (#3D2B1F) — text/foreground
- **Cream/Off-white** (#F5F0E8) — backgrounds

## Changes

### 1. Add Logo & Favicon

- Copy `WhatsApp_Image_2026-03-25_at_12.06.04.jpeg` to `public/logo.png` (favicon) and `src/assets/logo.png` (header)
- Update `index.html` favicon link
- Update `Header.tsx` to display the logo image instead of text, sized appropriately alongside the text name

### 2. Update Color Palette

- Update `src/index.css` CSS variables to match the logo's olive-gold and deep brown tones for both light and dark modes

### 3. Copy Fleet Photos to Assets

Copy all uploaded vehicle photos to `src/assets/`:

- `WhatsApp_Image_2026-03-25_at_12.16.28.jpeg` → `fleet-sedan.jpg` (Toyota Noah)
- `WhatsApp_Image_2026-03-25_at_12.16.32.jpeg` → `fleet-coaster.jpg` (Toyota Coaster bus)
- `WhatsApp_Image_2026-03-25_at_12.16.33_1.jpeg` → `fleet-van.jpg` (Nissan NV350 van)
- `WhatsApp_Image_2026-03-25_at_12.16.36_1.jpeg` → `fleet-hiace.jpg` (Toyota Hiace rear)
- `WhatsApp_Image_2026-03-25_at_12.16.38.jpeg` → `fleet-ford.jpg` (Ford Ranger 4x4)
- `WhatsApp_Image_2026-03-25_at_12.16.39.jpeg` → `fleet-bus.jpg` (Mercedes bus)
- `WhatsApp_Image_2026-03-25_at_12.16.49.jpeg` → `fleet-landcruiser.jpg` (Land Cruiser safari)
- `WhatsApp_Image_2026-03-25_at_12.16.42.jpeg` → `fleet-interior.jpg` (bus interior)

### 4. Hero Section Carousel

- Replace the single static hero image with a carousel that cycles through the fleet photos
- Each slide has a text overlay matching a service: "Airport Transfers", "Car Hire", "Safari Tours", "Long-Distance Transport"
- Auto-advances every 5 seconds with smooth crossfade animation
- Keep "Book Now" and "Our Services" CTAs
  &nbsp;

### 5. Update Fleet Page with Real Photos

- Replace generated images in `Fleet.tsx` with the uploaded fleet photos
- Update vehicle names to match actual fleet: Toyota Noah, Toyota Coaster, Nissan NV350, Toyota Hiace, Ford Ranger, Mercedes Tour Bus, Toyota Land Cruiser

### 6. Update Content from PDF

- **About page**: Update vision ("To provide exceptional transportation solutions in Kenya, ensuring every journey is reliable, comfortable, and unforgettable") and mission text from PDF
- **About page**: Update company description — "over 10 years of experience", "diverse fleet of well-maintained vehicles"
- **Services page**: Add "Travel Consultations" as a 5th service from the PDF ("Personalized guidance from our expert travel consultants")
- **Home page tagline**: Use "Car Hire Company for Destination Lovers" from the PDF in appropriate spots
- Add additional phone numbers from logo: 0736 257 553, 0722 178 334 to Contact page and footer

### 7. Rename Reviews → Blogs & Reviews

- Rename route from `/reviews` to `/blogs-reviews`
- Update `Header.tsx` nav link label to "Blogs & Reviews"
- Update `Footer.tsx` link
- Add 4-6 sample blog posts (cards with title, excerpt, date, category) above the reviews section in a new combined layout
- Blog topics: "Top 5 Safari Destinations in Kenya", "Airport Transfer Tips for First-Time Visitors", "Why Hire a 4x4 for Your Kenya Adventure", "Best Time to Visit Maasai Mara"

### 8. Replace Generated Images Across Site

- **Services page**: Use fleet photos as service images (sedan for airport transfers, Land Cruiser for safari, van for car hire, bus for long distance)
- **Home page service cards**: Same mapping
- Keep destination/landscape images (Maasai Mara, Amboseli, etc.) as-is since no landscape photos were provided

### Files Modified

- `index.html` — favicon
- `src/index.css` — brand color variables
- `src/components/Header.tsx` — logo image + nav link rename
- `src/components/Footer.tsx` — nav link rename + extra phone numbers
- `src/components/HeroSection.tsx` — full carousel rewrite
- `src/pages/Index.tsx` — update service card images
- `src/pages/Fleet.tsx` — real fleet photos and vehicle names
- `src/pages/About.tsx` — PDF content (vision, mission, about text)
- `src/pages/Services.tsx` — real photos + add Travel Consultations
- `src/pages/Reviews.tsx` — rename to BlogsReviews, add blog section
- `src/App.tsx` — update route path
- `src/pages/Contact.tsx` — add extra phone numbers