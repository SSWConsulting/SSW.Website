import { ColorPickerOptions } from "../colourSelector";

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
];
