import type { Collection } from "tinacms";
import { IconPickerInput } from "../../components/blocksSubtemplates/tinaFormElements/iconSelector";
import { tipField } from "./shared-fields";

export const technologiesSchema: Collection = {
  label: "Consulting - Technology Cards",
  name: "technologies",
  format: "mdx",
  path: "content/technologies",
  fields: [
    tipField,
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

export const v2TechnologySchema: Collection = {
  label: "Consultingv2 - Related Technologies",
  name: "technologiesv2",
  format: "mdx",
  path: "content/v2Technologies/technologies",
  fields: [
    tipField,
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      label: "Icon",
      name: "icon",
      ui: {
        // @ts-expect-error – component is not being recognized
        component: IconPickerInput,
      },
    },
    {
      type: "image",
      label: "Thumbnail",
      name: "thumbnail",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "thumbs",
    },
    {
      type: "string",
      label: "Body",
      name: "body",
      isBody: true,
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      label: "Link",
      //This name is weird for backwards compatibility
      name: "readMoreSlug",
    },
    {
      label: "Associated Group",
      name: "associatedGroup",
      type: "reference",
      collections: ["technologyGroupsv2"],
      ui: {
        optionComponent: (props: { name: string }, _internalSys) => {
          return props.name ?? _internalSys.path;
        },
      },
    },
  ],
};

export const v2TechnologyGroupsSchema: Collection = {
  label: "v2 - Technology Groups",
  name: "technologyGroupsv2",
  format: "mdx",
  path: "content/v2Technologies/groups",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true,
    },
  ],
};
