import classNames from "classnames";
import Document, { Head as H, Html, Main, NextScript } from "next/document";
import Head from "next/head";
import { useRouter } from "next/router";
import { useLiveStreamProps } from "../../hooks/useLiveStreamProps";
import { Footer } from "./footer/footer";
import { PreFooter } from "./footer/pre-footer";
import { Theme } from "./theme";

import { EventInfo, EventInfoStatic } from "@/services/server/events";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { Open_Sans } from "next/font/google";
import { useReportWebVitals } from "next/web-vitals";
import { MegaMenuLayout, NavMenuGroup } from "ssw.megamenu";
import { CustomLink } from "../customLink";
import { ErrorBoundary } from "../util/error/error-boundary";

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
  () => import("../liveStream/liveStreamBanner"),
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
  liveStreamData: {
    __typename?: "EventsCalendarConnection";
    totalCount: number;
    pageInfo: {
      __typename?: "PageInfo";
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
    edges?: {
      node?: EventInfoStatic;
    }[];
  };
}

export const Layout = ({
  liveStreamData,
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
    rightnow.isBefore(liveStreamProps?.event?.endDateTime);

  const showBanner =
    !!liveStreamProps?.event &&
    dayjs().isBetween(
      dayjs(liveStreamProps?.event.startShowBannerDateTime),
      dayjs(liveStreamProps?.event.endShowBannerDateTime),
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
            <LiveStreamBanner liveStreamData={liveStreamData?.edges[0]?.node} />
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
