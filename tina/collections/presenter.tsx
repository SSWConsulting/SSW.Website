import type { Collection } from "tinacms";
import { tipField } from "./shared-fields";

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
    tipField,
    {
      type: "image",
      name: presenterSchemaConstants.profileImg,
      label: "Profile Image",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "images/people",
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
