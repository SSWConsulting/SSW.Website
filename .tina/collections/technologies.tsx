import type { Collection } from "tinacms";

export const technologiesSchema: Collection = {
  label: "Technology Cards",
  name: "technologies",
  format: "mdx",
  path: "content/technologies",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      label: "Read More Slug",
      name: "readMoreSlug",
    },
    {
      type: "image",
      label: "Thumbnail",
      name: "thumbnail",
      // @ts-ignore
      uploadDir: () => "thumbs",
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      isBody: true,
    },
  ],
};

export const technologyBadgesSchema: Collection = {
  label: "Technology Badges",
  name: "technologyBadges",
  format: "json",
  path: "content/technologyBadges",
  fields: [
    {
      type: "object",
      label: "Technology Badges List",
      name: "badgesList",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        },
      },
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
          isTitle: true,
          required: true,
        },
        {
          type: "string",
          label: "URL",
          name: "url",
        },
        {
          type: "image",
          label: "Badge image",
          name: "imgURL",
          required: true,
          // @ts-ignore
          uploadDir: () => "/badges",
        },
        {
          type: "boolean",
          label: "Image size",
          name: "largeIcon",
        },
        {
          type: "string",
          label: "Background Color",
          name: "fill",
        },
      ],
    },
  ],
};
