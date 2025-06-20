import { buttonOptions } from "../blocksSubtemplates/tinaFormElements/colourOptions/buttonOptions";
import { ColorPickerInput } from "../blocksSubtemplates/tinaFormElements/colourSelector";
import { IconPickerInput } from "../blocksSubtemplates/tinaFormElements/iconSelector";

export const bookingForms = [
  {
    label: "Booking Form",
    value: "bookingJotFormId",
  },
  {
    label: "Registration of Interest Form",
    value: "registrationOfInterestJotFormId",
  },
  {
    label: "AI Workshop Form",
    value: "aiWorkshopJotFormId",
  },
];

export const buttonSchema = [
  {
    type: "string",
    label: "Button Text",
    name: "buttonText",
  },
  {
    type: "string",
    description: "The button link must be blank if you want to use this option",
    label: "Select lead capture form",
    name: "leadCaptureFormOption",
    options: bookingForms,
  },
  {
    type: "string",
    description: "Leave this blank if you want to use lead capture form option",
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
