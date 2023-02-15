import React from "react";
import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import { Theme } from "./theme";
import { MenuBar } from "ssw.megamenu";
import { classNames } from "tinacms";
import { LiveStreamBanner } from "../liveStreamBanner";

export const Layout = ({ children, className = "" }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
