## Goal

Make the website rate card, Rate Calculator, and Booking Modal vehicle list exactly match the attached Track & Trace rate sheet. The numeric rates already match, but several vehicle **names/types** are wrong (14-pax shown as a Coaster instead of a Van, 22-pax shown as Mercedes instead of a Coaster, etc.).

## Discrepancies Found

| Rate sheet says | Website currently shows | Fix |
|---|---|---|
| 8-Pax Safari Landcruiser | 8-Pax Safari Land Cruiser | Keep (matches) |
| **8 Pax Safari Van** | 8-Pax Tour Van | Rename to "8-Pax Safari Van" |
| **14 Pax Van** | 14-Pax Toyota Coaster | Rename to "14-Pax Van" (it is a van, not a coaster) |
| **22 Pax Coaster Shuttle** | 22-Pax Mercedes Shuttle | Rename to "22-Pax Coaster Shuttle" (it is a coaster, not Mercedes) |
| 33/37 Pax Mercedes Bus | 33/37-Pax Mercedes Bus | Keep (matches) |
| **45 Pax Mercedes Bus** | 45-Pax Bus | Rename to "45-Pax Mercedes Bus" |

All KES rates per row already match the sheet (long distance, full day, airport, hotel, dinner, cocktail, standby, driver allowance), so no numeric changes are needed.

## Changes

### 1. `src/data/rates.ts` — rename vehicles
Update the `name` field on entries:
- `van-8`: "8-Pax Tour Van" → "8-Pax Safari Van"
- `coaster-14`: "14-Pax Toyota Coaster" → "14-Pax Van"
- `mercedes-22`: "22-Pax Mercedes Shuttle" → "22-Pax Coaster Shuttle"
- `bus-45`: "45-Pax Bus" → "45-Pax Mercedes Bus"

(Leave the internal `id` strings unchanged so nothing else breaks.)

### 2. `src/data/rates.ts` — fix `matchRateVehicle` mapping
The current matcher routes "coaster" → `coaster-14` and "mercedes" → `bus-33`, which is wrong now that 14-pax is a Van and 22-pax is a Coaster. Reorder/update so:
- "hiace", "nv350", "nissan", "van" → `van-8` (8-pax Safari Van)
- "14", "14-pax", "14 pax" → `coaster-14` (14-pax Van)
- "coaster", "isuzu", "22" → `mercedes-22` (22-pax Coaster Shuttle)
- "mercedes", "33", "37" → `bus-33`
- "45", "golden dragon", "bus" (fallback) → `bus-45`
- "land cruiser", "ford ranger" → `safari-8`

### 3. `src/components/BookingModal.tsx` — align vehicle dropdown
Replace the hand-crafted `vehicleTypes` list with options that mirror the rate-card categories so a customer's selection always maps to a budget. New list:
- 8-Pax Safari Land Cruiser
- 8-Pax Safari Van (Toyota Hiace / Nissan NV350)
- 14-Pax Van
- 22-Pax Coaster Shuttle (Isuzu / Toyota Coaster)
- 33/37-Pax Mercedes Bus
- 45-Pax Mercedes Bus

Update `matchRateVehicle` keywords accordingly so each label resolves to its correct rate id.

### 4. Verify Rate Calculator + Rate Sheet table
`RateCalculator.tsx` reads names directly from `vehicles[]`, so the renames automatically flow into the dropdown and the "View Full Rate Sheet" table. No edits needed there.

## Out of Scope
- No changes to numeric rates (they already match the sheet).
- No changes to Fleet page imagery or copy.
- No changes to the WhatsApp message format (it already includes vehicle, service, breakdown, and total).
