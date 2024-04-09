import { ErrorPage } from "@/components/util/error/error-page";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { InferGetStaticPropsType } from "next";
import { useEffect } from "react";
import client from "../.tina/__generated__/client";

export default function FiveHundred(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const appInsights = useAppInsightsContext();

  useEffect(() => {
    if (appInsights) {
      appInsights.trackException({
        exception: new Error(`Error ${500}`),
        properties: {
          Request: "GET /500",
          Status: 500,
        },
      });
    }
  }, [appInsights]);

  return (
    <ErrorPage
      code="500"
      menu={props.data.megamenu}
      title="INTERNAL SERVER ERROR!"
    />
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.layoutQuery();

  return {
    props: tinaProps,
  };
};
