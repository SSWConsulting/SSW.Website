"use client";
import { Footer } from "@/components/layout/footer/footer";
import { MegaMenuWrapper } from "@/components/server/MegaMenuWrapper";
import ChatBaseBot from "@/components/zendeskButton/chatBaseBot";
import { AppInsightsProvider } from "@/context/app-insight-client";
import { EventInfoStatic } from "@/services/server/events";
import { GoogleTagManager } from "@next/third-parties/google";
import { LiveStream } from "app/live-steam-banner/live-stream";
import classNames from "classnames";
import { Open_Sans } from "next/font/google";
import { ReadonlyURLSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { MenuWrapper } from "./MenuWrapper";
import { ParamsProvider } from "./ParamsProvider";
import { TelemetryProvider } from "./TelemetryProvider";

type LayoutContentProps = {
  liveStreamData?: EventInfoStatic;
  menuData: any;
  children: React.ReactNode;
  params?: ReadonlyURLSearchParams;
};

const openSans = Open_Sans({
  variable: "--open-sans-font",
  subsets: ["latin"],
});

export const LayoutContent = ({
  children,
  liveStreamData,
  menuData,
}: LayoutContentProps) => {
  const [queryParams, setQueryParams] = useState<ReadonlyURLSearchParams>(null);

  return (
    <AppInsightsProvider>
      <ParamsProvider setQueryParams={setQueryParams}>
        <Suspense
          fallback={
            <Content liveStreamData={liveStreamData} menuData={menuData}>
              {children}
            </Content>
          }
        >
          {/* App Router components must be wrapped in a Suspense when retrieving url search params */}
          <TelemetryProvider>
            <Content
              params={queryParams}
              liveStreamData={liveStreamData}
              menuData={menuData}
            >
              {children}
            </Content>
          </TelemetryProvider>
        </Suspense>
      </ParamsProvider>
    </AppInsightsProvider>
  );
};

type ContentProps = LayoutContentProps & {
  liveStreamData?: EventInfoStatic;
  menuData: any;
  children: React.ReactNode;
  params?: ReadonlyURLSearchParams;
};

const Content = ({ liveStreamData, menuData, children }: ContentProps) => {
  return (
    <>
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
              <MegaMenuWrapper menu={menuData.data.megamenu.menuGroups} />
            </LiveStream>
          ) : (
            <MenuWrapper>
              <MegaMenuWrapper menu={menuData.data.megamenu.menuGroups} />
            </MenuWrapper>
          )}
        </header>
        <main className="grow bg-white">{children}</main>

        <Footer />
      </div>
      {/* </Theme> */}
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_GTM_ID} />
      <ChatBaseBot />
    </>
  );
};
