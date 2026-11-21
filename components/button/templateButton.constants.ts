// Special value: opens the native multi-step "Tell us about your project"
// modal instead of a JotForm popup. Must not resolve to a JotForm id.
//
// Lives in its own tinacms-free module so the render path (templateButton.tsx)
// can read it without pulling templateButton.schema — which imports the Tina
// field-editor UI (ColorPickerInput/IconPickerInput) and, through it, the
// ~1.5 MB tinacms editor barrel. See SSW.Website perf work on the events pages.
export const PROJECT_FORM_MODAL = "projectFormModal";
export const BOOKING_JOTFORM = "bookingJotFormId";
// data-cta value on every button that opens a booking form (multi-step or Jotform). Google Tag Manager
// triggers should match this instead of the button text, which editors change.
export const BOOKING_CTA = "book-initial-meeting";
