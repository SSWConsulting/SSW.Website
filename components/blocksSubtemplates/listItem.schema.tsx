import { IconPickerInput } from "./tinaFormElements/iconSelector";

export const listItemSchema = [
  {
    type: "string",
    label: "Heading",
    name: "heading",
  },
  {
    type: "string",
    label: "Description",
    name: "description",
  },
  {
    type: "string",
    label: "Icon",
    name: "icon",
    ui: {
      component: IconPickerInput,
    },
  },
];
