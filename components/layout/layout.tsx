import React, { useRef, useState } from "react";
import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import { Theme } from "./theme";
import { Menu, MobileMenu } from "../../lib/ssw.megamenu";
import { classNames } from "tinacms";
import { LiveStreamBanner } from "../liveStreamBanner";

export const Layout = ({ children, className = "" }) => {
  const node = useRef<HTMLDivElement>();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const actionOnToggleClick = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  const handleClick = (e) => {
    if (node.current && !node.current.contains(e.target)) {
      setIsMenuOpened(false);
    }
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Theme>
        <LiveStreamBanner />
        <div
          className={classNames("relative min-h-screen", className)}
          onMouseDown={isMenuOpened ? (event) => handleClick(event) : null}
        >
          <div className="mx-auto max-w-9xl px-6 sm:px-8">
            <Header />
            <div ref={node} >
              <Menu onClickToggle={() => actionOnToggleClick()} />
              <MobileMenu isMenuOpened={isMenuOpened} />
            </div>
          </div>
          <main className="flex flex-1 flex-col from-white to-gray-50 text-gray-800">
            {children}
          </main>
          <Footer />
        </div>
      </Theme>
    </>
  );
};
