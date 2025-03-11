import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { IconPickerInput } from "../../components/blocksSubtemplates/tinaFormElements/iconSelector";
import { seoSchema } from "../../components/util/seo";
import { tipField } from "./shared-fields";

export const eventsv2Schema: Collection = {
  label: "Eventsv2 - Pages",
  name: "eventsv2",
  format: "json",
  path: "content/eventsv2",
  description: "Add components to build your page",
  ui: {
    router: (args) => {
      return `/events/${args.document._sys.filename}`;
    },
    filename: {
      showFirst: true,
      description:
        "The filename will be used for the URL path of the page (slug). It should be unique and spaces aren't allowed.",
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Blocks",
      ui: {
        visualSelector: true,
      },
      templates: [...Schemas.pageBlocks],
    },
  ],
};
//TODO - Move this to a separate file & remove duplicate in consultingv2
export const consultingv2TechnologySchema: Collection = {
  label: "Consultingv2 - Related Technologies",
  name: "technologiesv2",
  format: "mdx",
  path: "content/consultingv2Technologies/technologies",
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

export const consultingv2TechnologyGroupsSchema: Collection = {
  label: "Consultingv2 - Technology Groups",
  name: "technologyGroupsv2",
  format: "mdx",
  path: "content/consultingv2Technologies/groups",
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
