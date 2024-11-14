"use client";
import { MegaMenuWrapper } from "@/components/server/MegaMenuWrapper";
import { ErrorPage } from "@/components/util/error-page";
import { AppInsightsProvider } from "@/context/app-insight-client";
import { Inter } from "next/font/google";
import "styles.css";
import menu from "../content/megamenu/menu.json";
import GlobalErrorHandler from "./components/global-error-handler";
import { MenuWrapper } from "./components/MenuWrapper";
// Error boundaries must be Client Components

export default function GlobalError({ error }: { error: Error }) {
  const inter = Inter({
    variable: "--inter-font",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "600", "700"],
  });
  const errorDetails = error.stack || error.message;
  return (
    <html className={inter.className}>
      <body>
        <AppInsightsProvider>
          <GlobalErrorHandler error={error}>
            <MenuWrapper>
              <MegaMenuWrapper menuBarItems={menu.menuGroups} />
            </MenuWrapper>
            <ErrorPage details={errorDetails}></ErrorPage>
          </GlobalErrorHandler>
        </AppInsightsProvider>
      </body>
    </html>
  );
}
