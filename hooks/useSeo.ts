import { DEFAULT_METADATA } from "app/layout";
import { Metadata } from "next";

export function useSEO(seo) {
  seo = seo || {};
  if (!seo) return null;

  let dynamicSEO: Metadata = {};
  const DEFAULT_OPEN_GRAPH_IMAGE = { ...DEFAULT_METADATA.openGraph.images[0] };

  dynamicSEO = {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      images: seo.images || DEFAULT_OPEN_GRAPH_IMAGE,
    },
    twitter: {
      site: seo.canonical,
    },
  };

  // Remove null values from SEO object
  Object.keys(dynamicSEO).forEach((key) => {
    if (!dynamicSEO[key]) {
      delete dynamicSEO[key];
    }
  });

  const seoProps = {
    ...DEFAULT_METADATA,
    ...dynamicSEO,
  };

  return { seoProps };
}
