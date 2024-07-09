import { NextSeo, NextSeoProps } from "next-seo";
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
  label: "SEO Values",
  name: "seo",
  fields: [
    {
      type: "string",
      label: "Title (70 characters)",
      name: "title",
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
