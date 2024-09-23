import "styles.css";

// import { CustomLink } from "@/components/customLink";
// import { Footer } from "@/components/layout/footer";
import { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";

import { EventInfoStatic } from "@/services/server/events";
import { MegamenuQuery } from "@/tina/types";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import client from "../tina/__generated__/client";
import { LayoutContent } from "./components/LayoutContent";
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

export type MenuData = {
  data: MegamenuQuery;
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
        <LayoutContent menuData={menuData}>{children}</LayoutContent>
      </body>
    </html>
  );
}
