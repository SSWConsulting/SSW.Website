import { ColorPickerOptions } from "../colourSelector";

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
    classes: "bg-ssw-black text-white",
    //Note: this is necessary as Tina doesn't recognise tailwind config settings
    editorClasses: "bg-[#333333] text-white",
    reference: 5,
  },
];
