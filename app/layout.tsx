import "styles.css";

import { EventInfoStatic } from "@/services/server/events";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Metadata, Viewport } from "next";
import client from "../tina/__generated__/client";
import LayoutWrapper from "./layout-wrapper";
import { DEFAULT } from "./meta-data/default";

dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(isBetween);

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
    <LayoutWrapper liveStreamData={liveStreamData}>{children}</LayoutWrapper>
  );
}
