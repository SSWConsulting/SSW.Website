import type { ColorPickerOptions } from "../colourSelector";

// Each preset is theme-aware: the base classes are the LIGHT appearance and the
// `dark:` classes reproduce the original dark values exactly, so dark mode is
// unchanged. `text-foreground` swaps the previously pinned `text-white` so section
// text follows the active theme. The `.dark` ancestor comes from HomeThemeShell,
// and these presets only render on the v3 homepage (content/pagesv2/home.json),
// so other routes are unaffected. `reference` indices are unchanged — no content
// migration required.
//
// `hex`/`lightHex` and the `*PreviewClasses` drive the split light/dark preview
// pill in the Tina colour picker; they must mirror the rendered classes above.
// The preview hexes are hardcoded (as `bg-[#...]`) because the Tina editor runs
// its own Tailwind instance WITHOUT this repo's gray overrides — so `bg-gray-*`
// can't resolve there, and a bare `gray-950` would show standard #030712 rather
// than this repo's #222222. Keep the dark hexes matching what the render classes
// actually produce here: gray-950=#222222, gray-900=#333333, gray-100=#f2f2f2,
// gray-50=#f9f9f9.
export const backgroundOptions: ColorPickerOptions[] = [
  {
    name: "Soft Left Gradient",
    classes:
      "bg-gradient-to-l from-gray-50 to-white text-foreground dark:from-gray-900 dark:to-[#121212] dark:text-white",
    reference: 0,
    hex: "#333333→#121212",
    lightHex: "#f9f9f9→#ffffff",
    lightPreviewClasses: "bg-gradient-to-l from-[#f9f9f9] to-white text-black",
    darkPreviewClasses:
      "bg-gradient-to-l from-[#333333] to-[#121212] text-white",
  },
  {
    name: "Soft Right Gradient",
    classes:
      "bg-gradient-to-r from-gray-50 to-white text-foreground dark:from-gray-900 dark:to-[#121212] dark:text-white",
    reference: 1,
    hex: "#333333→#121212",
    lightHex: "#f9f9f9→#ffffff",
    lightPreviewClasses: "bg-gradient-to-r from-[#f9f9f9] to-white text-black",
    darkPreviewClasses:
      "bg-gradient-to-r from-[#333333] to-[#121212] text-white",
  },
  {
    name: "Sheer Top Gradient",
    classes:
      "bg-gradient-to-t from-gray-50 to-white text-foreground dark:from-gray-900 dark:to-black dark:text-white",
    reference: 2,
    hex: "#333333→#000000",
    lightHex: "#f9f9f9→#ffffff",
    lightPreviewClasses: "bg-gradient-to-t from-[#f9f9f9] to-white text-black",
    darkPreviewClasses: "bg-gradient-to-t from-[#333333] to-black text-white",
  },
  {
    name: "Sheer Bottom Gradient",
    classes:
      "bg-gradient-to-b from-gray-50 to-white text-foreground dark:from-gray-900 dark:to-black dark:text-white",
    reference: 3,
    hex: "#333333→#000000",
    lightHex: "#f9f9f9→#ffffff",
    lightPreviewClasses: "bg-gradient-to-b from-[#f9f9f9] to-white text-black",
    darkPreviewClasses: "bg-gradient-to-b from-[#333333] to-black text-white",
  },
  {
    name: "Dark Gray",
    classes: "bg-gray-50 text-foreground dark:bg-gray-950 dark:text-white",
    reference: 4,
    hex: "#222222",
    lightHex: "#f9f9f9",
    lightPreviewClasses: "bg-[#f9f9f9] text-black",
    darkPreviewClasses: "bg-[#222222] text-white",
  },
  {
    name: "Gray",
    classes: "bg-gray-100 text-foreground dark:bg-gray-900 dark:text-white",
    reference: 5,
    hex: "#333333",
    lightHex: "#f2f2f2",
    lightPreviewClasses: "bg-[#f2f2f2] text-black",
    darkPreviewClasses: "bg-[#333333] text-white",
  },
  {
    name: "Black",
    classes: "bg-white text-foreground dark:bg-black dark:text-white",
    reference: 6,
    hex: "#000000",
    lightHex: "#ffffff",
    lightPreviewClasses: "bg-white text-black",
    darkPreviewClasses: "bg-black text-white",
  },
  {
    name: "SSW Dark Gray",
    classes: "bg-gray-50 text-foreground dark:bg-sswDarkGray dark:text-white",
    reference: 7,
    hex: "#090909",
    lightHex: "#f9f9f9",
    lightPreviewClasses: "bg-[#f9f9f9] text-black",
    darkPreviewClasses: "bg-[#090909] text-white",
  },
  {
    name: "SSW Median Gray",
    classes: "bg-gray-100 text-foreground dark:bg-[#151515] dark:text-white",
    reference: 8,
    hex: "#151515",
    lightHex: "#f2f2f2",
    lightPreviewClasses: "bg-[#f2f2f2] text-black",
    darkPreviewClasses: "bg-[#151515] text-white",
  },
];
