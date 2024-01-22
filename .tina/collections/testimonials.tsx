import type { Collection, TinaField } from "tinacms";

import React from "react";
import { ratingSchema } from "../../components/util/consulting/rating";
import { extractFileName } from "../../helpers/functions";
import { tipField } from "./shared-fields";

export const testimonialSchema: Collection = {
  label: "Testimonials",
  name: "testimonials",
  format: "mdx",
  path: "content/testimonials",
  fields: [
    tipField,
    {
      type: "string",
      label: "Name",
      name: "name",
      required: true,
    },
    {
      type: "image",
      label: "Avatar",
      name: "avatar",
      required: false,
      // @ts-ignore
      uploadDir: () => "testimonialAvatars",
    },
    {
      type: "string",
      label: "Company",
      name: "company",
      required: false,
    },
    {
      ...ratingSchema,
      required: true,
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      isBody: true,
    },
    {
      type: "object",
      label: "Categories",
      name: "categories",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.category ?? "Select your testimonial category",
          };
        },
      },
      fields: [
        {
          type: "reference",
          label: "Category",
          name: "category",
          collections: ["testimonialCategories"],
        },
      ],
    },
  ],
};

export const tipForReference: TinaField = {
  type: "string",
  name: "tipForReference",
  label: "Tip",
  ui: {
    component: ({}) => {
      return (
        <div className="whitepace-normal">
          {" "}
          💡 Testimonials will be shown in the following order, if it is not in
          the list, it will be placed at the bottom.
        </div>
      );
    },
  },
};
var index = 1;

export const testimonialsOrderableSchema: Collection = {
  label: "Testimonials - Orderable ",
  name: "testimonialsOrderable",
  format: "json",
  path: "content/testimonialsOrder",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    tipForReference,
    {
      type: "object",
      label: "Testimonials",
      name: "testimonials",
      ui: {
        itemProps: (item) => {
          const fileName = extractFileName(item?.testimonialOrder);

          return {
            label: fileName,
          };
        },
      },
      list: true,
      fields: [
        {
          type: "reference",
          label: "Name",
          name: "testimonialOrder",
          collections: ["testimonials"],
        },
      ],
    },
  ],
};

export const testimonialsNewSchema: Collection = {
  label: "Testimonials - New ",
  name: "testimonialsNew",
  format: "json",
  path: "content/testimonialsNew",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      type: "object",
      label: "Testimonials",
      name: "testimonials",
      ui: {
        itemProps: (item) => {
          const categories = item?.categories?.map((item) =>
            extractFileName(item?.category)
          );
          const joinedCategories = categories?.join(" - ");
          const customLabel = `${item?.name} - ${joinedCategories ?? ""}`;
          return {
            label: customLabel,
          };
        },
      },
      list: true,
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
          required: true,
        },
        {
          type: "image",
          label: "Avatar",
          name: "avatar",
          required: false,
          // @ts-ignore
          uploadDir: () => "testimonialAvatars",
        },
        {
          type: "string",
          label: "Company",
          name: "company",
          required: false,
        },
        {
          type: "rich-text",
          label: "Body",
          name: "body",
          isBody: true,
        },
        {
          type: "object",
          label: "Categories",
          name: "categories",
          list: true,
          ui: {
            itemProps: (item) => {
              return {
                label:
                  extractFileName(item?.category) ??
                  "Select your testimonial category",
              };
            },
          },
          fields: [
            {
              type: "reference",
              label: "Category",
              name: "category",
              collections: ["testimonialCategories"],
            },
          ],
        },
      ],
    },
  ],
};
