import { ColorPickerOptions } from "./colourSelector";

export const backgroundOptions: ColorPickerOptions[] = [
  {
    name: "Soft Left Gradient",
    classes: "bg-gradient-to-l from-gray-900 to-gray-1000",
  },
  {
    name: "Soft Right Gradient",
    classes: "bg-gradient-to-r from-gray-900 to-gray-1000",
  },
  {
    name: "Sheer Top Gradient",
    classes: "bg-gradient-to-t from-gray-900 to-black",
  },
  {
    name: "Sheer Bottom Gradient",
    classes: "bg-gradient-to-b from-gray-900 to-black",
  },
  {
    name: "Transparent",
    classes: "bg-gradient-to-tr bg-transparent",
  },
  {
    name: "Gray",
    classes: "bg-gray-700",
  },
];
