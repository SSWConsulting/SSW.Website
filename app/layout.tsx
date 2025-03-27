import { MegaMenuWrapper } from "@/components/server/MegaMenuWrapper";
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
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import "styles.css";
import client from "../tina/__generated__/client";
import { MenuWrapper } from "./components/MenuWrapper";
import PageLayout from "./components/page-layout";
import { WebVitals } from "./components/web-vitals";
import { LiveStream } from "./live-steam-banner/live-stream";
import { DEFAULT } from "./meta-data/default";
import { QueryProvider } from "./providers/query-provider";
import { getMegamenu, MegaMenuProps } from "./utils/get-mega-menu";

dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(isBetween);

const inter = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});

const ChatBaseBot = dynamic(
  () => import("@/components/zendeskButton/chatBaseBot")
);

export const metadata: Metadata = {
  ...DEFAULT,
};

export const viewport: Viewport = {
  themeColor: "#cc4141",
  width: "device-width",
  initialScale: 1,
};

export const revalidate = 1800; // 30 minutes - Stale time is 1 hour

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
    <html lang="en" className={inter.className}>
      <body>
        <QueryProvider>
          {/* <Theme> */}
          {/* Ensures next/font CSS variable is accessible for all components */}
          <PageLayout
            megaMenu={MegaMenu({
              menuData: menuData,
              liveStreamData: liveStreamData,
            })}
          >
            <AppInsightsProvider>
              <WebVitals />
              {children}
            </AppInsightsProvider>
            {/* </Theme> */}
          </PageLayout>
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_GTM_ID} />
          <ChatBaseBot />
        </QueryProvider>
      </body>
    </html>
  );
}

const MegaMenu = ({
  liveStreamData,
  menuData,
}: {
  liveStreamData: EventInfoStatic;
  menuData: MegaMenuProps;
}) => {
  return (
    <>
      {liveStreamData ? (
        <LiveStream event={liveStreamData}>
          <MegaMenuWrapper menu={menuData.data.megamenu.menuGroups} />
        </LiveStream>
      ) : (
        <MenuWrapper>
          <MegaMenuWrapper menu={menuData.data.megamenu.menuGroups} />
        </MenuWrapper>
      )}
    </>
  );
};
