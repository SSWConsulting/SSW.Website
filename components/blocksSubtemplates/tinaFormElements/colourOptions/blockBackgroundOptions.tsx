import type { ColorPickerOptions } from "../colourSelector";

export const backgroundOptions: ColorPickerOptions[] = [
  {
    name: "Soft Left Gradient",
    classes: "bg-gradient-to-l from-gray-900 to-[#121212] text-white",
    reference: 0,
    hex: "#111827 → #121212",
  },
  {
    name: "Soft Right Gradient",
    classes: "bg-gradient-to-r from-gray-900 to-[#121212] text-white",
    reference: 1,
    hex: "#111827 → #121212",
  },
  {
    name: "Sheer Top Gradient",
    classes: "bg-gradient-to-t from-gray-900 to-black text-white",
    reference: 2,
    hex: "#111827 → #000000",
  },
  {
    name: "Sheer Bottom Gradient",
    classes: "bg-gradient-to-b from-gray-900 to-black text-white",
    reference: 3,
    hex: "#111827 → #000000",
  },
  {
    name: "Dark Gray",
    classes: "bg-gray-950 text-white",
    reference: 4,
    editorClasses: "bg-[#222222] text-white",
    hex: "#030712",
  },
  {
    name: "Gray",
    classes: "bg-gray-900 text-white",
    reference: 5,
    hex: "#111827",
  },
  {
    name: "Black",
    classes: "bg-black text-white",
    reference: 6,
    hex: "#000000",
  },
  {
    name: "SSW Dark Gray",
    classes: "bg-sswDarkGray text-white",
    reference: 7,
    editorClasses: "bg-[#090909] text-white",
    hex: "#090909",
  },
  {
    name: "SSW Median Gray",
    classes: "bg-[#151515] text-white",
    reference: 8,
    editorClasses: "bg-[#151515] text-white",
    hex: "#151515",
  },
];
