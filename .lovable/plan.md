## 1. About page card animations

Goal: bring the four feature cards, the four mini-stat cards, and the three Values cards to life.

- Add staggered fade-in-up on scroll (Framer Motion `whileInView`) on each card grid (instead of one wrapper animation).
- On hover: lift + scale (`y: -6, scale: 1.02`), accent border glow, icon pulse/rotate.
- Add a subtle gradient sheen overlay on hover for the Vision/Mission cards.
- Animate the "20+ Years" badge with a slow continuous pulse ring.

## 2. More mustard (heroGold) accent across the site

The brand already has `--hero-gold` (mustard #F4C430) but it is barely used. Increase visibility by:

- Switching select primary CTA buttons (Hire a Vehicle, Read More, Leave a Review, etc.) to use heroGold instead of muted accent gold for hover/active states.
- Add heroGold underline/divider accents under section eyebrows and H2s on Home, Fleet, Services, Destinations, About, Blogs.
- Use heroGold for icon backgrounds in feature cards (About, Services).
- Add a thin heroGold top border on Footer.
- Keep Deep Brown + Cream base intact (per brand memory). Only mustard accents are intensified.

## 3. Blog admin upgrades (`src/components/admin/BlogsManager.tsx`)

a. **Auto read-time**: compute from `body` length (≈ 200 wpm). Remove read_time input; show calculated value as read-only chip. Recompute on body change.

b. **Save as draft / Publish later / Unpublish**:
- New DB column `status text default 'published'` with values `draft | published`. Migration required.
- Form gets two save buttons: "Save as Draft" and "Publish".
- In edit mode for a published post, show "Unpublish" button (sets status='draft'); for a draft, show "Publish now".
- List shows a small badge (Draft / Published) per item.
- Public BlogsReviews page filters `.eq('status','published')` so drafts stay hidden.

c. **Category dropdown with custom option**:
- Predefined categories: Travel Tips, Destinations, Safari Guides, Vehicle & Hire, Corporate Travel, Stories, News.
- Use a Select; last option "+ Add custom" reveals an inline input that writes back to `form.category`.

d. **Share icons on blog detail page** (`src/pages/BlogDetail.tsx`):
- Add a share row (Link copy, Facebook, LinkedIn, WhatsApp optional) using lucide icons (`Link2`, `Facebook`, `Linkedin`).
- Copy-link uses `navigator.clipboard` + toast confirmation.
- FB/LinkedIn open standard share intents in a new tab with the current URL + title.

## 4. Reading progress bar on blog detail

In `src/pages/BlogDetail.tsx`:
- Fixed top progress bar (1 px → 3 px tall) tied to scroll position of the article container.
- Uses `useScroll` / `useSpring` from framer-motion already in the project. Color: heroGold gradient.

## Technical notes

- Migration: `ALTER TABLE public.blogs ADD COLUMN status text NOT NULL DEFAULT 'published' CHECK (status IN ('draft','published'));`
- `read_time` column kept (auto-populated on save) for backward compatibility.
- All new color usage stays in HSL semantic tokens (`heroGold`, `accent`, `primary`).
- No new dependencies needed.

## Files to change

- `src/pages/About.tsx` — animations
- `src/pages/BlogsReviews.tsx` — filter published, mustard accents
- `src/pages/BlogDetail.tsx` — share icons + reading progress bar
- `src/components/admin/BlogsManager.tsx` — auto read-time, draft/publish, category dropdown
- `src/components/HeroSection.tsx`, `src/components/Footer.tsx`, services/fleet/destinations pages — increased mustard accents (light touch only)
- New migration adding `blogs.status`
