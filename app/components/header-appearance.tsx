export type MobileHeaderAppearance = {
  hideFlag?: boolean | null;
  hideContactButton?: boolean | null;
};

// The header lives in the root layout and can't see the current page's data, so
// hiding the mobile flag/Contact button used to happen in a client effect AFTER
// hydration — reflowing the header and everything below it (CLS). Instead, the page
// server-renders this hidden marker; CSS in styles.css reads it via `:has()` and hides
// the elements on first paint, so SSR and hydration match. Client-side navigation swaps
// the marker in/out with the page, so the header updates without any header-side JS.
// (Middleware `x-pathname` + server resolution — the other documented fix — was rejected:
// reading headers() in the root layout breaks the `dynamic = "force-static"` routes.)
export function HeaderAppearanceMarker({
  appearance,
}: {
  appearance?: MobileHeaderAppearance | null;
}) {
  if (!appearance?.hideFlag && !appearance?.hideContactButton) return null;
  return (
    <div
      hidden
      data-mm-hide-flag={appearance.hideFlag ? "" : undefined}
      data-mm-hide-contact={appearance.hideContactButton ? "" : undefined}
    />
  );
}
