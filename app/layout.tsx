import "styles.css";

// import { CustomLink } from "@/components/customLink";
// import { Footer } from "@/components/layout/footer";
import classNames from "classnames";
import { Open_Sans } from "next/font/google";

import { Footer } from "@/components/layout/footer/footer";
import { MegaMenuWrapper } from "@/components/server/MegaMenuWrapper";
import ChatBaseBot from "@/components/zendeskButton/chatBaseBot";
import { Metadata, Viewport } from "next";

import { AppInsightsProvider } from "@/context/app-insight-client";
import { EventInfoStatic } from "@/services/server/events";
import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { GoogleTagManager } from "@next/third-parties/google";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Suspense } from "react";
import client from "../tina/__generated__/client";
import { MenuWrapper } from "./components/MenuWrapper";
import { TelemetryProvider } from "./components/TelemetryProvider";
import { LiveStream } from "./live-steam-banner/live-stream";
import { DEFAULT } from "./meta-data/default";
import { getMegamenu } from "./utils/get-mega-menu";

dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(isBetween);

const openSans = Open_Sans({
  variable: "--open-sans-font",
  subsets: ["latin"],
});

export const DEFAULT_METADATA: Metadata = {
  ...DEFAULT,
};

export const viewport: Viewport = {
  themeColor: "#cc4141",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuData = await getMegamenu();
  const nextUG = await client.queries.getFutureEventsQuery({
    fromDate: new Date().toISOString(),
    top: 1,
    calendarType: "User Groups",
  });
  const liveStreamData: EventInfoStatic =
    nextUG?.data?.eventsCalendarConnection?.edges?.length > 0
      ? nextUG?.data?.eventsCalendarConnection?.edges[0]?.node
      : null;
  return (
    <html lang="en" className={openSans.className}>
      <body>
        <AppInsightsProvider>
          <Suspense fallback={<p>Afternoon pog champ</p>}>
            {/* App Router components must be wrapped in a Suspense when retrieving url search params */}
            <TelemetryProvider>
              {/* <Theme> */}
              {/* Ensures next/font CSS variable is accessible for all components */}
              <div
                className={classNames(
                  "flex min-h-screen flex-col font-sans",
                  openSans.className
                )}
              >
                <header className="no-print">
                  {liveStreamData ? (
                    <LiveStream event={liveStreamData}>
                      <MegaMenuWrapper
                        menu={menuData.data.megamenu.menuGroups}
                      />
                    </LiveStream>
                  ) : (
                    <MenuWrapper>
                      <MegaMenuWrapper
                        menu={menuData.data.megamenu.menuGroups}
                      />
                    </MenuWrapper>
                  )}
                </header>
                <main className="grow bg-white">{children}</main>

                <Footer />
              </div>
              {/* </Theme> */}
              <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_GTM_ID} />
              <ChatBaseBot />
            </TelemetryProvider>
          </Suspense>
        </AppInsightsProvider>
      </body>
    </html>
  );
}
