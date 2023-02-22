import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Header } from "./header";
import { Footer } from "./footer";
import { Theme } from "./theme";
import { MenuBar } from "ssw.megamenu";
import { classNames } from "tinacms";
import { LiveStreamBanner } from "../liveStreamBanner";

import layoutData from "../../content/global/index.json";

export const Layout = ({ children, className = "" }) => {
  const router = useRouter();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: layoutData.header.site_name,
    alternateName: layoutData.header.alternate_site_name,
    description: layoutData.header.description,
    url: layoutData.header.url,
  };

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
            "relative flex min-h-screen flex-col",
            className
          )}
        >
          <header>
            <LiveStreamBanner />
            <div className="mx-auto max-w-9xl px-6 sm:px-8">
              <Header />
            </div>
            <MenuBar className="mx-auto max-w-9xl px-6 sm:px-8" />
          </header>
          <main className="grow bg-white">{children}</main>
          <Footer />
        </div>
      </Theme>
    </>
  );
};
