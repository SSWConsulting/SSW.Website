import classNames from "classnames";
import Head from "next/head";
import { useRouter } from "next/router";
import { useLiveStreamProps } from "../../hooks/useLiveStreamProps";
import { Footer } from "./footer";
// import { Header } from "./header";
import { Theme } from "./theme";

import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { Open_Sans } from "next/font/google";
import { WebSite, WithContext } from "schema-dts";
import { NavMenuGroup } from "ssw.megamenu";
import layoutData from "../../content/global/index.json";

export const openSans = Open_Sans({
  variable: "--open-sans-font",
  subsets: ["latin"],
});

const structuredData: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: layoutData.header.site_name,
  alternateName: layoutData.header.alternate_site_name,
  description: layoutData.header.description,
  url: layoutData.header.url,
};

const LiveStreamWidget = dynamic(
  () => {
    return import("../liveStream/liveStreamWidget").then(
      (mod) => mod.LiveStreamWidget
    );
  },
  {
    loading: () => <></>,
    ssr: true,
  }
);

const LiveStreamBanner = dynamic(
  () => {
    return import("../liveStream/liveStreamBanner").then(
      (mod) => mod.LiveStreamBanner
    );
  },
  {
    loading: () => <></>,
    ssr: true,
  }
);

interface LayoutProps {
  className?: string;
  menu: {
    menuGroups: NavMenuGroup[];
  };
  children: React.ReactNode;
}

export const Layout = ({ children, menu, className = "" }: LayoutProps) => {
  const liveStreamProps = useLiveStreamProps();
  const router = useRouter();

  const rightnow = dayjs().utc();

  const isLive =
    liveStreamProps?.countdownMins &&
    liveStreamProps?.countdownMins <= 0 &&
    !!liveStreamProps?.event &&
    rightnow.isBefore(liveStreamProps?.event?.EndDateTime);

  const showBanner =
    !!liveStreamProps?.event &&
    dayjs().isBetween(
      dayjs(liveStreamProps?.event.StartShowBannerDateTime),
      dayjs(liveStreamProps?.event.EndShowBannerDateTime),
      null,
      "[)"
    );

  return (
    <>
      <Head>
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

        {router.query.filename === "home" && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        )}
      </Head>
      <Theme>
        {/* Ensures next/font CSS variable is accessible for all components */}
        <style jsx global>{`
          :root {
            --open-sans-font: ${openSans.style.fontFamily};
          }
        `}</style>
        <div
          className={classNames(
            "flex min-h-screen flex-col font-sans",
            openSans.className,
            className
          )}
        >
          <header className="no-print">
            {(showBanner || router.query.liveBanner) && (
              <LiveStreamBanner {...liveStreamProps} isLive={!!isLive} />
            )}
            <div className="mx-auto max-w-9xl px-8">
              {(isLive || router.query.liveStream) && (
                <LiveStreamWidget {...liveStreamProps} isLive={!!isLive} />
              )}
              <MegaMenuLayout menuBarItems={menu.menuGroups} />
            </div>
          </header>
          <main className="grow bg-white">{children}</main>
          <Footer />
        </div>
      </Theme>
    </>
  );
};
