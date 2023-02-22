import Head from "next/head";
import { useRef, useState } from "react";
import { classNames } from "tinacms";
import { Menu, MobileMenu } from "../../lib/ssw.megamenu";
import { LiveStream } from "../liveStream/liveStream";
import { LiveStreamBanner } from "../liveStream/liveStreamBanner";
import { useLiveStreamProps } from "../liveStream/useLiveStreamProps";
import { Footer } from "./footer";
import { Header } from "./header";
import { Theme } from "./theme";

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

  const liveStreamProps = useLiveStreamProps();

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
          onMouseDown={isMenuOpened ? (event) => handleClick(event) : null}
        >
          <header>
            <LiveStreamBanner {...liveStreamProps} />
            <div className="mx-auto max-w-9xl px-6 sm:px-8">
              <Header />
              <div ref={node}>
                <Menu onClickToggle={() => actionOnToggleClick()} />
                <MobileMenu isMenuOpened={isMenuOpened} />
                <LiveStream {...liveStreamProps} />
              </div>
            </div>
          </header>
          <main className="grow bg-white">{children}</main>
          <Footer />
        </div>
      </Theme>
    </>
  );
};
