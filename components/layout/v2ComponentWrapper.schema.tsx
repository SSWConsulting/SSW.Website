import type { TinaField } from "tinacms";
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
    {
      type: "boolean",
      label: "Grid Overlay",
      name: "gridOverlay",
      description:
        "Overlays a subtle dotted grid on top of the background, underneath all content.",
    },
    {
      type: "boolean",
      label: "Red Glow",
      name: "redGlow",
      description:
        "Adds soft red radial glows to the background (top-left and bottom-middle).",
    },
  ],
};

export const anchorIdSchema: TinaField = {
  type: "string",
  label: "Anchor ID",
  name: "anchorId",
  ui: {
    validate: (value: string) => {
      if (!value) {
        return;
      }
      if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(value)) {
        return "Anchor IDs must start with a letter and contain only letters, numbers, hyphens or underscores (no spaces)";
      }
    },
  },
  description:
    "Optional id for in-page links. Set this on a section, then point a button's link at #<id> to jump here (the offset for the sticky header is handled automatically).",
};

// Background + anchor fields every V2 block shares — spread once via `...wrapperBaseFields`.
export const wrapperBaseFields: TinaField[] = [
  //@ts-expect-error – custom component typing won't be pinned down
  backgroundSchema,
  anchorIdSchema,
];
