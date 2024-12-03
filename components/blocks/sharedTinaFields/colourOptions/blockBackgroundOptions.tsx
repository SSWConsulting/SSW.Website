import { ColorPickerOptions } from "../colourSelector";

// Tech Debt – Tina doesn't pick up tailwind config classes for custom UI components, so this is a workaround.
// Changes to the tailwind config will reflect in site components, but not the tina editor form components (they will need to be changed here).
const sswBlack = "!bg-ssw-black bg-[#333333] text-white";

export const backgroundOptions: ColorPickerOptions[] = [
  {
    name: "Soft Left Gradient",
    classes: "bg-gradient-to-l from-gray-900 to-gray-1000 text-white",
    reference: 0,
  },
  {
    name: "Soft Right Gradient",
    classes: "bg-gradient-to-r from-gray-900 to-gray-1000 text-white",
    reference: 1,
  },
  {
    name: "Sheer Top Gradient",
    classes: "bg-gradient-to-t from-gray-900 to-black text-white",
    reference: 2,
  },
  {
    name: "Sheer Bottom Gradient",
    classes: "bg-gradient-to-b from-gray-900 to-black text-white",
    reference: 3,
  },
  {
    name: "Transparent",
    classes: "bg-transparent text-gray-950",
    reference: 4,
  },
  {
    name: "Gray",
    classes: `${sswBlack} text-white`,
    reference: 5,
  },
];
