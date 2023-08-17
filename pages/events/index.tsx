import { InferGetStaticPropsType } from "next";
import { useTina } from "tinacms/dist/react";
import client from "../../.tina/__generated__/client";

import { Blocks } from "../../components/blocks-renderer";
import { EventsFilter } from "../../components/filter/events";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { SEO } from "../../components/util/seo";

export default function EventsIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
    <>
      <SEO seo={data.eventsIndex.seo} />
      <Layout>
        <Container>
          <EventsFilter sidebarBody={data.eventsIndex.sidebarBody} />
        </Container>
        <Blocks
          prefix="EventsIndexAfterEvents"
          blocks={data.eventsIndex.afterEvents}
        />
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.eventsIndexContentQuery({
    relativePath: "index.mdx",
  });

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
    },
  };
};
