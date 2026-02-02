import { P } from "framer-motion/dist/types.d-BJcRxCew";
import { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";
import { kebabCaseFilename, tipField } from "./shared-fields";

export const caseStudySchema: Collection = {
  name: "caseStudy",
  label: "Company - Case Study - Pages",
  format: "mdx",
  path: "content/company/case-study",
  ui: {
    ...kebabCaseFilename,
    router: ({ document }) => {
      return `/company/clients/${document._sys.filename}`;
    },
  },
  fields: [
    tipField,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
      templates: [...Schemas.pageBlocks],
    },
  ],
};
