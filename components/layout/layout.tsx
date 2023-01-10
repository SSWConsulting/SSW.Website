import React from "react";
import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import { Theme } from "./theme";

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Theme>
        <div>
          <Header  />
          <div className="flex flex-1 flex-col">
            {children}
          </div>
          <Footer />
        </div>
      </Theme>
    </>
  );
};
