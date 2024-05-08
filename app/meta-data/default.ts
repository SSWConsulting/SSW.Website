import { Metadata } from "next";
import layoutData from "../../content/global/index.json";

export const DEFAULT: Metadata = {
  metadataBase: new URL(layoutData.header.url),
  title: {
    default: layoutData.header.title,
    template: "%s",
  },
  generator: "Next.js",
  applicationName: "SSW.Website",
  publisher: "SSW",
  description: layoutData.header.description,
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
    site: layoutData.header.url,
    card: "summary_large_image",
  },
  keywords: [
    ".NET",
    "Web",
    "Mobile",
    "CRM",
    "SharePoint",
    "Azure",
    "Power BI",
    "Angular",
    "React",
    "Blazor",
    "Office 365",
    "Dynamics",
  ],
  icons: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "mask-icon",
      color: "#cc4141",
      url: "/safari-pinned-tab.svg",
    },
  ],
  manifest: "/site.webmanifest",
};
