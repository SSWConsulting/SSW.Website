import React, { useRef, useState } from "react";
import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import { Theme } from "./theme";
import { Menu, MobileMenu } from "ssw.megamenu"

export const Layout = ({ children }) => {
  const node = useRef<HTMLDivElement>();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const actionOnToggleClick = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  const handleClick = (e) => {
      if (node.current){
        node.current.contains(e.target) ?? setIsMenuOpened(false);
      }
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Theme>
        <div>
          <div
            ref={node}
            onMouseDown={isMenuOpened ? (event) => handleClick(event) : null}>
            <Header />
            <Menu onClickToggle={() => actionOnToggleClick()} />
            <div className="flex flex-1 flex-col bg-gradient-to-br from-white to-gray-50 text-gray-800 dark:from-gray-900 dark:to-gray-1000">
              {children}
            </div>
            <Footer />
          </div>
          <MobileMenu isMenuOpened={isMenuOpened}></MobileMenu>
        </div>
      </Theme>
    </>
  );
};