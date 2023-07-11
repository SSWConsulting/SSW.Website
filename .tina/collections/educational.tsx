import React from "react";
import { Collection, Template } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";

const educationalSolutionsBlockSchema: Template = {
  name: "Solutions",
  label: "Educational Solutions",
  fields: [
    {
      type: "object",
      label: "Educational Solutions",
      name: "educationalSolutions",
      list: true,
      fields: [
        {
          type: "image",
          label: "Image",
          name: "solutionImage",
          required: true,
          // @ts-ignore
          uploadDir: () => "/educational",
        },
        {
          type: "string",
          label: "Name",
          name: "name",
          required: true,
        },
        {
          type: "string",
          label: "Description",
          name: "description",
          required: true,
        },
      ],
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
        educationalSolutionsBlockSchema,
        whitepaperBlockSchema,
        bookingFormBlockSchema,
        contactUsBlockSchema,
      ],
      isBody: true,
    },
  ],
};
