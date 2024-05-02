import { Metadata } from "next";

export function useSEO(seo) {
  if (!seo) return null;

  let dynamicSEO: Metadata = {};

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
      images: seo.images ?? null,
    },
    twitter: {
      site: seo.canonical,
    },
  };

  // Remove null values from SEO object
  Object.keys(dynamicSEO).forEach((key) => {
    if (!dynamicSEO[key]) {
      delete seo[key];
    }
  });

  return { dynamicSEO };
}
