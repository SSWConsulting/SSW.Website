import { ErrorPage } from "@/components/util/error-page";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { NextPageContext } from "next";
import { ErrorProps } from "next/error";
import { useEffect } from "react";

export default function UnderscoreErrorPage({ statusCode, title }: ErrorProps) {
  const appInsights = useAppInsightsContext();

  useEffect(() => {
    if (appInsights) {
      appInsights.trackException({
        exception: new Error(`Error ${statusCode}`),
        properties: {
          Request: "GET /_error",
          Status: statusCode,
          Title: title,
        },
      });
    }
  }, [appInsights, statusCode, title]);

  return <ErrorPage code={statusCode.toString()} />;
}

UnderscoreErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
