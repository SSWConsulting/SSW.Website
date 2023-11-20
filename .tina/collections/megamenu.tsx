import type { Collection } from "tinacms";
import { availableIcons } from "../../types/megamenu";

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
        },
        {
          type: "object",
          name: "menuColumns",
          label: "Menu Columns",
          list: true,
          fields: [
            {
              type: "object",
              name: "menuColumnGroups",
              label: "Menu Column Groups",
              list: true,
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
                  type: "object",
                  name: "menuItems",
                  label: "Menu Items",
                  list: true,
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
                      name: "url",
                      label: "URL",
                      required: true,
                    },
                    {
                      type: "string",
                      name: "description",
                      label: "Description",
                    },
                    {
                      type: "string",
                      name: "icon",
                      label: "Icon",
                      options: [...availableIcons],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "object",
          name: "sidebarItems",
          label: "Sidebar Items",
          ui: {
            itemProps: (item) => {
              return { label: item?.name };
            },
          },
          list: true,
          fields: [
            {
              type: "string",
              name: "name",
            },
            {
              type: "string",
              name: "description",
            },
            {
              type: "string",
              name: "category",
            },
            {
              type: "string",
              name: "url",
            },
          ],
        },
        {
          type: "object",
          name: "viewAll",
          label: "View All Link",
          fields: [
            {
              type: "string",
              name: "name",
            },
            {
              type: "string",
              name: "url",
            },
          ],
        },
      ],
    },
  ],
};
