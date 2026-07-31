// Special value: opens the native multi-step "Tell us about your project"
// modal instead of a JotForm popup. Must not resolve to a JotForm id.
//
// Lives in its own tinacms-free module so the render path (templateButton.tsx)
// can read it without pulling templateButton.schema — which imports the Tina
// field-editor UI (ColorPickerInput/IconPickerInput) and, through it, the
// ~1.5 MB tinacms editor barrel. See SSW.Website perf work on the events pages.
export const PROJECT_FORM_MODAL = "projectFormModal";
