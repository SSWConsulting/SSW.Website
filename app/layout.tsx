import { Footer } from "@/components/layout/footer/footer";
import { MegaMenuWrapper } from "@/components/server/MegaMenuWrapper";
import dynamic from "next/dynamic";
import "styles.css";

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
import { Inter } from "next/font/google";
import client from "../tina/__generated__/client";
import { WebVitals } from "./components/web-vitals";
import LayoutWrapper from "./layout-wrapper";
import { DEFAULT } from "./meta-data/default";
import { getMegamenu } from "./utils/get-mega-menu";

dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(isBetween);

const inter = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const ChatBaseBot = dynamic(
  () => import("@/components/zendeskButton/chatBaseBot"),
  { ssr: false }
);

export const DEFAULT_METADATA: Metadata = {
  ...DEFAULT,
};

export const viewport: Viewport = {
  themeColor: "#cc4141",
  width: "device-width",
  initialScale: 1,
};

export const revalidate = 3600;
throw new Error("Testing error boundary");
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
    <LayoutWrapper liveStreamData={liveStreamData}>
      <AppInsightsProvider>
        <WebVitals />
        {children}
      </AppInsightsProvider>
    </LayoutWrapper>
  );
}
