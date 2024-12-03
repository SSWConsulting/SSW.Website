import { ColorPickerOptions } from "../colourSelector";

const sswRed = "!bg-ssw-red bg-[#cc4141] text-white";

export const buttonOptions: ColorPickerOptions[] = [
  {
    name: "Red",
    classes: `${sswRed}`,
    reference: 0,
  },
  {
    name: "Transparent",
    classes: "bg-transparent text-gray-950",
    reference: 1,
  },
];
