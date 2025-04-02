import { DEFAULT } from "@/app/meta-data/default";
import { Metadata } from "next";

export function getSEOProps(seo): Metadata {
  if (!seo) return DEFAULT;

  const DEFAULT_OPEN_GRAPH_IMAGE = DEFAULT.openGraph?.images?.[0] || {};

  const dynamicSEO: Metadata = {
    title: seo.title || DEFAULT.title,
    description: seo.description || DEFAULT.description,
    alternates: {
      canonical: seo.canonical || DEFAULT.alternates?.canonical,
    },
    openGraph: {
      title: seo.title || DEFAULT.openGraph?.title,
      description: seo.description || DEFAULT.openGraph?.description,
      url: seo.canonical || DEFAULT.openGraph?.url,
      images: seo.images || [DEFAULT_OPEN_GRAPH_IMAGE],
    },
    twitter: {
      site: seo.canonical || DEFAULT.twitter?.site,
    },
  };

  // Remove null values
  Object.keys(dynamicSEO).forEach((key) => {
    if (!dynamicSEO[key]) {
      delete dynamicSEO[key];
    }
  });

  return {
    ...DEFAULT,
    ...dynamicSEO,
  };
}
