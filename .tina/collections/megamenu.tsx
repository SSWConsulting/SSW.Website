import type { Collection } from "tinacms";
import { iconMap } from "../../components/megamenu/MegaIcon/mega-icon";
import { availableWidgets } from "../../types/megamenu";

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
          required: true,
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
                      type: "image",
                      name: "iconImg",
                      label: "Icon",
                      // @ts-ignore
                      uploadDir: () => "/megamenu-icons",
                    },
                    {
                      type: "string",
                      name: "icon",
                      label: "Icon (optional override of above image field)",
                      options: Object.keys(iconMap),
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
          list: true,
          fields: [
            {
              type: "string",
              name: "name",
              label: "Name",
              required: true,
            },
            {
              type: "object",
              name: "items",
              label: "Items",
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
                  label: "Name",
                },
                {
                  type: "string",
                  name: "description",
                  label: "Description",
                },
                {
                  type: "string",
                  name: "widgetType",
                  label: "Widget Type",
                  options: [...availableWidgets],
                },
                {
                  type: "string",
                  name: "url",
                  label: "URL",
                },
                {
                  type: "string",
                  name: "icon",
                  label: "Icon",
                  options: Object.keys(iconMap),
                },
              ],
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
        {
          type: "string",
          name: "url",
          label: "URL (optional for single link items without a dropdown)",
        },
      ],
    },
  ],
};
