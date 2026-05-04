## Plan: 2027 Rates Update + Smart Calculator Logic (Revised)

### Pricing Model Clarifications

**Unified day-based pricing** (Full-Day Disposal AND Long Distance use the same formula for non-inquire vehicles):

```
First 120 km included in the day rate.
Extra km charged at the vehicle's per-km overage rate.

cost_per_day = fullDay + max(0, km - 120) * perKmOverage
total = cost_per_day * days + driverAllowance * days
```

Example (5-Pax Noah, 1 day, 140 km): 12,000 + 20*60 = 13,200 + 2,000 driver = **KES 15,200**.

**Inquire-only vehicles** (8-Pax Land Cruiser & 8-Pax Safari Van):
- Full-Day Disposal AND Long Distance return an inquiry card.
- Card shows a **"Starting from"** indicative price:
  - Land Cruiser: from **KES 25,000 / day**
  - 8-Pax Safari Van: from **KES 20,000 / day**
- Plus WhatsApp + Phone CTAs for a custom quote.
- Airport / Hotel / Dinner / Cocktail / Standby for these vehicles still calculate normally with their fixed rates.

### 1. Update `src/data/rates.ts`

**Final rate matrix:**

| Vehicle | Day Rate (Full Day & Long Dist) | Per-km overage (>120 km) | Airport | Hotel | Dinner | Cocktail | Standby | Driver |
|---|---|---|---|---|---|---|---|---|
| 5-Pax Noah Minivan (NEW) | 12,000 | 60 | 6,000 | 6,000 | 8,000 | 8,000 | 8,000 | 2,000 |
| 8-Pax Land Cruiser | Inquire (from 25,000) | Inquire | 15,000 | 10,000 | 10,000 | 10,000 | 10,000 | 2,500 |
| 8-Pax Safari Van | Inquire (from 20,000) | Inquire | 10,000 | 12,000 | 10,000 | 12,000 | 12,000 | 2,000 |
| 14-Pax Van | 12,000 | 80 | 7,000 | 8,000 | 8,000 | 10,000 | 10,000 | 2,000 |
| 22-Pax Coaster | 17,000 | 100 | 12,000 | 12,000 | 12,000 | 12,000 | 12,000 | 2,500 |
| 33/37-Pax Mercedes Bus | 20,000 | 130 | 15,000 | 15,000 | 15,000 | 15,000 | 15,000 | 3,000 |
| 45-Pax Mercedes Bus | 30,000 | 150 | 18,000 | 18,000 | 18,000 | 15,000 | 25,000 | 4,000 |

**Type changes:**
- Replace `longDist: LongDistRate` with a unified shape:
  ```ts
  dayRate:
    | { type: "fixed"; baseDay: number; perKmOverage: number; includedKm: number /* 120 */ }
    | { type: "inquire"; startingFrom: number };
  ```
- Long Distance and Full-Day Disposal both consume `dayRate`.
- Other service rates (`airport`, `hotel`, `dinner`, `cocktail`, `standby`, `driverAllowance`) stay fixed numbers on every vehicle (including inquire ones).

**`calculateEstimate` logic:**
- If `serviceId` is `fullDay` or `longDist`:
  - `inquire` → return `{ inquire: true, startingFrom, total: null, breakdown: "Custom quote" }`.
  - `fixed` → use the unified formula above; `km` defaults to 120 if blank.
- Other services: unchanged (`rate * days`).

### 2. Update `src/components/RateCalculator.tsx`

- Merge the "Long Distance" and "Full-Day Disposal" UX:
  - Both show the **Distance (km)** input (optional, hint: "Defaults to 120 km. Extra km billed at vehicle's per-km rate.").
  - Both show the **Days** input.
- Result card additions:
  - When `inquire`: render an "Inquiry Required" panel:
    - Headline: "Starting from KES {startingFrom} / day"
    - Subtext: "This vehicle has custom pricing based on route, season, and requirements."
    - Two CTAs: WhatsApp (reuse `+254721521009` link from `WhatsAppButton`) and Call (`+254 721 521 009`).
  - When fixed-day with overage: show a clear breakdown line:
    `"Base 12,000 + 20 km extra x 60 = 13,200 (per day) x 1 day"`.
- Rate sheet table updates:
  - New row for 5-Pax Noah.
  - Combine "Long Dist." and "Full Day" columns into one labeled **"Day Rate (first 120 km)"** plus a new **"Extra km"** column.
  - Inquire-only rows display "From 25k / Inquire" and "From 20k / Inquire" in those two columns.
  - Footer note updated: "Day rate covers up to 120 km. Additional km charged per vehicle's per-km rate. Driver allowance per day."

### 3. Update `src/components/BookingModal.tsx`

- Update `matchRateVehicle` so:
  - "noah" → `noah-5` (new).
  - Keep "hiace / nv350 / nissan / safari van" → `van-8`.
- When the matched vehicle's `dayRate.type === "inquire"` AND the chosen service is `fullDay` or `longDist`, replace inline cost preview with: "Custom quote, our team will confirm pricing. Starts from KES {startingFrom}/day."

### 4. Update `src/pages/Contact.tsx`

Add a one-line intro above the Rate Calculator: "2027 rates. Day rate covers up to 120 km, additional km charged per vehicle. Land Cruiser and 8-Pax Safari Van pricing on inquiry."

### 5. Memory

Update `mem://features/rate-calculator`:
- 2027 unified day-rate model with 120 km cap and per-km overage.
- Inquire-only vehicles (Land Cruiser from 25k/day, 8-Pax Safari Van from 20k/day).
- New 5-Pax Noah Minivan baseline.
- Other services (airport/hotel/etc.) remain fixed flat fees.

### Files Touched
- `src/data/rates.ts`
- `src/components/RateCalculator.tsx`
- `src/components/BookingModal.tsx`
- `src/pages/Contact.tsx`
- `mem://features/rate-calculator`

### Out of Scope
Park entrance, Kaps, and county parking fees remain listed as excluded.
