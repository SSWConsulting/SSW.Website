import type { Collection } from "tinacms";

export const megaMenuSchema: Collection = {
  label: "Global - Mega Menu",
  name: "megamenu",
  path: "content/megamenu",
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
      name: "menuGroups",
      label: "Menu Groups",
      list: true,
      fields: [
        {
          type: "string",
          name: "name",
          label: "Name",
        },
      ],
    },
  ],
};
