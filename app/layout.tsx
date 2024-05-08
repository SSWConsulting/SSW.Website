import "styles.css";

// import { CustomLink } from "@/components/customLink";
// import { Footer } from "@/components/layout/footer";
import classNames from "classnames";
import { Open_Sans } from "next/font/google";
// import Head from "next/head";
// import { Theme } from "../components/layout/theme";
import { Analytics } from "@/components/layout/analytics";
import { Footer } from "@/components/layout/footer/footer";
import ChatBaseBot from "@/components/zendeskButton/chatBaseBot";
import { Metadata, Viewport } from "next";
import { cache } from "react";
import { MenuWrapper } from "../components/server/MenuWrapper";
import client from "../tina/__generated__/client";

import { getEvents } from "@/services/server/events";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import Head from "next/head";
import layoutData from "../content/global/index.json";
import { LiveSteam } from "./live-steam-banner/live-stream";

dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(isBetween);

const getMegamenu = cache(async () => {
  const data = await client.queries.megamenu({
    relativePath: "menu.json",
  });

  return data;
});

const openSans = Open_Sans({
  variable: "--open-sans-font",
  subsets: ["latin"],
});

export const DEFAULT_METADATA: Metadata = {
  metadataBase: new URL(layoutData.header.url),
  title: {
    default: layoutData.header.title,
    template: "%s",
  },
  generator: "Next.js",
  applicationName: "SSW.Website",
  publisher: "SSW",
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

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const getLiveBanner = async () => {
  const isoTime = new Date().toISOString();

  const odataFilter = `$filter=fields/Enabled ne false \
  and fields/EndDateTime ge '${isoTime}'\
  and fields/CalendarType eq 'User Groups'\
  &$orderby=fields/StartDateTime asc\
  &$top=1`;
  const res = await getEvents(odataFilter);

  if (!res?.length) {
    return;
  }

  return res[0];
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuData = await getMegamenu();
  const liveStreamData = await getLiveBanner();

  return (
    <html lang="en" className={openSans.className}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#cc4141" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Analytics />
        {/* <Theme> */}
        {/* Ensures next/font CSS variable is accessible for all components */}
        <div
          className={classNames(
            "flex min-h-screen flex-col font-sans",
            openSans.className
          )}
        >
          <header className="no-print">
            <LiveSteam event={liveStreamData}>
              <MenuWrapper menu={menuData.data.megamenu.menuGroups} />
            </LiveSteam>
          </header>
          <main className="grow bg-white">{children}</main>

          <Footer />
        </div>
        {/* </Theme> */}
        <ChatBaseBot />
      </body>
    </html>
  );
}
