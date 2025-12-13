import classNames from "classnames";
import { useRouter } from "next/router";
import { useLiveStreamTimer } from "../../hooks/useLiveStreamProps";
import { Footer } from "./footer/footer";
import { Theme } from "./theme";

import {
  EventInfo,
  EventInfoStatic,
  formatDates,
} from "@/services/server/events-types";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { useReportWebVitals } from "next/web-vitals";
import { MegaMenuLayout, NavMenuGroup } from "ssw.megamenu";
import { CustomLink } from "../customLink";
import { ErrorBoundary } from "../util/error/error-boundary";

const inter = Inter({
  variable: "--inter-font",
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
export type LiveStreamData = {
  edges?: {
    node?: EventInfoStatic;
  }[];
};
interface LayoutProps {
  className?: string;
  menu: {
    menuGroups: NavMenuGroup[];
  };
  children: React.ReactNode;
  liveStreamData: LiveStreamData;
}

export const Layout = ({
  liveStreamData,
  children,
  menu,
  className = "",
}: LayoutProps) => {
  const eventJson: EventInfoStatic = liveStreamData?.edges[0]?.node;

  const event: EventInfo = eventJson
    ? { ...eventJson, ...formatDates(eventJson) }
    : null;

  const { countdownMins, liveStreamDelayMinutes } = useLiveStreamTimer(event);
  const router = useRouter();

  const rightnow = dayjs().utc();

  const isLive =
    countdownMins &&
    countdownMins <= 0 &&
    !!event &&
    rightnow.isBefore(event.endDateTime);

  const showBanner =
    !!event &&
    dayjs().isBetween(
      dayjs(event.startShowBannerDateTime),
      dayjs(event.endShowBannerDateTime),
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
            --inter-font: ${inter.style.fontFamily};
          }
        `}</style>
        <div
          className={classNames(
            "flex min-h-screen flex-col font-sans",
            inter.className,
            className
          )}
        >
          <header className="no-print">
            {event && (showBanner || router?.query?.liveBanner?.length > 0) && (
              <LiveStreamBanner
                countdownMins={countdownMins}
                liveStreamData={event}
                isLive={!!isLive}
              />
            )}
            <div className="mx-auto max-w-9xl px-8">
              {event && (isLive || router?.query?.liveStream) && (
                <LiveStreamWidget
                  event={event}
                  countdownMins={countdownMins}
                  liveStreamDelayMinutes={liveStreamDelayMinutes}
                  isLive={!!isLive}
                />
              )}
              <MegaMenuLayout
                menuBarItems={menu.menuGroups}
                tagline="Enterprise Software Development"
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
            <Footer />
          </ErrorBoundary>
        </div>
      </Theme>
    </>
  );
};
