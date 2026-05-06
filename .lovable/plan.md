# Admin Panel for Blogs, Reviews & Fleet

Currently blogs, reviews, and fleet data are hardcoded in the codebase (`src/pages/BlogsReviews.tsx`, `src/data/fleet.ts`). To let an admin add/edit/remove items from the live website without code changes, we need a backend. We will use **Lovable Cloud** (Supabase under the hood) for database, auth, and image storage.

## What you get

1. A protected `/admin` page with email/password login. Only users with the `admin` role can access it.
2. Three management sections inside the admin:
  - **Blogs**: add, edit, delete posts (title, excerpt, category, read time, date, image, alt text).
  - **Reviews**: add, edit, delete testimonials (name, location, text, rating, service).
  - **Fleet**: add, edit, delete vehicles matching the existing fleet structure (model name, registration, capacity, ideal for, features list, multiple images, alt text).
3. The public Blogs & Reviews page and Fleet page read from the database, so any admin change appears live on the site.
4. Image uploads handled via Supabase Storage (so admin can upload photos directly, no code).

## How it will work

### Backend (Lovable Cloud)

Tables:

- `blogs` — title, excerpt, category, read_time, published_at, image_url, alt, created_at
- `reviews` — name, location, text, rating, service, sort_order, created_at
- `fleet_units` — model_key, model_name, registration, capacity, ideal_for, features (text[]), alt, sort_order, created_at
- `fleet_images` — fleet_unit_id (fk), image_url, sort_order
- `user_roles` — user_id, role (enum: `admin`, `user`) — separate table per security best practice
- Security-definer function `has_role(user_id, role)` used in RLS policies

RLS policies:

- Public read (anyone can SELECT blogs, reviews, fleet_units, fleet_images)
- Only admins can INSERT/UPDATE/DELETE
- `user_roles`: users can read their own; only admins can modify

Storage:

- Public bucket `site-images` for blog/review/fleet photos. Admin-only write, public read.

Seed:

- Migration seeds the existing hardcoded blogs, reviews, and fleet units so the live site looks identical on day one.

### Frontend

- New route `/admin` with login screen + dashboard (tabs: Blogs / Reviews / Fleet).
- Login uses Supabase email/password auth. After signup the first admin must be promoted manually (we'll insert one role row in the seed migration tied to your email — you'll provide the email).
- Admin dashboard uses simple forms + tables with edit/delete buttons.
- Image upload component pushes file to Supabase Storage, stores returned public URL in DB.
- `src/pages/BlogsReviews.tsx` and `src/pages/Fleet.tsx` refactored to fetch from Supabase via `@tanstack/react-query` instead of importing static arrays. Visuals stay identical.
- Footer/header unchanged. Admin link not shown publicly (only accessible by typing `/admin`).

### Files added / changed

- New: `src/pages/Admin.tsx`, `src/pages/AdminLogin.tsx`, `src/components/admin/{BlogsManager,ReviewsManager,FleetManager,ImageUpload,ProtectedRoute}.tsx`
- New: `src/hooks/useAuth.ts`, `src/hooks/useIsAdmin.ts`
- New: Supabase migration creating tables, RLS, storage bucket, seed data
- Edited: `src/App.tsx` (add `/admin` route), `src/pages/BlogsReviews.tsx`, `src/pages/Fleet.tsx`, `src/data/fleet.ts` (kept as type-only or removed)

## Questions before I build

1. **Admin email**: what email should be granted admin role on first signup? (You'll sign up at `/admin` with this email and password of your choice.) [espironova@gmail.com](mailto:espironova@gmail.com) password 123456789
2. **Blog content**: blogs currently only have an excerpt, no full body. Should the admin form include a long-form body field for future full-article pages, or keep it excerpt-only like today? structure it the bst way blogs should be
3. **Existing fleet photos**: keep the existing imported images bundled in code as the seed (fastest), or do you want to re-upload everything via the admin UI later? keep the existing, admin will be uploading photo of the new fleet

## Out of scope

- Public-facing blog detail pages (each blog still shows as a card with excerpt).
- Multi-admin invite flow (additional admins promoted via DB for now).
- Rich-text editor (plain textarea for excerpt/body).