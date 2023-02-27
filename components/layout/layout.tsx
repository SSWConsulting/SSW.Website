import Head from "next/head";
import { MenuBar } from "ssw.megamenu";
import { classNames } from "tinacms";
import { LiveStream } from "../liveStream/liveStream";
import { LiveStreamBanner } from "../liveStream/liveStreamBanner";
import { useLiveStreamProps } from "../liveStream/useLiveStreamProps";
import { Footer } from "./footer";
import { Header } from "./header";
import { Theme } from "./theme";

export const Layout = ({ children, className = "" }) => {
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
        >
          <header>
            <LiveStreamBanner {...liveStreamProps} />
            <div className="mx-auto max-w-9xl px-6 sm:px-8">
              <Header />
              <MenuBar />
              <LiveStream {...liveStreamProps} />
            </div>
          </header>
          <main className="grow bg-white">{children}</main>
          <Footer />
        </div>
      </Theme>
    </>
  );
};
