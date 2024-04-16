import "styles.css";

// import { CustomLink } from "@/components/customLink";
// import { Footer } from "@/components/layout/footer";
import classNames from "classnames";
import { Open_Sans } from "next/font/google";
// import Head from "next/head";
// import { Theme } from "../components/layout/theme";
import { Analytics } from "@/components/layout/analytics";
import ChatBaseBot from "@/components/zendeskButton/chatBaseBot";
import client from "@/tina/client";
import { Metadata } from "next";
import { cache } from "react";
import { MenuWrapper } from "../components/server/MenuWrapper";

const getMegamenu = cache(async () => {
  const data = await client.queries.megamenu({
    relativePath: "menu.json",
  });

  return { ...data, timestamp: new Date() };
});

const openSans = Open_Sans({
  variable: "--open-sans-font",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  themeColor: "#ffffff",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add React cache
  const menuData = await getMegamenu();

  return (
    <html lang="en" className={openSans.className}>
      {/* <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#cc4141" />
        <meta name="theme-color" content="#ffffff" />
      </Head> */}
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
            {/* {(showBanner || router.query.liveBanner) && (
                <LiveStreamBanner {...liveStreamProps} isLive={!!isLive} />
              )} */}
            <div className="mx-auto max-w-9xl px-8">
              {/* {(isLive || router.query.liveStream) && (
                  <LiveStreamWidget {...liveStreamProps} isLive={!!isLive} />
                )} */}
              <MenuWrapper menu={menuData.data.megamenu.menuGroups} />
            </div>
          </header>
          <main className="grow bg-white">
            <h1>{menuData.timestamp}</h1>
            {children}
          </main>

          {/* {showAzureBanner && <PreFooter />} */}
          {/* <Footer /> */}
        </div>
        {/* </Theme> */}
        <ChatBaseBot />
      </body>
    </html>
  );
}
