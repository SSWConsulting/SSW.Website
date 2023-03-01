import { Suspense } from "react";
import Head from "next/head";
import { Open_Sans } from "next/font/google";
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

const openSans = Open_Sans({
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

        <style jsx global>
          {`
            :root {
              --open-sans-font: ${openSans.style.fontFamily};
            }
          `}
        </style>
      </Head>
      <Theme>
        <div
          className={classNames(
            "relative flex min-h-screen flex-col",
            className
          )}
        >
          <header>
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
          <main className="grow bg-white -z-100">{children}</main>
          <Footer />
        </div>
      </Theme>
    </>
  );
};
