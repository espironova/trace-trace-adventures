

# Fix WhatsApp Booking Message Truncation

## Problem
In `src/components/BookingModal.tsx`, the WhatsApp message is built with literal `&` characters (e.g. "Track & Trace Adventures", "*Booking Request*") and inserted directly into the URL. The browser treats `&` as a query-string separator, so WhatsApp only receives `Hello Track ` and the rest is dropped.

## Fix — `src/components/BookingModal.tsx` `handleSubmit`

Rebuild the message as a normal multi-line string, then encode the whole thing once:

```ts
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const message = [
    `Hello Track & Trace Adventures!`,
    ``,
    `*Booking Request*`,
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Pickup: ${form.pickup}`,
    `Drop-off: ${form.dropoff}`,
    `Date: ${form.date}`,
    `Vehicle: ${form.vehicleType}`,
    `Driver: ${form.driver}`,
  ].join('\n');

  window.open(
    `https://wa.me/254721521009?text=${encodeURIComponent(message)}`,
    '_blank'
  );
  onClose();
};
```

### Why this works
- `encodeURIComponent` on the whole message converts `&` → `%26`, newlines → `%0A`, spaces → `%20`, etc., so nothing in the body is ever mistaken for a URL delimiter.
- WhatsApp now receives the complete formatted booking request with all fields (Name, Phone, Pickup, Drop-off, Date, Vehicle, Driver) on separate lines.

## Files Modified
1. `src/components/BookingModal.tsx` — rewrite `handleSubmit` message construction.

