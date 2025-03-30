import { backgroundOptions } from "../blocksSubtemplates/tinaFormElements/colourOptions/blockBackgroundOptions";

import { ColorPickerInput } from "../blocksSubtemplates/tinaFormElements/colourSelector";

export const backgroundSchema = {
  type: "object",
  label: "Background",
  name: "background",
  fields: [
    {
      type: "number",
      label: "Background Colour",
      name: "backgroundColour",
      ui: {
        component: ColorPickerInput(backgroundOptions),
      },
    },
    {
      type: "image",
      label: "Background Image",
      name: "backgroundImage",
      ui: {
        validate: (value) => {
          const lastSegment = value?.split("/")?.slice(-1)[0];
          if (!lastSegment) {
            return;
          }
          if (lastSegment?.indexOf(" ") > -1) {
            return "image names cannot have spaces";
          }
        },
      },
      description:
        "An optional background image, overlay on top of the colour. Streched to fit. File names cannot contain spaces.",
    },
    {
      type: "boolean",
      label: "Bleed",
      name: "bleed",
      description: "If true, the background will bleed into lower blocks.",
    },
  ],
};
