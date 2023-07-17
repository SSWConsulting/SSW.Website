import type { Collection } from "tinacms";

export const presetsSchema: Collection = {
  label: "Presets (⚠️DEV ONLY)",
  name: "presets",
  path: "content/presets/index",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
    },
    {
      type: "string",
      label: "ClassName",
      name: "className",

    },
    {
      type: "object",
      label: "Categories",
      name: "categories",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.category }
        }
      },
      fields: [
        {
          type: "reference",
          label: "Category",
          name: "category",
          collections: ["presetsCategory"],
        },
      ]
    },
  ]
}

export const presetsCategorySchema: Collection = {
  label: "Presets (⚠️DEV ONLY) - Categories",
  name: "presetsCategory",
  path: "content/presets/category",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
    },
  ],
}