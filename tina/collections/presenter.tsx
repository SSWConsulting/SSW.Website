import type { Collection } from "tinacms";
import { tipField } from "./shared-fields";

export const presenterSchemaConstants = {
  value: "presenter",
  profileImg: "profileImg",
  torsoImg: "torsoImg",
  presenter: {
    value: "presenter",
    name: "name",
    peopleProfileURL: "peopleProfileURL",
  },
  about: "about",
  position: "position",
  skills: "skills",
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
      uploadDir: () => "people",
    },
    {
      type: "image",
      name: presenterSchemaConstants.torsoImg,
      label: "Torso Image",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

    {
      type: "string",
      label: "Position",
      name: presenterSchemaConstants.position,
      description:
        "The presenter's occupation, e.g. Chief Architect for Adam Cogan",
      required: false,
    },
    {
      type: "string",
      label: "Skills",
      name: presenterSchemaConstants.skills,
      description: "The presenter's skills, e.g. React | TypeScript",
      required: false,
    },
  ],
};
