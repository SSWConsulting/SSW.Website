"use client";
import { MegaMenuWrapper } from "@/components/server/MegaMenuWrapper";
import { ErrorPage } from "@/components/util/error-page";
import { loadAppInsights } from "@/lib/app-insights";
import { inter } from "@/lib/fonts";
import { useEffect } from "react";
import "styles.css";
import menu from "../content/megamenu/menu.json";
import { MenuWrapper } from "./components/MenuWrapper";
import PageLayout from "./components/page-layout";

// Error boundaries must be Client Components

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    // This boundary replaces the root layout, so AppInsightsProvider is not in
    // the tree — it needs its own plugin and instance. No samplingPercentage:
    // every root-layout crash should be reported.
    void import("@microsoft/applicationinsights-react-js")
      .then(({ ReactPlugin }) =>
        loadAppInsights({ reactPlugin: new ReactPlugin() })
      )
      .then((appInsights) => {
        if (!appInsights) {
          // eslint-disable-next-line no-console
          console.error(
            "Failed to log root layout exception to Application Insights!"
          );
          return;
        }
        appInsights.trackException({
          exception: error,
          properties: {
            Request: `GET /${window?.location?.pathname || "unknown"}`,
            Type: "ErrorBoundary",
            ErrorInfo: error.stack || error.message,
          },
        });
      });
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
