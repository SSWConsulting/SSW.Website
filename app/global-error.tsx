"use client";
import { MegaMenuWrapper } from "@/components/server/MegaMenuWrapper";
import { ErrorPage } from "@/components/util/error-page";
import { AppInsightsProvider } from "@/context/app-insight-client";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import "styles.css";
import menu from "../content/megamenu/menu.json";
import GlobalErrorHandler from "./components/global-error-handler";
import { MenuWrapper } from "./components/MenuWrapper";
import PageLayout from "./components/page-layout";

// Error boundaries must be Client Components

const inter = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    const reactPlugin = new ReactPlugin();
    const appInsights = new ApplicationInsights({
      config: {
        connectionString: process.env.NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING,
        extensions: [reactPlugin],
        autoExceptionInstrumented: true,
        autoTrackPageVisitTime: true,
        enableRequestHeaderTracking: true,
        enableResponseHeaderTracking: true,
        enableAjaxErrorStatusText: true,
        distributedTracingMode: 0,
        loggingLevelTelemetry: 1,
        loggingLevelConsole: 1,
        extensionConfig: {
          [reactPlugin.identifier]: {},
        },
        disablePageUnloadEvents: ["unload"],
      },
    });

    if (appInsights.config.connectionString) {
      appInsights.loadAppInsights();
      appInsights.trackException({ error: error });
    } else {
      // eslint-disable-next-line no-console
      console.error(
        "Failed to log root layout exception to Application Insights!"
      );
    }
  }, [error]);

  const errorDetails = error.stack || error.message;
  return (
    <html lang="en" className={inter.className}>
      <body>
        <PageLayout megaMenu={MegaMenu()}>
          <ErrorPage details={errorDetails}></ErrorPage>
        </PageLayout>
      </body>
    </html>
  );
}

const MegaMenu = () => {
  return (
    <MenuWrapper>
      <MegaMenuWrapper menuBarItems={menu.menuGroups} />
    </MenuWrapper>
  );
};
