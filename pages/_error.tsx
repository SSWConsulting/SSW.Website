import { ErrorPage } from "@/components/util/error-page";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { ErrorProps } from "next/error";

export default function UnderscoreErrorPage({ statusCode, title }: ErrorProps) {
  const appInsights = useAppInsightsContext();

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

  return <ErrorPage code={statusCode.toString()} />;
}

UnderscoreErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
