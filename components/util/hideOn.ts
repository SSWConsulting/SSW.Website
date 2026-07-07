// Shared responsive-visibility helper for blocks (spacer, breadcrumbs, …).
// Literal classes so Tailwind's JIT keeps them. Default breakpoints: md=768, lg=1024.
const HIDE_ON_CLASS: Record<string, string> = {
  mobile: "max-md:hidden",
  tablet: "md:max-lg:hidden",
  desktop: "lg:hidden",
};

/** Tailwind class string to hide a block on the selected screen sizes (Tina `hideOn`). */
export function hideOnClasses(
  hideOn?: ReadonlyArray<string | null> | null
): string {
  return (hideOn ?? [])
    .map((size) => size && HIDE_ON_CLASS[size])
    .filter(Boolean)
    .join(" ");
}
