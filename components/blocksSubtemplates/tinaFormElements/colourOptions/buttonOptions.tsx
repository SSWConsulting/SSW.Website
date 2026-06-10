import type { ColorPickerOptions } from "../colourSelector";

export const buttonOptions: ColorPickerOptions[] = [
  {
    name: "Red",
    classes: "bg-ssw-red text-white",
    //Note: this is necessary as Tina doesn't recognise tailwind config settings
    editorClasses: "bg-[#cc4141] text-white",
    reference: 0,
  },
  {
    name: "Transparent",
    classes: "bg-transparent text-gray-950",
    reference: 1,
  },
  {
    name: "Link",
    classes: "bg-transparent text-white underline decoration-1",
    editorClasses: "bg-transparent text-gray-950 underline",
    reference: 2,
  },
];
