## Goal

Apply the new May 14, 2026 rate sheet across the site, and give the admin a Rates Manager (full CRUD on vehicle rate rows) in the Admin Dashboard so future rate changes can be made without code edits.

## 1. New rates to apply

Vehicle changes (Land Cruiser stays inquire-only as requested):


| Vehicle                | Day rate                | Per-km >120 | Airport | Hotel  | Dinner | Cocktail | Standby | Driver |
| ---------------------- | ----------------------- | ----------- | ------- | ------ | ------ | -------- | ------- | ------ |
| 5-Pax Noah             | 12,000                  | 60          | 6,000   | 6,000  | 8,000  | 8,000    | 8,000   | 2,000  |
| 8-Pax Land Cruiser     | From 25,000)            | inquire     | 15,000  | 10,000 | 10,000 | 10,000   | 10,000  | 2,500  |
| 8-Pax Safari Van       | From 20,000             | inquire     | 10,000  | 12,000 | 10,000 | 12,000   | 12,000  | 2,000  |
| 14-Pax Van             | **14,000** (was 12,000) | 80          | 7,000   | 8,000  | 8,000  | 10,000   | 10,000  | 2,000  |
| 22-Pax Coaster         | 17,000                  | 100         | 12,000  | 12,000 | 12,000 | 12,000   | 12,000  | 2,500  |
| 33/37-Pax Mercedes Bus | **23,000** (was 20,000) | 130         | 15,000  | 15,000 | 15,000 | 15,000   | 15,000  | 3,000  |
| 45-Pax Mercedes Bus    | **35,000** (was 30,000) | 150         | 18,000  | 18,000 | 18,000 | 15,000   | 25,000  | 4,000  |


## 2. Database (admin-editable rates)

New table `vehicle_rates` (public select; admin all):

- `id`, `vehicle_key` (unique slug, e.g. `noah-5`), `name`, `sort_order`
- `day_rate_type` ('fixed' | 'inquire'), `base_day`, `per_km_overage`, `included_km` (default 120), `starting_from`
- `airport`, `hotel`, `dinner`, `cocktail`, `standby`, `driver_allowance`
- `created_at`, `updated_at` (trigger)

Seed with the 7 vehicles above. RLS: anyone can SELECT; admin role required for INSERT/UPDATE/DELETE.

## 3. Code changes

- `src/data/rates.ts` — keep as fallback constants (updated to new numbers) so the site renders before the DB query resolves. Export same `vehicles` array shape.
- New `src/hooks/useVehicleRates.ts` — fetches `vehicle_rates` from Supabase, falls back to static `vehicles` on error/loading, returns the same `RateVehicle[]` shape so consumers don't change.
- `src/components/RateCalculator.tsx` and `src/components/BookingModal.tsx` — read vehicles from the hook instead of the static import. All calculation logic stays the same.
- Any rate-sheet table on the site (Services / rate card section) uses the same hook so the public sheet stays in sync.

## 4. Admin: Rates Manager

- New `src/components/admin/RatesManager.tsx`: lists vehicles in sort order with inline edit dialog. Fields grouped: identity (key, name, sort), day rate (type toggle inquire/fixed → reveals base/per-km/included-km or starting-from), per-service rates, driver allowance. Add and delete buttons.
- Add a new "Rates" tab to `src/pages/Admin.tsx` next to Blogs / Reviews / Fleet / Admins.
- Validation: numbers ≥ 0, unique `vehicle_key`, name required. Toast on save/delete.

## 5. Out of scope

- No changes to header, footer, navbar, WhatsApp links, or other pages.
- Land Cruiser remains inquire-only per your choice.
- Existing brand styling/tokens reused; no new design system tokens.

## Technical notes

- Matching from free-form vehicle labels (`matchRateVehicle` in `rates.ts`) keeps working because `vehicle_key` values mirror current ids.
- Hook caches result in React state for the session; admin edits trigger a refetch via Supabase realtime subscription on `vehicle_rates`.