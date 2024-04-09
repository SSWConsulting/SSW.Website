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
import { cache } from "react";
import { MenuWrapper } from "../components/server/MenuWrapper";

const getMegamenu = cache(async () => {
  return await client.queries.megamenu({
    relativePath: "menu.json",
  });
});

const openSans = Open_Sans({
  variable: "--open-sans-font",
  subsets: ["latin"],
});

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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#cc4141" />
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
          <main className="grow bg-white">{children}</main>

          {/* {showAzureBanner && <PreFooter />} */}
          {/* <Footer /> */}
        </div>
        {/* </Theme> */}
        <ChatBaseBot />
      </body>
    </html>
  );
}
