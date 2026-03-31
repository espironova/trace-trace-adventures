

# Add New Vehicle + Multi-Angle Photo Animation for Fleet Page

## Summary
Add a new "Isuzu Coaster" vehicle to the fleet, assign multiple photos (interior/exterior) to each vehicle, and animate the vehicle cards to cycle through different angles automatically.

## 1. Copy New Assets

| Uploaded File | Asset Path | Assigned To |
|---|---|---|
| `fleet_of_cars.jpeg` | `src/assets/fleet-isuzu.jpg` | New vehicle: Isuzu Coaster (front exterior) |
| `angle_2_fleet_of_cars.jpeg` | `src/assets/fleet-isuzu-rear.jpg` | Isuzu Coaster (rear exterior) |
| `WhatsApp_...12.42.10_1.jpeg` | `src/assets/fleet-coaster-int-blue.jpg` | Toyota Coaster interior |
| `WhatsApp_...12.42.09.jpeg` | `src/assets/fleet-isuzu-interior.jpg` | Isuzu Coaster interior |
| `WhatsApp_...12.42.07.jpeg` | `src/assets/fleet-mercedes-interior.jpg` | Mercedes Tour Bus interior |
| `WhatsApp_...12.42.04.jpeg` | `src/assets/fleet-coaster-int-2.jpg` | Toyota Coaster interior (alt) |
| `WhatsApp_...12.41.58_1-2.jpeg` | `src/assets/fleet-golden-interior.jpg` | Golden Dragon Bus interior |
| `WhatsApp_...12.41.58-2.jpeg` | `src/assets/fleet-hiace-interior.jpg` | Toyota Hiace interior |
| `WhatsApp_...12.41.56_1-2.jpeg` | `src/assets/fleet-nv350-int-2.jpg` | Nissan NV350 interior |
| `WhatsApp_...12.41.55_2.jpeg` | `src/assets/fleet-golden-int-2.jpg` | Golden Dragon Bus interior (alt) |

## 2. Update Vehicle Data Structure

Change each vehicle from `image: string` to `images: string[]` containing multiple angles:

- **Toyota Noah**: `[fleet-sedan.jpg, fleet-noah-boot.jpg]`
- **Toyota Coaster**: `[fleet-coaster.jpg, fleet-coaster-int-blue.jpg, fleet-coaster-int-2.jpg]`
- **Nissan NV350**: `[fleet-van.jpg, fleet-nv350-interior.jpg, fleet-nv350-int-2.jpg]`
- **Toyota Hiace**: `[fleet-hiace.jpg, fleet-hiace-interior.jpg]`
- **Ford Ranger 4x4**: `[fleet-ford.jpg]`
- **Mercedes Tour Bus**: `[fleet-bus.jpg, fleet-mercedes-interior.jpg, fleet-bus-interior.jpg]`
- **Toyota Land Cruiser**: `[fleet-landcruiser.jpg]`
- **Golden Dragon Bus**: `[fleet-golden-dragon.jpg, fleet-golden-interior.jpg, fleet-golden-int-2.jpg]`
- **Isuzu Coaster** (NEW): `[fleet-isuzu.jpg, fleet-isuzu-rear.jpg, fleet-isuzu-interior.jpg]`

## 3. New Vehicle Entry

```
name: "Isuzu Coaster"
capacity: "25-29 passengers"
idealFor: "Group transport, school trips, corporate shuttles"
features: ["Comfortable seating", "Air conditioning", "Spacious interior", "Reliable performance"]
```

## 4. Animated Multi-Photo Vehicle Cards

Each vehicle card in the grid gets a `VehicleImageCarousel` component:
- Auto-cycles through the vehicle's `images` array every 3 seconds
- Crossfade animation using `AnimatePresence`
- Small dot indicators at bottom of image area showing current photo
- On hover, pauses the auto-cycle
- Smooth opacity transition between photos

## 5. Hero Showcase Update

Update the hero showcase to also use the `images[0]` from each vehicle (first/primary image). No change to hero behavior, just adapt to the new data structure.

## Files Modified

1. **`src/pages/Fleet.tsx`** — New data structure with `images[]`, add Isuzu Coaster vehicle, add `VehicleImageCarousel` component with auto-cycling crossfade animation, update hero to use `images[0]`

