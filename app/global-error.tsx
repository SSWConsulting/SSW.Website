"use client";
import { ErrorPage } from "@/components/util/error-page";
import { AppInsightsProvider } from "@/context/app-insight-client";
import GlobalErrorHandler from "./components/global-error-handler";
import LayoutWrapper from "./layout-wrapper";
// Error boundaries must be Client Components

export default function GlobalError({ error }: { error: Error }) {
  const errorDetails = error.stack || error.message;
  return (
    <html>
      <body>
        <AppInsightsProvider>
          <LayoutWrapper>
            <GlobalErrorHandler error={error}>
              <ErrorPage details={errorDetails}></ErrorPage>
            </GlobalErrorHandler>
          </LayoutWrapper>
        </AppInsightsProvider>
      </body>
    </html>
  );
}
