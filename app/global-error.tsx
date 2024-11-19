"use client";
import ErrorFooter from "@/components/layout/footer/error-footer";
import { MegaMenuWrapper } from "@/components/server/MegaMenuWrapper";
import { ErrorPage } from "@/components/util/error-page";
import { AppInsightsProvider } from "@/context/app-insight-client";
import { Inter } from "next/font/google";
import "styles.css";
import menu from "../content/megamenu/menu.json";
import GlobalErrorHandler from "./components/global-error-handler";
import { MenuWrapper } from "./components/MenuWrapper";
import PageLayout from "./components/page-layout";
import { WebVitals } from "./components/web-vitals";
// Error boundaries must be Client Components

const inter = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export default function GlobalError({ error }: { error: Error }) {
  const errorDetails = error.stack || error.message;
  return (
    <html lang="en" className={inter.className}>
      <body>
        <PageLayout footer={ErrorFooter()} megaMenu={MegaMenu()}>
          <AppInsightsProvider>
            <WebVitals />
            <GlobalErrorHandler error={error}>
              <ErrorPage details={errorDetails}></ErrorPage>
            </GlobalErrorHandler>
          </AppInsightsProvider>
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
