"use client";
import { ErrorPage } from "@/components/util/error-page";
import { AppInsightsProvider } from "@/context/app-insight-client";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { useEffect } from "react";
import LayoutWrapper from "./layout-wrapper";
// Error boundaries must be Client Components
const appInsights = useAppInsightsContext();

export default function GlobalError({ error }: { error: Error }) {
  const errorDetails = error.stack || error.message;
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
    appInsights.trackException({
      exception: error,
      properties: {
        Request: `GET /${window?.location?.pathname || "unknown"}`,
        Type: "ErrorBoundary",
        ErrorInfo: errorDetails,
      },
    });
  });

  return (
    <html>
      <body>
        <AppInsightsProvider>
          <LayoutWrapper>
            <ErrorPage details={errorDetails}></ErrorPage>
          </LayoutWrapper>
        </AppInsightsProvider>
      </body>
    </html>
  );
}
