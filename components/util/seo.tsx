import React, { FC } from "react";

import { NextSeo, NextSeoProps } from "next-seo";
import { NEXT_SEO_DEFAULT } from "../../next-seo.config";

interface SEOProps {
  seo?: Partial<NextSeoProps>;
}

export const SEO: FC<SEOProps> = ({ seo }) => {
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

export const seoSchema = {
  type: "object",
  label: "SEO",
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
  ],
};
