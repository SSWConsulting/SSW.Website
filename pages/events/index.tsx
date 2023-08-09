import { InferGetStaticPropsType } from "next";
import { useEffect, useMemo, useState } from "react";
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

  const [filterControls, setFilterControls] = useState<number[]>([-1, -1]);

  const options = useMemo(() => {
    const categories =
      events
        ?.map((event) => event.Category_f5a9cf4c_x002d_8228_x00)
        ?.filter((value, index, self) => self.indexOf(value) === index)
        ?.sort() || [];

    const formats =
      events
        ?.map((event) => event.CalendarType)
        ?.filter((value, index, self) => self.indexOf(value) === index)
        ?.sort() || [];

    return { categories, formats };
  }, [events]);

  const filters = useMemo<FilterGroupProps[]>(() => {
    if (!events) return [];

    const test: FilterGroupProps[] = [
      {
        selected: filterControls[0],
        setSelected: (value) => setFilterControls((curr) => [value, curr[1]]),
        options: options.formats,
        allText: "All Technology",
      },
      {
        selected: filterControls[1],
        setSelected: (value) => setFilterControls((curr) => [curr[0], value]),
        options: options.formats,
        allText: "All Formats",
      },
    ];

    return test;
  }, [filterControls, options]);

  const filteredEvents = useMemo(() => {
    return events?.filter(
      (event) =>
        (filterControls[0] === -1 ||
          event.Category_f5a9cf4c_x002d_8228_x00 ===
            options.categories[filterControls[0]]) &&
        (filterControls[1] === -1 ||
          event.CalendarType === options.formats[filterControls[1]])
    );
  }, [events, filterControls]);

  useEffect(() => {
    fetch(`/api/get-upcoming-events?top=${5}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setEvents(json);
      });
  }, []);

  return (
    <>
      <SEO seo={data.eventsIndex.seo} />
      <Layout>
        <Section color="white">
          <Container>
            {filters && filteredEvents && (
              <FilterBlock groups={filters}>
                {filteredEvents.map((event) => (
                  <div key={event.Id}>
                    <h2>{event.Title}</h2>
                    <p>{event.Description}</p>
                  </div>
                ))}
              </FilterBlock>
            )}

            {data?.eventsIndex?.body && (
              <TinaMarkdown
                content={data.eventsIndex.body}
                components={componentRenderer}
              />
            )}

            <pre>
              <code>{JSON.stringify(events)}</code>
            </pre>
            <button onClick={() => setEvents([])}>Hello</button>
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
