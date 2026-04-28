# Add Budget Estimate to Booking Form & WhatsApp Message

## Goal
When a client opens the booking form (Book Now, Hire a Vehicle, Hire This Vehicle, Book This Service, Get a Free Quote) they should see an estimated budget for the chosen vehicle + service, and that estimate must be included in the WhatsApp message sent to Track & Trace.

## What the user will see

In the booking modal, after picking a Vehicle Type and Travel Date, a new **Service Type** dropdown appears (Airport Transfer, Hotel-to-Hotel, Full-Day Disposal, Long Distance, Dinner, Corporate Cocktail, Standby). Depending on the service, two extra optional fields show up:

- **Distance (km)** — only for Long Distance with per-km pricing (min 120 km).
- **Number of Days** — for Long Distance, Full-Day, and Standby.

A live "Estimated Budget" card appears at the bottom of the form showing:
```
Vehicle Cost:    KES X,XXX
Driver Allowance: KES X,XXX
─────────────────────────
Estimated Total:  KES X,XXX
* Excludes park fees, parking, accommodation.
```

The "Send Booking via WhatsApp" button then sends a message that includes the estimate, e.g.:
```
Hello Track & Trace Adventures!

*Booking Request*
Name: Jane Doe
Phone: +254 7XX XXX XXX
Pickup: JKIA
Drop-off: Sarova Stanley
Date: 2026-05-10
Vehicle: Toyota Hiace — KCR 090X
Service: Airport Transfer
Driver: Yes

*Estimated Budget*
Vehicle Cost: KES 10,000
Driver Allowance: KES 2,000
Estimated Total: KES 12,000
(Estimate excludes park fees, parking, accommodation.)
```

If the client hasn't picked a service or the vehicle isn't in the rate card, the budget block is omitted gracefully and the message is sent without it.

## Technical Plan

### 1. Extract the rate data into a shared module
Create `src/data/rates.ts` containing:
- The `vehicles` array (currently inside `RateCalculator.tsx`) with rate categories.
- `serviceTypes` array.
- A helper `calculateEstimate({ vehicleId, serviceId, km, days })` that returns `{ baseCost, driverAllowance, total, breakdown }` (same logic as today's `calculate()`).
- A helper `matchRateVehicle(vehicleType: string)` that maps a fleet/booking label (e.g. "Toyota Hiace — KCR 090X", "Toyota Coaster (Bus)", "Mercedes Tour Bus") to a `vehicles` rate-card id by keyword matching (hiace/nv350/noah → 8-pax tier; coaster → 14-pax; mercedes → 22-pax; "bus"/"golden dragon" → 33 or 45-pax; land cruiser/ford → safari-8). Returns `null` if no match.

Refactor `RateCalculator.tsx` to import from `src/data/rates.ts` (no behaviour change).

### 2. Update `BookingModal.tsx`
- Add new state: `serviceId`, `km`, `days`.
- After the existing Vehicle Type dropdown, add:
  - **Service Type** select (from `serviceTypes`).
  - Conditional **Distance (km)** input (when long-distance per-km).
  - Conditional **Number of Days** input.
- Use `useMemo` to call `calculateEstimate(...)` whenever inputs change, attempting to map `form.vehicleType` via `matchRateVehicle`. If it returns `null` or service is empty, the estimate is `null`.
- Render an "Estimated Budget" card (matching the modal's existing minimalist style: bordered, accent total) below the Driver radio group when an estimate exists. Show breakdown line + vehicle cost + driver allowance + total + footnote.
- In `handleSubmit`, append the budget block to the WhatsApp message when an estimate exists. Keep the existing `encodeURIComponent` wrapping so the full message is preserved.

### 3. No changes needed to entry points
`HeroSection`, `Fleet`, `Services`, and `Index` already open `BookingModal` — they automatically inherit the new fields. The `initialVehicleType` prefill from Fleet still works; it will be matched by `matchRateVehicle`.

## Files Modified
1. **New:** `src/data/rates.ts` — shared rate data + `calculateEstimate` + `matchRateVehicle`.
2. **Edit:** `src/components/RateCalculator.tsx` — import from `src/data/rates.ts` (delete inlined arrays/calc).
3. **Edit:** `src/components/BookingModal.tsx` — add Service Type / km / days fields, live budget card, append budget to WhatsApp message.

## Notes
- The estimate is intentionally labeled "Estimated" with the same disclaimer used in the Rate Calculator (excludes park entrance, parking, accommodation).
- If you'd prefer the budget to NOT show inside the form (only in the WhatsApp message), or to use a free-form "Your Budget (KES)" input instead of an auto-calculated estimate, tell me before approving and I'll adjust.
