## Fleet Page Updates

### 1. Add new vehicle KDP 213S
- Copy `user-uploads://KDP_213S.jpeg` → `src/assets/fleet-unit-kdp-213s-1.jpg`.
- Add a new entry in `src/data/fleet.ts` (placed alongside the other Hiace units, before KCN 030M for capacity ordering):
  - `id: "kdp-213s"`, `modelKey: "toyota-hiace"`, `modelName: "Toyota Hiace 9L High Roof"`, `registration: "KDP 213S"`.
  - `images: [hiaceKdp213s1]` (single static photo, per existing fleet-static-display rule).
  - `alt`: "Toyota Hiace 9L high-roof safari van with pop-up roof for game drives in Kenya".
  - `capacity: "7–14 passengers"`.
  - `idealFor: "Game Drives, Safari Tours"`.
  - `features: ["Pop-up roof", "High roof wide & long body", "Extended leg room", "Charging ports"]` (kept uniform with other Hiace entries, 4 items).

### 2. Replace KDL 731T main photo
- Copy `user-uploads://KDL_731T-2.jpeg` → `src/assets/fleet-unit-kdl-731t-1.jpg` (overwrite existing).
- No code change needed; the existing import `hiaceKdl731t1` already references this filename and is used as the first/cover image on the fleet card.

### 3. Replace KCR 090X main photo + update feature
- Copy `user-uploads://KCR_090X-2.jpeg` → `src/assets/fleet-unit-kcr-090x-1.jpg` (overwrite existing).
- In `src/data/fleet.ts`, in the `kcr-090x` entry, change the last feature from `"Large luggage area"` to `"Top-mounted cargo carrier"`.

### Files Modified
- **New:** `src/assets/fleet-unit-kdp-213s-1.jpg`
- **Replaced:** `src/assets/fleet-unit-kdl-731t-1.jpg`, `src/assets/fleet-unit-kcr-090x-1.jpg`
- **Edited:** `src/data/fleet.ts` (new import, new fleet unit, KCR 090X feature update)

No changes needed to `Fleet.tsx` — it renders from `fleetUnits` automatically. The new vehicle will also appear in the BookingModal vehicle dropdown and the Fleet hero auto-cycle since both derive from `fleetUnits`.
