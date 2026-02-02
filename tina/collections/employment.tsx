import { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";
import { benefitsFields, kebabCaseFilename, tipField } from "./shared-fields";

export const employmentSchema: Collection = {
  label: "Employment - Index",
  name: "employment",
  format: "mdx",
  path: "content/employment",
  ui: {
    ...kebabCaseFilename,
    router: () => {
      return "/employment";
    },
  },
  fields: [
    tipField,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    {
      type: "object",
      label: "Booking",
      name: "booking",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Subtitle",
          name: "subTitle",
        },
        {
          type: "rich-text",
          label: "Booking body",
          name: "bookingBody",
          templates: [...Schemas.pageBlocks],
        },
        {
          type: "image",
          label: "Video Background",
          name: "videoBackground",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "videos",
        },
      ],
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [...Schemas.pageBlocks],
      isBody: true,
    },
    {
      type: "object",
      label: "Benefits",
      name: "benefits",
      fields: [
        {
          type: "object",
          list: true,
          label: "benefit list",
          name: "benefitList",
          ui: {
            itemProps: (item) => {
              return { label: item?.title };
            },
          },
          fields: benefitsFields,
        },
      ],
    },
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
