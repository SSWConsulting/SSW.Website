import React from "react";
import { Collection, Template } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";

const educationalSolutionsRowSchema: Template = {
  name: "SolutionsRow",
  label: "Educational Solutions Row",
  fields: [
    {
      type: "image",
      label: "1st Card Image",
      name: "imgSrc1",
      // @ts-ignore
      uploadDir: () => "/educational",
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
      // @ts-ignore
      uploadDir: () => "/educational",
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
      // @ts-ignore
      uploadDir: () => "/educational",
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

export const educationalSchema: Collection = {
  label: "Educational - Index",
  name: "educational",
  format: "mdx",
  path: "content/educational",
  ui: {
    router: ({ document }) => {
      return "/educational";
    },
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "image",
      label: "Banner Image",
      name: "bannerImg",
      required: true,
      // @ts-ignore
      uploadDir: () => "/educational",
    },
    {
      type: "image",
      label: "Whitepaper File",
      name: "whitepaperFile",
      required: true,
      // @ts-ignore
      uploadDir: () => "/files",
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [
        ...Schemas.pageBlocks,
        educationalSolutionsRowSchema,
        whitepaperBlockSchema,
        bookingFormBlockSchema,
        contactUsBlockSchema,
      ],
      isBody: true,
    },
  ],
};
