import classNames from "classnames";
import Head from "next/head";
import { useRouter } from "next/router";
import { useLiveStreamProps } from "../../hooks/useLiveStreamProps";
import { Footer, PreFooter } from "./footer";
import { Theme } from "./theme";

import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { Open_Sans } from "next/font/google";
import { useReportWebVitals } from "next/web-vitals";
import { MegaMenuLayout, NavMenuGroup } from "ssw.megamenu";
import { CustomLink } from "../customLink";
import { ErrorBoundary } from "../util/error-boundary";

const openSans = Open_Sans({
  variable: "--open-sans-font",
  subsets: ["latin"],
});

const LiveStreamWidget = dynamic(
  () => {
    return import("../liveStream/liveStreamWidget").then(
      (mod) => mod.LiveStreamWidget
    );
  },
  {
    loading: () => <></>,
    ssr: true,
  }
);

const LiveStreamBanner = dynamic(
  () => {
    return import("../liveStream/liveStreamBanner").then(
      (mod) => mod.LiveStreamBanner
    );
  },
  {
    loading: () => <></>,
    ssr: true,
  }
);

interface LayoutProps {
  className?: string;
  menu: {
    menuGroups: NavMenuGroup[];
  };
  children: React.ReactNode;
  showAzureBanner?: boolean;
}

export const Layout = ({
  children,
  menu,
  className = "",
  showAzureBanner,
}: LayoutProps) => {
  const liveStreamProps = useLiveStreamProps();
  const router = useRouter();

  const rightnow = dayjs().utc();

  const isLive =
    liveStreamProps?.countdownMins &&
    liveStreamProps?.countdownMins <= 0 &&
    !!liveStreamProps?.event &&
    rightnow.isBefore(liveStreamProps?.event?.EndDateTime);

  const showBanner =
    !!liveStreamProps?.event &&
    dayjs().isBetween(
      dayjs(liveStreamProps?.event.StartShowBannerDateTime),
      dayjs(liveStreamProps?.event.EndShowBannerDateTime),
      null,
      "[)"
    );

  const appInsights = useAppInsightsContext();

  useReportWebVitals((metric) => {
    switch (metric.name) {
      case "TTFB":
      case "FCP":
      case "LCP":
      case "FID":
      case "CLS":
      case "INP":
        appInsights.trackMetric(
          { name: metric.name, average: metric.value },
          { page: router.asPath }
        );
        break;
    }
  });

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#cc4141" />
        <meta name="msapplication-TileColor" content="#cc4141" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Theme>
        {/* Ensures next/font CSS variable is accessible for all components */}
        <style jsx global>{`
          :root {
            --open-sans-font: ${openSans.style.fontFamily};
          }
        `}</style>
        <div
          className={classNames(
            "flex min-h-screen flex-col font-sans",
            openSans.className,
            className
          )}
        >
          <header className="no-print">
            {(showBanner || router.query.liveBanner) && (
              <LiveStreamBanner {...liveStreamProps} isLive={!!isLive} />
            )}
            <div className="mx-auto max-w-9xl px-8">
              {(isLive || router.query.liveStream) && (
                <LiveStreamWidget {...liveStreamProps} isLive={!!isLive} />
              )}
              <MegaMenuLayout
                menuBarItems={menu.menuGroups}
                linkComponent={(props) => (
                  <CustomLink
                    {...props}
                    className={classNames("unstyled", props.className)}
                  />
                )}
              />
            </div>
          </header>
          <ErrorBoundary key={router.asPath}>
            <main className={classNames("grow bg-white")}>{children}</main>

            {showAzureBanner && <PreFooter />}
            <Footer />
          </ErrorBoundary>
        </div>
      </Theme>
    </>
  );
};
