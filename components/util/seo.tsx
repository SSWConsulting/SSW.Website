import React, { FC } from "react";

import { NextSeo, NextSeoProps } from "next-seo";
import { NEXT_SEO_DEFAULT } from "../../next-seo.config";

interface SEOProps {
  seo?: Partial<NextSeoProps>;
}

export const SEO: FC<SEOProps> = ({ seo }) => {
  if (!seo) return null;

  // Remove null values from SEO object
  Object.keys(seo).forEach((key) => {
    if (!seo[key]) {
      delete seo[key];
    }
  });

  const seoProps = {
    ...NEXT_SEO_DEFAULT,
    ...seo,
  };

  return <NextSeo {...seoProps} />;
};

const openGraphSchema = {
  type: "object",
  label: "Open Graph",
  name: "openGraph",
  fields: [
    {
      type: "string",
      label: "Type",
      name: "type",
      component: "select",
      options: [
        {
          value: "website",
          label: "Website",
        },
        {
          value: "video.movie",
          label: "Video",
        },
      ],
    },
    {
      type: "string",
      label: "Url",
      name: "url",
    },
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
    },
    {
      label: "Images",
      name: "images",
      list: true,
      type: "object",
      ui: {
        itemProps: (item) => {
          return { label: item.url }
        },
        defaultItem: {
          url: "/",
          width: 800,
          height: 600,
          alt: "Default alt text",
        }
      },
      fields: [
        {
          type: "string",
          label: "Image Url",
          name: "url",
        },
        {
          type: "number",
          label: "Width (px)",
          name: "width",
        },
        {
          type: "number",
          label: "Height (px)",
          name: "height",
        },
        {
          type: "string",
          label: "Image Alt Text",
          name: "alt",
        },
      ],
    },
  ],
};

export const seoSchema = {
  type: "object",
  label: "SEO Values",
  name: "seo",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
    },
    {
      type: "string",
      label: "Canonical URL",
      name: "canonical",
    },
    openGraphSchema,
  ],
};
