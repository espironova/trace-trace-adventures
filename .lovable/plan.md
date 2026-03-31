

# Remove Vehicle Image Carousel from Fleet Grid

## Summary
Replace the auto-cycling `VehicleImageCarousel` component in the Fleet grid with a single static image per vehicle (using `images[0]`).

## Changes

### `src/pages/Fleet.tsx`
- Remove the `VehicleImageCarousel` import
- Replace `<VehicleImageCarousel images={v.images} alt={v.alt} />` with a simple `<div>` + `<img>` showing only `v.images[0]`
- Keep the same `aspect-[4/3]` styling for consistency

### `src/components/VehicleImageCarousel.tsx`
- No deletion needed (may be useful elsewhere later), but it will no longer be used on the Fleet page

