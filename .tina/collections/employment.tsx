import { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";
import { benefitsField, bookingField } from "./shared-fields";

export const employmentSchema: Collection = {
  label: "Employment Pages",
  name: "employment",
  format: "mdx",
  path: "content/employment",
  ui: {
    router: ({ document }) => {
      return "/employment";
    },
  },
  fields: [
    // @ts-ignore
    seoSchema,
    bookingField,
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [...Schemas.pageBlocks],
      isBody: true,
    },
    benefitsField,
    {
      type: "rich-text",
      label: "After benefits body",
      name: "benefitsBody",
      templates: [...Schemas.pageBlocks],
    },
    {
      type: "rich-text",
      label: "After body",
      name: "afterBody",
      templates: [...Schemas.pageBlocks],
    },
    {
      type: "rich-text",
      label: "Opportunities body",
      name: "opportunitiesBody",
      templates: [...Schemas.pageBlocks],
    },
    {
      type: "object",
      label: "Opportunities",
      name: "opportunities",
      list: true,
      required: true,
      ui: {
        itemProps: (item) => {
          const path = item.opportunityRef;

          if (!path) return { label: "Opportunity" };

          const pathComponents = path.split("/");
          const fileName = pathComponents[pathComponents.length - 1];
          const positionName = fileName.split(".")[0];
          const spacesName = positionName.replace("-", " ");

          return { label: spacesName };
        },
      },
      fields: [
        {
          type: "reference",
          label: "Opportunity document",
          name: "opportunityRef",
          collections: ["opportunities"],
        },
      ],
    },
    {
      type: "rich-text",
      label: "Call to action body",
      name: "callToActionBody",
      templates: [...Schemas.pageBlocks],
    },
  ],
};
