import type { Collection } from "tinacms";

export const footerSchema: Collection = {
  label: "Global - Footer",
  name: "footer",
  path: "content/footer",
  format: "json",
  ui: {
    global: true,
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  match: {
    include: "index",
  },
  fields: [
    {
      type: "object",
      label: "Socials",
      name: "socials",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.type };
        },
      },
      fields: [
        {
          type: "string",
          label: "Type",
          name: "type",
          options: [
            { label: "YouTube", value: "youtube" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "Facebook", value: "facebook" },
            { label: "Instagram", value: "instagram" },
            { label: "X (Twitter)", value: "xtwitter" },
            { label: "BlueSky", value: "bluesky" },
            { label: "Threads", value: "threads" },
            { label: "TikTok", value: "tiktok" },
            { label: "GitHub", value: "github" },
            { label: "Meetup", value: "meetup" },
          ],
        },
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "URL",
          name: "url",
        },
        {
          type: "string",
          label: "Username",
          name: "username",
        },
      ],
    },
    {
      type: "object",
      label: "Link Columns",
      name: "linkColumns",
      list: true,
      description: "A maximum of 5 columns are displayed in the footer.",
      ui: {
        itemProps: (item) => {
          return { label: item?.title };
        },
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "object",
          label: "Links",
          name: "links",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
          },
          fields: [
            {
              type: "string",
              label: "Label",
              name: "label",
            },
            {
              type: "string",
              label: "URL",
              name: "url",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Bottom Bar",
      name: "bottomBar",
      fields: [
        {
          type: "string",
          label: "Copyright Text",
          name: "copyrightText",
          description:
            "Shown after the copyright symbol and current year, e.g. '© 2026 <this text>'.",
        },
        {
          type: "object",
          label: "Links",
          name: "links",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
          },
          fields: [
            {
              type: "string",
              label: "Label",
              name: "label",
            },
            {
              type: "string",
              label: "URL",
              name: "url",
            },
          ],
        },
        {
          type: "object",
          label: "Powered By",
          name: "poweredBy",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
          },
          fields: [
            {
              type: "string",
              label: "Label",
              name: "label",
            },
            {
              type: "string",
              label: "URL",
              name: "url",
            },
          ],
        },
      ],
    },
  ],
};
