import React, { useRef, useState } from "react";
import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import { Theme } from "./theme";
import { Menu, MobileMenu } from "../../lib/ssw.megamenu";
import { classNames } from "tinacms";
import { LiveStreamBanner } from "../liveStreamBanner";
import LiveStream from "../liveStream/liveStream";

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
        <div
          className={classNames("relative min-h-screen flex flex-col", className)}
          onMouseDown={isMenuOpened ? (event) => handleClick(event) : null}
        >
          <header>
            <LiveStreamBanner />
            <div className="mx-auto max-w-9xl px-6 sm:px-8">
              <Header />
              <div ref={node} >
                <Menu onClickToggle={() => actionOnToggleClick()} />
                <MobileMenu isMenuOpened={isMenuOpened} />
                <LiveStream />
              </div>
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
