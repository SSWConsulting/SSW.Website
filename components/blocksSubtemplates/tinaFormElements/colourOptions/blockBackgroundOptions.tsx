import type { ColorPickerOptions } from "../colourSelector";

// Each preset is theme-aware: the base classes are the LIGHT appearance and the
// `dark:` classes reproduce the original dark values exactly, so dark mode is
// unchanged. `text-foreground` swaps the previously pinned `text-white` so section
// text follows the active theme. The `.dark` ancestor comes from HomeThemeShell,
// and these presets only render on the v3 homepage (content/pagesv2/home.json),
// so other routes are unaffected. `reference` indices are unchanged — no content
// migration required.
export const backgroundOptions: ColorPickerOptions[] = [
  {
    name: "Soft Left Gradient",
    classes:
      "bg-gradient-to-l from-gray-50 to-white text-foreground dark:from-gray-900 dark:to-[#121212] dark:text-white",
    reference: 0,
    hex: "#111827 → #121212",
  },
  {
    name: "Soft Right Gradient",
    classes:
      "bg-gradient-to-r from-gray-50 to-white text-foreground dark:from-gray-900 dark:to-[#121212] dark:text-white",
    reference: 1,
    hex: "#111827 → #121212",
  },
  {
    name: "Sheer Top Gradient",
    classes:
      "bg-gradient-to-t from-gray-50 to-white text-foreground dark:from-gray-900 dark:to-black dark:text-white",
    reference: 2,
    hex: "#111827 → #000000",
  },
  {
    name: "Sheer Bottom Gradient",
    classes:
      "bg-gradient-to-b from-gray-50 to-white text-foreground dark:from-gray-900 dark:to-black dark:text-white",
    reference: 3,
    hex: "#111827 → #000000",
  },
  {
    name: "Dark Gray",
    classes: "bg-gray-50 text-foreground dark:bg-gray-950 dark:text-white",
    reference: 4,
    editorClasses: "bg-[#222222] text-white",
    hex: "#030712",
  },
  {
    name: "Gray",
    classes: "bg-gray-100 text-foreground dark:bg-gray-900 dark:text-white",
    reference: 5,
    hex: "#111827",
  },
  {
    name: "Black",
    classes: "bg-white text-foreground dark:bg-black dark:text-white",
    reference: 6,
    hex: "#000000",
  },
  {
    name: "SSW Dark Gray",
    classes: "bg-gray-50 text-foreground dark:bg-sswDarkGray dark:text-white",
    reference: 7,
    editorClasses: "bg-[#090909] text-white",
    hex: "#090909",
  },
  {
    name: "SSW Median Gray",
    classes: "bg-gray-100 text-foreground dark:bg-[#151515] dark:text-white",
    reference: 8,
    editorClasses: "bg-[#151515] text-white",
    hex: "#151515",
  },
];
