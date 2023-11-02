import type { Collection } from "tinacms";

export const presenterSchemaConstants = {
  value: "presenter",
  profileImg: "profileImg",
  presenter: {
    value: "presenter",
    name: "name",
    peopleProfileURL: "peopleProfileURL",
  },
  about: "about",
};

export const presenterSchema: Collection = {
  label: "Events - Presenters",
  name: "presenter",
  format: "mdx",
  path: "content/presenters",
  fields: [
    {
      type: "image",
      name: presenterSchemaConstants.profileImg,
      label: "Profile Image",
      // @ts-ignore
      uploadDir: () => "people",
    },
    {
      type: "object",
      name: presenterSchemaConstants.presenter.value,
      label: "Presenter",
      fields: [
        {
          type: "string",
          label: "Full Name",
          name: presenterSchemaConstants.presenter.name,
        },
        {
          type: "string",
          label: "People Profile URL",
          name: presenterSchemaConstants.presenter.peopleProfileURL,
        },
      ],
    },
    {
      type: "rich-text",
      name: presenterSchemaConstants.about,
      label: "About",
    },
  ],
};
