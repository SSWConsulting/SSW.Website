import classNames from "classnames";
import Head from "next/head";
import { useRouter } from "next/router";
import { MenuBar } from "ssw.megamenu";
import { useLiveStreamProps } from "../liveStream/useLiveStreamProps";
import { Footer } from "./footer";
import { Header } from "./header";
import { Theme } from "./theme";

import dynamic from "next/dynamic";
import { Open_Sans } from "next/font/google";
import layoutData from "../../content/global/index.json";

export const openSans = Open_Sans({
  variable: "--open-sans-font",
  subsets: ["latin"],
});

const structuredData = {
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
    ssr: false,
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
    ssr: false,
  }
);

export const Layout = ({ children, className = "" }) => {
  const liveStreamProps = useLiveStreamProps();
  const router = useRouter();

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
            {(liveStreamProps.showBanner || router.query.liveBanner) && (
              <LiveStreamBanner {...liveStreamProps} />
            )}
            <div className="mx-auto max-w-9xl px-6 sm:px-8">
              <Header />
              <MenuBar />
              {(liveStreamProps.isLive || router.query.liveStream) && (
                <LiveStreamWidget {...liveStreamProps} />
              )}
            </div>
          </header>
          <main className="grow bg-white">{children}</main>
          <Footer />
        </div>
      </Theme>
    </>
  );
};
