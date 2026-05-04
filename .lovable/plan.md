## Plan: Rate Sheet, Booking Labels, Golden Dragon Photo

### 1. Full Rate Sheet — Driver Allowance column (`src/components/RateCalculator.tsx`)

The Driver column already exists, but every other column rounds to "k" (e.g. `2.0k`, `2.5k`) which obscures the exact driver allowance and conflates 2,000 with 2,500.

Change the Driver cell to render the full KES value so each vehicle's distinct allowance is clear:

- 5-Pax Noah: KES 2,000
- 8-Pax Land Cruiser: KES 2,500
- 8-Pax Safari Van: KES 2,000
- 14-Pax Van: KES 2,000
- 22-Pax Coaster Shuttle: KES 2,500
- 33/37-Pax Mercedes Bus: KES 3,000
- 45-Pax Mercedes Bus: KES 4,000

Render as `KES {v.driverAllowance.toLocaleString()}` (e.g. `KES 2,500`) in accent bold so the per-vehicle differences are visible. Update the column header to `Driver / day` for clarity. Footnote already states "Driver allowance charged per day" — keep as-is.

### 2. Booking Modal vehicle labels (`src/components/BookingModal.tsx`)

In the `vehicleTypes` array, simplify two labels:

- `"8-Pax Safari Van (Toyota Hiace / Nissan NV350)"` -> `"8-Pax Safari Van"`
- `"22-Pax Coaster Shuttle (Isuzu / Toyota Coaster)"` -> `"22-Pax Coaster Shuttle"`

`matchRateVehicle` in `src/data/rates.ts` already matches on "safari van" and "22"/"coaster", so rate lookups stay correct. No other changes needed there.

### 3. Replace Golden Dragon photo

The new photo (`user-uploads://Dragon_Bus-2.png`) replaces the existing Golden Dragon hero shot used in the Fleet section.

Steps:
- Copy the upload to `src/assets/fleet-golden-dragon.jpg` (overwrite the existing file). Keeping the same filename means every importer (`src/data/fleet.ts` -> `goldenImages`, plus any other module that imports `fleet-golden-dragon.jpg`) automatically picks up the new image with no code changes.
- Verify with ripgrep that `fleet-golden-dragon` is the only Golden Dragon asset reference; if any other Golden Dragon-specific image is imported elsewhere, swap it to the new asset too.

The Golden Dragon entry in `fleetUnits` uses `goldenImages = [fleetGoldenDragon, fleetGoldenInterior, fleetGoldenInt2]`, so only the front/exterior shot is replaced. The two interior shots remain.

### Files to modify

- `src/components/RateCalculator.tsx` (Driver cell formatting + header)
- `src/components/BookingModal.tsx` (two vehicle label strings)
- `src/assets/fleet-golden-dragon.jpg` (overwrite with uploaded image)

### Out of scope

- No changes to `src/data/rates.ts` logic, calculator math, or Booking form fields.
- Interior Golden Dragon photos (`fleet-golden-interior.jpg`, `fleet-golden-int-2.jpg`) stay unchanged.
