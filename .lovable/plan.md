## Make existing blogs/reviews editable + admin onboarding flow

Right now the original blogs and reviews live as hardcoded arrays in `src/pages/BlogsReviews.tsx`. The admin panel only shows database rows, so you can't edit the originals. Other admins also have no way in.

### Part 1: Seed existing content into the database

Insert all 5 hardcoded blogs and 8 hardcoded reviews into the `blogs` and `reviews` tables. Existing image imports are kept by uploading them to the `site-images` storage bucket and saving the public URLs (no admin re-upload needed).

Then refactor `src/pages/BlogsReviews.tsx`:
- Remove the `staticBlogs` and `staticReviews` arrays.
- Read everything from the database.
- Order: blogs by `published_at` desc, reviews by `sort_order` then `created_at` desc.
- Keep the existing visual layout exactly as it is.

Result: every blog and review shows up in the admin panel's Edit / Delete lists, and any change instantly reflects on the public page.

### Part 2: Admin onboarding flow

Currently only `espironova@gmail.com` is auto-promoted to admin on signup. Other people can sign up but land on "Not authorized."

Add a fourth tab in the admin dashboard, **"Admins"**, visible only to existing admins. It will:
- List all current admin users (email + date added).
- Show pending signups (any authenticated user without admin role) with a **Grant admin** button.
- Allow removing admin from another user (but not yourself).

Backend pieces:
- A `SECURITY DEFINER` SQL function `list_users_for_admin()` that returns `{ user_id, email, is_admin, created_at }` for every auth user. Only callable by admins (checks `has_role(auth.uid(), 'admin')` and raises if not). This is the only safe way to read `auth.users` from the client.
- A `SECURITY DEFINER` function `grant_admin(target_user_id uuid)` and `revoke_admin(target_user_id uuid)` that insert/delete from `user_roles`. Both verify the caller is admin and `revoke_admin` blocks self-removal.

### Process for new admins (what you'll tell them)

1. They go to `/admin` and click "First time? Create account", sign up with email + password.
2. They will see "Not authorized" until you grant access.
3. You sign in to `/admin`, open the **Admins** tab, find their email under "Pending users", click **Grant admin**.
4. They refresh `/admin` and now have full access.

Email verification: leave it as it currently is (auto-confirmed on signup, which is the project's existing setting). No verification email step is required for them to sign in.

### Files

- New migration: seed blogs + reviews, create `list_users_for_admin`, `grant_admin`, `revoke_admin` functions.
- New: `src/components/admin/AdminsManager.tsx`.
- Edited: `src/pages/Admin.tsx` (add Admins tab), `src/pages/BlogsReviews.tsx` (drop static arrays).

### Out of scope

- Email verification flow for new admin signups (can be added later if you want).
- Inviting admins by email before they sign up (requires server-side admin API).
