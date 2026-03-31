

# Match Fleet Photos to Correct Units + Fix Descriptions

## Summary
Replace placeholder images with the real uploaded photos for each specific vehicle, fix the KDL 731T description (it's a Toyota Hiace, not a Nissan NV350), add the VehicleImageCarousel component (was planned but never created), and integrate it into the Fleet grid.

## 1. Copy Uploaded Photos

Each photo replaces the primary (`-1.jpg`) image for that unit:

| Uploaded | Target Asset | Unit |
|---|---|---|
| `KCU_249X.jpeg` | `fleet-unit-kcu-249x-1.jpg` | Mercedes KCU 249X |
| `KCU_955S.jpeg` | `fleet-unit-kcu-955s-1.jpg` | Mercedes KCU 955S |
| `KDR_982M.jpeg` | `fleet-unit-kdr-982m-1.jpg` | Mercedes KDR 982M |
| `KDN_267X.jpeg` | `fleet-unit-kdn-267x-1.jpg` | Mercedes KDN 267X |
| `KCT_963J.jpeg` | `fleet-unit-kct-963j-1.jpg` | Toyota Coaster KCT 963J |
| `KCW_515Z.jpeg` | `fleet-unit-kcw-515z-1.jpg` | Toyota Coaster KCW 515Z |
| `KCB_785T.jpeg` | `fleet-unit-kcb-785t-1.jpg` | Toyota Coaster KCB 785T |
| `KCN_030M.jpeg` | `fleet-unit-kcn-030m-1.jpg` | Nissan NV350 KCN 030M |
| `KCR_090X.jpeg` | `fleet-unit-kcr-090x-1.jpg` | Toyota Hiace KCR 090X (new primary) |
| `KDL_731T.jpeg` | `fleet-unit-kdl-731t-1.jpg` | Toyota Hiace KDL 731T (fix model) |

## 2. Fix KDL 731T Description (`src/data/fleet.ts`)

The photo clearly shows a Toyota Hiace (HIACE badge visible on rear). Change:
- `modelKey`: `"nissan-nv350"` → `"toyota-hiace"`
- `modelName`: `"Nissan NV350"` → `"Toyota Hiace"`
- `capacity`: keep `"8–14 passengers"`
- `idealFor`: update to match Hiace description (safari tours, group travel)
- `features`: update to match Hiace features (pop-up roof option, extended leg room, etc.)
- `alt`: update to reference Toyota Hiace

## 3. Update Hiace Unit Images (`src/data/fleet.ts`)

The KCR 090X unit currently uses generic `hiaceImages`. Update to use unit-specific uploaded photo as primary, plus existing interior shots.

## 4. Create VehicleImageCarousel Component (`src/components/VehicleImageCarousel.tsx`)

The component was planned previously but never created. Build it now:
- Auto-cycles through vehicle `images[]` array every 3 seconds
- Crossfade animation using `AnimatePresence`
- Dot indicators at bottom of image area
- Pauses on hover

## 5. Integrate Carousel into Fleet Grid (`src/pages/Fleet.tsx`)

Replace the static `<img src={v.images[0]}` in the vehicle grid cards with the new `<VehicleImageCarousel images={v.images} alt={v.alt} />` component.

## Files Modified

1. **`src/data/fleet.ts`** — Fix KDL 731T to Toyota Hiace, update KCR 090X images, add new import for KCR 090X photo
2. **`src/components/VehicleImageCarousel.tsx`** — New component with auto-cycling crossfade carousel
3. **`src/pages/Fleet.tsx`** — Replace static images in grid with VehicleImageCarousel

