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
          type: "number",
          label: "Animation duration",
          name: "duration",
        },
        {
          type: "boolean",
          label: "Bounce down",
          name: "bounceDown",
        },
      ],
    },
    {
      type: "object",
      label: "Technology Badges Layout",
      name: "layouts",
      list: true,
      fields: [
        {
          type: "number",
          label: "Left",
          name: "left",
        },
        {
          type: "number",
          label: "Top",
          name: "top",
        },
        {
          type: "number",
          label: "Size",
          name: "size",
        },
        {
          type: "number",
          label: "Rotate",
          name: "rotate",
        },
      ],
    },
  ],
};
