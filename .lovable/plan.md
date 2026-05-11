## Problem
The "Book via Email" button calls `window.location.href = "mailto:..."` from inside the Lovable preview iframe, then immediately closes the modal. In sandboxed iframes (and in many browsers when no default mail handler is registered), assigning `mailto:` to `window.location.href` is silently blocked, so nothing happens. The most reliable cross-browser pattern is a real `<a href="mailto:...">` click triggered by the user gesture, which is treated as top-level navigation.

## Fix (single file: `src/components/BookingModal.tsx`)

1. Compute the mailto URL reactively from the current form state via `useMemo`:
   - subject: `Booking Request - {name|"New Booking"}{ - vehicleType?}{ - date?}`
   - body: result of `buildBookingMessage()`
   - URL: `mailto:info@tracktraceadventures.co.ke?subject=...&body=...` (URL-encoded)

2. Replace the `<button type="button" onClick={handleEmailBooking}>` with an `<a>` styled identically (same Tailwind classes, same `Mail` icon and label):
   - `href={mailtoHref}`
   - On click: if the form is invalid, `e.preventDefault()` + `formEl.reportValidity()`. Otherwise let the browser navigate to the mailto URL natively, then call `onClose()` (no `target="_blank"` so the user's default mail app is invoked reliably; the page itself does not actually navigate for `mailto:`).

3. Remove the now-unused `handleEmailBooking` function (logic moved into the memoized href + click handler).

4. Add a tiny fallback hint under the email button (muted, small): "If your email app does not open, write to info@tracktraceadventures.co.ke" with the address as a plain `mailto:` link, so corporate users on machines without a configured mail client still have a path forward.

## Notes
- WhatsApp button and all other behavior unchanged.
- No design-system violations: reuses existing `border-accent`, `text-accent`, `bg-transparent`, `hover:bg-accent/10` tokens.
- No data, rates, or estimate logic changes.
- Why this works: a user-gesture click on an `<a href="mailto:...">` is handled by the browser's protocol handler dispatch, which works inside iframes and across Chrome/Safari/Firefox; programmatic `window.location.href = "mailto:..."` from an iframe is frequently suppressed.
