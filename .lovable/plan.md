## Goal
Give corporate (and any) clients an alternative to WhatsApp by adding a "Book via Email" action to the booking modal. The email goes to `info@tracktraceadventures.co.ke` and contains all the same details captured by the form (and the live budget estimate).

## Changes
**File:** `src/components/BookingModal.tsx`

1. Refactor the existing `handleSubmit` so the message-building logic (lines list including booking details + estimate block) is extracted into a small helper that returns the plain-text body. Reuse it for both WhatsApp and Email so the two channels stay perfectly in sync.

2. Add a second submit handler `handleEmailSubmit` that:
   - Validates the form via `requestSubmit()`/native required fields.
   - Builds the same body via the helper.
   - Builds a subject line like: `Booking Request — {name} — {vehicleType} — {date}`.
   - Opens `mailto:info@tracktraceadventures.co.ke?subject=...&body=...` (URL-encoded).
   - Closes the modal.

3. Update the action area at the bottom of the form (currently a single full-width WhatsApp button) to show **two buttons side-by-side** on sm+ screens, stacked on mobile:
   - Primary: "Book via WhatsApp" (existing styling, accent background, WhatsApp icon).
   - Secondary: "Book via Email" (outline / muted variant using design tokens, `Mail` icon from lucide-react).
   - Add a short helper line above: "Corporate clients can also book via email."

4. The email body uses the same multi-line plain-text format used for WhatsApp (no markdown asterisks needed for email, but keeping them is harmless and preserves a single source of truth — keep as-is).

## Notes
- No backend / edge function involved — `mailto:` opens the user's default mail client, mirroring the pattern already used in `src/pages/Contact.tsx`.
- No design-system violations: uses existing `bg-accent`, `border-border`, `text-foreground` tokens.
- No changes to data, rates, or estimate logic.
