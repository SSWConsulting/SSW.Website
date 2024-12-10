import { buttonOptions } from "../blocksSubtemplates/tinaFormElements/colourOptions/buttonOptions";
import { ColorPickerInput } from "../blocksSubtemplates/tinaFormElements/colourSelector";
import { IconPickerInput } from "../blocksSubtemplates/tinaFormElements/iconSelector";

export const buttonSchema = [
  {
    type: "string",
    label: "Button Text",
    name: "buttonText",
  },
  {
    type: "string",
    label: "Button Link",
    name: "buttonLink",
  },
  {
    type: "string",
    label: "Icon",
    name: "icon",
    ui: {
      component: IconPickerInput,
    },
  },
  {
    type: "boolean",
    label: "Icon First",
    name: "iconFirst",
    description: "Place the icon to the left of the button text.",
  },
  {
    type: "number",
    label: "Colour",
    name: "colour",
    ui: {
      component: ColorPickerInput(buttonOptions),
    },
  },
];
