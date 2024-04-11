import React from "react";
import { Collection, Template } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";
import { tipField } from "./shared-fields";

const industrySolutionsRowSchema: Template = {
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
    router: ({ document }) => {
      return `/industry/${document._sys.filename}`;
    },
  },
  fields: [
    tipField,
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
