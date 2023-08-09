import { InferGetStaticPropsType } from "next";
import { useEffect, useState } from "react";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../.tina/__generated__/client";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { FilterBlock } from "../../components/filter/FilterBlock";
import { FilterGroupProps } from "../../components/filter/FilterGroup";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";

export default function EventsIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const [events, setEvents] = useState(undefined);
  const [filteredEvents, setFilteredEvents] = useState(undefined);

  const [filters, setFilters] = useState<FilterGroupProps[]>([]);

  useEffect(() => {
    fetch(`/api/get-upcoming-events?top=${5}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setEvents(json);

        const categories = json.map((m) => m.Category_f5a9cf4c_x002d_8228_x00);
      });
  }, []);

  return (
    <>
      <SEO seo={data.eventsIndex.seo} />
      <Layout>
        <Section color="white">
          <Container>
            <FilterBlock groups={[]}>
              <p></p>
            </FilterBlock>
            {data?.eventsIndex?.body && (
              <TinaMarkdown
                content={data.eventsIndex.body}
                components={componentRenderer}
              />
            )}
            <pre>
              <code>{JSON.stringify(events)}</code>
            </pre>
          </Container>
        </Section>
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
