import { IconPickerInput } from "./tinaFormElements/iconSelector";

// Tina admin schema for IconLabel. Kept separate from the component so the
// icon picker (which pulls the tinacms editor runtime and the full icon set)
// never enters the client bundle — import this only from the Tina config side.
export const IconLabelSchema = [
  {
    type: "string",
    label: "Label Text",
    name: "labelText",
    description: "Text for the label.",
  },
  {
    type: "string",
    label: "Icon",
    name: "icon",
    description: "Icon to precede the label.",
    ui: {
      component: IconPickerInput,
    },
  },
];
