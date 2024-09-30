import "styles.css";
// import { CustomLink } from "@/components/customLink";
// import { Footer } from "@/components/layout/footer";
import { Footer } from "@/components/layout/footer/footer";
import { MegaMenuWrapper } from "@/components/server/MegaMenuWrapper";
import dynamic from "next/dynamic";

const ChatBaseBot = dynamic(
  () => import("@/components/zendeskButton/chatBaseBot"),
  { ssr: false }
);

import { AppInsightsProvider } from "@/context/app-insight-client";
import { EventInfoStatic } from "@/services/server/events";
import { GoogleTagManager } from "@next/third-parties/google";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import client from "../tina/__generated__/client";
import { MenuWrapper } from "./components/MenuWrapper";
import { WebVitals } from "./components/web-vitals";
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

export const revalidate = 3600;

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
        {/* <Theme> */}
        {/* Ensures next/font CSS variable is accessible for all components */}
        <div className="flex min-h-screen flex-col">
          <header className="no-print">
            {liveStreamData ? (
              <LiveStream event={liveStreamData}>
                <MegaMenuWrapper menu={menuData.data.megamenu.menuGroups} />
              </LiveStream>
            ) : (
              <MenuWrapper>
                <MegaMenuWrapper menu={menuData.data.megamenu.menuGroups} />
              </MenuWrapper>
            )}
          </header>
          <main className="grow bg-white">
            <AppInsightsProvider>
              <WebVitals />
              {children}
            </AppInsightsProvider>
          </main>
          <Footer />
        </div>
        {/* </Theme> */}
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_GTM_ID} />
        <ChatBaseBot />
      </body>
    </html>
  );
}
