import type { NextSeoProps } from "next-seo";
import footerData from "./content/footer/index.json";
import layoutData from "./content/global/index.json";

export const NEXT_SEO_DEFAULT: NextSeoProps = {
  defaultTitle: layoutData.header.title,
  titleTemplate: "%s",
  description: layoutData.header.description,
  themeColor: "#cc4141",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: layoutData.header.url,
    title: layoutData.header.title,
    description: layoutData.header.description,
    siteName: layoutData.header.site_name,
    images: [
      {
        url: layoutData.defaultOGImage,
        width: 1200,
        height: 630,
        alt: "SSW Consulting - Enterprise Software Development",
      },
    ],
  },
  twitter: {
    handle: footerData.socials.find((s) => s.type === "xtwitter")?.username,
    site: layoutData.header.url,
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      property: "keywords",
      content:
        ".NET, Web, Mobile, CRM, SharePoint, Azure, Power BI, Angular, React, Blazor, Office 365, Dynamics",
    },
  ],
};
