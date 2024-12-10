import { ColorPickerOptions } from "../colourSelector";

export const backgroundOptions: ColorPickerOptions[] = [
  {
    name: "Soft Left Gradient",
    classes: "bg-gradient-to-l from-gray-900 to-black text-white",
    reference: 0,
  },
  {
    name: "Soft Right Gradient",
    classes: "bg-gradient-to-r from-gray-900 to-black text-white",
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
    name: "Dark Gray",
    classes: "bg-gray-950 text-white",
    reference: 4,
    editorClasses: "bg-[#222222] text-white",
  },
  {
    name: "Gray",
    classes: "bg-gray-900 text-white",
    reference: 5,
  },
];
