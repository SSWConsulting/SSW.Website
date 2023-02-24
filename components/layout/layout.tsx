import React from "react";
import Head from "next/head";
import { classNames } from "tinacms";
import { Header } from "./header";
import { Footer } from "./footer";
import { Theme } from "./theme";
import { LiveStreamBanner } from "../liveStreamBanner";
import { Menu } from "./menu";

export const Layout = ({ children, className = "" }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Theme>
        <div
          className={classNames("relative min-h-screen flex flex-col", className)}
        >
          <header>
            <LiveStreamBanner />
            <div className="mx-auto max-w-9xl px-6 sm:px-8">
              <Header />
              <Menu />
            </div>
          </header>
          <main className="grow bg-white">
            {children}
          </main>
          <Footer />
        </div>
      </Theme>
    </>
  );
};
