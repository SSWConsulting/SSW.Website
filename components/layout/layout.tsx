import { Suspense } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { classNames } from "tinacms";
import { Header } from "./header";
import { Footer } from "./footer";
import { Theme } from "./theme";
import { MenuBar } from "ssw.megamenu";
import { LiveStream } from "../liveStream/liveStream";
import { LiveStreamBanner } from "../liveStream/liveStreamBanner";
import { useLiveStreamProps } from "../liveStream/useLiveStreamProps";

import layoutData from "../../content/global/index.json";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: layoutData.header.site_name,
  alternateName: layoutData.header.alternate_site_name,
  description: layoutData.header.description,
  url: layoutData.header.url,
};

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
        <div
          className={classNames(
            "flex min-h-screen flex-col font-sans",
            className
          )}
        >
          <header className="no-print">
            <Suspense fallback={<></>}>
              <LiveStreamBanner {...liveStreamProps} />
            </Suspense>
            <div className="mx-auto max-w-9xl px-6 sm:px-8">
              <Header />
              <MenuBar />
              <Suspense fallback={<></>}>
                <LiveStream {...liveStreamProps} />
              </Suspense>
            </div>
          </header>
          <main className="grow bg-white">{children}</main>
          <Footer />
        </div>
      </Theme>
    </>
  );
};
