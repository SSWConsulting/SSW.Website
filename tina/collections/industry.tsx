import React from "react";
import { Collection, Template } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";
import { kebabCaseFilename } from "./shared-fields";

export const industryIndexSchema: Collection = {
  label: "Industry - Index",
  name: "industryIndex",
  path: "content/industry/index",
  format: "json",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    {
      type: "string",
      label: "Title",
      name: "title",
      required: true,
    },
    {
      type: "string",
      label: "Subtitle",
      name: "subTitle",
      required: true,
    },
    {
      type: "object",
      label: "Industry Project List",
      name: "industryList",
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
          uploadDir: () => "products",
        },
      ],
    },
  ],
};

export const industrySolutionsRowSchema: Template = {
  name: "SolutionsRow",
  label: "Industry Solutions Row",
  fields: [
    {
      type: "image",
      label: "1st Card Image",
      name: "imgSrc1",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "industry",
    },
    {
      type: "string",
      label: "1st Header",
      name: "header1",
    },
    {
      type: "rich-text",
      label: "1st Body",
      name: "body1",
    },
    {
      type: "image",
      label: "2nd Card Image",
      name: "imgSrc2",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "industry",
    },
    {
      type: "string",
      label: "2nd Header",
      name: "header2",
    },
    {
      type: "rich-text",
      label: "2nd Body",
      name: "body2",
    },
    {
      type: "image",
      label: "3rd Card Image",
      name: "imgSrc3",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "industry",
    },
    {
      type: "string",
      label: "3rd Header",
      name: "header3",
    },
    {
      type: "rich-text",
      label: "3rd Body",
      name: "body3",
    },
  ],
};

const whitepaperBlockSchema: Template = {
  name: "Whitepaper",
  label: "Whitepaper",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      required: true,
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      required: true,
    },
    {
      type: "string",
      label: "Button Text",
      name: "buttonText",
      required: true,
    },
    {
      type: "image",
      label: "Whitepaper File",
      name: "whitepaperFile",
      required: true,
    },
  ],
};

const bookingFormBlockSchema: Template = {
  name: "BookingForm",
  label: "Consulting Enquiry Form",
  fields: [
    {
      type: "string",
      label: "Placeholder",
      name: "placeholder",
      ui: {
        component: () => (
          <p>
            This is a placeholder block for&nbsp;
            <span className="font-bold">Consulting Enquiry Form</span>
          </p>
        ),
      },
    },
  ],
};

const contactUsBlockSchema: Template = {
  name: "ContactUs",
  label: "Contact Us",
  fields: [
    {
      type: "string",
      label: "Button Text",
      name: "buttonText",
    },
    {
      type: "string",
      label: "Link",
      name: "link",
    },
  ],
};

export const industrySchema: Collection = {
  label: "Industry - Pages",
  name: "industry",
  format: "mdx",
  path: "content/industry",
  ui: {
    ...kebabCaseFilename,
    router: ({ document }) => {
      return `/industry/${document._sys.filename}`;
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    {
      type: "string",
      label: "Page heading",
      name: "heading",
      required: true,
    },
    {
      type: "string",
      label: "Page Subheading",
      name: "subHeading",
    },
    {
      type: "image",
      label: "Banner Image",
      name: "bannerImg",
      required: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "industry",
    },
    {
      type: "image",
      label: "Whitepaper File",
      name: "whitepaperFile",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "files",
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [
        ...Schemas.pageBlocks,
        industrySolutionsRowSchema,
        whitepaperBlockSchema,
        bookingFormBlockSchema,
        contactUsBlockSchema,
      ],
      isBody: true,
    },
  ],
};
