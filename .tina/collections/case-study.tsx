import { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";
import { tipField } from "./shared-fields";

// export const caseStSchemaConstants = {
//   value: "locations",
//   header: "header",
//   addressLine1: "addressLine1",
//   addressLine2: "addressLine2",
//   addressLine3: "addressLine3",
//   directionURL: "directionURL",
// };

export const caseStudySchema: Collection = {
  name: "caseStudy",
  label: "Company - Case Studies",
  format: "mdx",
  path: "content/company/case-study",
  ui: {
    router: ({ document }) => {
      return `/company/case-study/${document._sys.filename}`;
    },
  },
  fields: [
    tipField,
    // @ts-ignore
    seoSchema,
    {
      type: "string",
      label: "Heading",
      name: "heading",
    },
    {
      type: "string",
      label: "Sub Heading",
      name: "subHeading",
    },
    {
      type: "object",
      list: true,
      name: "_body",
      label: "Body",
      ui: {
        visualSelector: true,
      },
      templates: [...Schemas.pageBlocks],
    },
    {
      type: "rich-text",
      label: "Content",
      name: "content",
    },
    {
      type: "object",
      label: "Related Links",
      name: "relatedLinks",
      list: true,
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
        },
        {
          type: "string",
          name: "url",
          label: "URL",
        },
      ],
    },
  ],
};
