import type { Collection } from "tinacms";

export const presenterSchema: Collection = {
  label: "Presenters",
  name: "presenter",
  format: "mdx",
  path: "content/presenters",
  fields: [
    {
      type: "image",
      name: "profileImg",
      label: "Profile Image",
    },
    {
      type: "object",
      name: "presenter",
      label: "Presenter",
      fields: [
        {
          type: "string",
          label: "Full Name",
          name: "name",
        },
        {
          type: "string",
          label: "People Profile URL",
          name: "peopleProfileURL",
        },
      ],
    },
    {
      type: "rich-text",
      name: "about",
      label: "About",
    },
  ],
};
