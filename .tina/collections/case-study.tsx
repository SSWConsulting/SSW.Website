import { Collection } from "tinacms";
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
      type: "string",
      label: "Video URL",
      name: "videoURL",
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
    },
  ],
};
