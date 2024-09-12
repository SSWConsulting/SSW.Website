import { Layout } from "@/components/layout";
import { ErrorPage } from "@/components/util/error-page";
import client from "@/tina/client";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { TODAY } from "hooks/useFetchEvents";
import { getUpcomingUG } from "hooks/useLiveStreamProps";
import { InferGetStaticPropsType } from "next";
import { useEffect } from "react";

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
    <Layout liveStreamData={props.data.userGroup} menu={props.data.megamenu}>
      <ErrorPage code="500" title="INTERNAL SERVER ERROR!" />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.layoutQuery({
    date: TODAY.toISOString(),
  });
  const liveStreamData = await getUpcomingUG();

  return {
    props: {
      ...tinaProps,
      liveStreamData,
    },
  };
};
