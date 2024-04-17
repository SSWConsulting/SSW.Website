import type { Collection } from "tinacms";

export const paletteSchema: Collection = {
  label: "Global - Color Palette",
  name: "palette",
  path: "content/palette",
  format: "json",
  ui: {
    global: true,
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      type: "object",
      name: "colors",
      label: "Colors",
      list: true,
      required: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        },
      },
      fields: [
        {
          type: "string",
          name: "name",
          label: "Name",
          required: true,
        },
        {
          type: "string",
          name: "hex",
          label: "Color hex value",
          description: "Edit color hex value here",
          ui: {
            component: "color",
          },
        },
        {
          type: "string",
          name: "text",
          label: "Display text",
        },
      ],
    },
  ],
};
