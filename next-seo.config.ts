import type { NextSeoProps } from "next-seo";
import layoutData from "./content/global/index.json";

export const NEXT_SEO_DEFAULT: NextSeoProps = {
  defaultTitle: layoutData.header.title,
  titleTemplate: `%s | ${layoutData.header.name}`,
  description: layoutData.header.description,
  themeColor: "#cc4141",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: layoutData.header.url,
    title: layoutData.header.title,
    description: layoutData.header.description,
    siteName: layoutData.header.name,
  },
  twitter: {
    handle: layoutData.socials.find(s => s.type === "twitter")?.username,
    site: layoutData.header.url,
    cardType: "summary_large_image",
  },
};