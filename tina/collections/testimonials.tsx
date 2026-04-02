import type { Collection, TinaField } from "tinacms";

import React from "react";
import { extractFileName } from "../../helpers/functions";
export const tipForReference: TinaField = {
  type: "string",
  name: "tipForReference",
  label: "Tip",
  ui: {
    component: () => {
      return (
        // eslint-disable-next-line tailwindcss/no-custom-classname
        <div className="whitepace-normal">
          {" "}
          💡 Testimonials will be shown in the following order.
        </div>
      );
    },
  },
};

export const testimonialSchema: Collection = {
  label: "Testimonials",
  name: "testimonials",
  format: "json",
  path: "content/testimonials",
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
          label: "Link",
          name: "link",
          fields: [
            {
              type: "string",
              label: "URL",
              name: "url",
            },
            {
              type: "string",
              label: "Title",
              name: "title",
            },
          ],
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
