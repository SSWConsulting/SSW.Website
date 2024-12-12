import { NextSeo, NextSeoProps } from "next-seo";
import React from "react";
import layoutData from "../../content/global/index.json";
import { NEXT_SEO_DEFAULT } from "../../next-seo.config";
import { TextInputWithCount } from "../textInputWithCount/textInputWithCount";

export const SEO = ({ seo }) => {
  if (!seo) return null;

  let seoPartial: Partial<NextSeoProps> = {};

  seoPartial = {
    title: seo.title,
    description: seo.description,
    canonical: seo.canonical,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      images: seo.images ?? null,
    },
    twitter: {
      site: seo.canonical,
    },
  };

  // Remove null values from SEO object
  Object.keys(seoPartial).forEach((key) => {
    if (!seoPartial[key]) {
      delete seo[key];
    }
  });

  const seoProps = {
    ...NEXT_SEO_DEFAULT,
    ...seoPartial,
  };

  return <NextSeo {...seoProps} />;
};

export const seoSchema = {
  type: "object",
  label: "Page Metadata",
  component: "group",
  title: "SEO",
  description: "Update the title, description, URL, and OG image",
  name: "seo",
  fields: [
    {
      type: "string",
      label: "Title (70 characters)",
      name: "title",
      description:
        "This is going to be the meta (SEO) title used, to be indexed by search engines. It should be 70 characters or less.",
      ui: {
        validate: (value) => {
          if (value && value.length > 70) {
            return "Title should be 70 characters or less";
          }
        },
        component: TextInputWithCount(70),
      },
    },
    {
      type: "string",
      label: "Description (150 characters)",
      name: "description",
      component: "textarea",
      description:
        "This is going to be the meta (SEO) description used, to be indexed by search engines. It should be 150 characters or less.",
      ui: {
        validate: (value) => {
          if (value && value.length > 150) {
            return "Description should be 150 characters or less";
          }
        },
        component: TextInputWithCount(150, true),
      },
    },
    {
      type: "string",
      label: "Canonical URL",
      name: "canonical",
    },
    {
      type: "boolean",
      desciption:
        "DISREGARD THIS FIELD. This is for the old breadcrumb components only.",
      name: "showBreadcrumb",
      label: "Show Breadcrumb",
    },
    {
      label: "Images",
      name: "images",
      list: true,
      type: "object",
      ui: {
        itemProps: (item) => {
          return { label: item.url };
        },
        defaultItem: {
          url: layoutData.defaultOGImage,
          width: 1200,
          height: 630,
          alt: "SSW Consulting - Enterprise Software Development",
        },
      },
      fields: [
        {
          type: "image",
          label: "Image Url",
          name: "url",
          require: true,
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
