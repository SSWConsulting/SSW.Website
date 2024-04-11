import type { Collection } from "tinacms";
import { seoSchema } from "../../components/util/seo";

export const partnerIndexSchema: Collection = {
  label: "Partners - Index",
  name: "partnerIndex",
  path: "content/partners/index",
  format: "json",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
    router: () => {
      return "/company/partners";
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "string",
      name: "subTitle",
      label: "Sub Title",
    },
    {
      type: "object",
      label: "Partners List",
      name: "partnersList",
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
          type: "string",
          label: "Description",
          name: "description",
        },
        {
          type: "image",
          label: "Logo",
          name: "logo",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "partners",
        },
      ],
    },
  ],
};
