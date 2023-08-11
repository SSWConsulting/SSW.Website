import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../.tina/__generated__/client";

import { Transition } from "@headlessui/react";
import { FaSpinner } from "react-icons/fa";
import { Blocks } from "../../components/blocks-renderer";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { EventsRelativeBox } from "../../components/events/components";
import { FilterBlock } from "../../components/filter/FilterBlock";
import { FilterGroupProps } from "../../components/filter/FilterGroup";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { SEO } from "../../components/util/seo";
import { formatEventDate, formatRelativeEventDate } from "../../helpers/dates";
import { EventInfo } from "../../services/server/events";

export default function EventsIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const [events, setEvents] = useState<EventInfo[]>(undefined);

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
        options: options.categories,
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
        <Container>
          <FilterBlock
            sidebarChildren={
              <div className="descendant-img:py-3">
                <TinaMarkdown
                  content={data.eventsIndex.sidebarBody}
                  components={componentRenderer}
                />
              </div>
            }
            groups={filters}
          >
            <div>
              <div className="prose-h1:pt-0 prose-h1:font-semibold">
                {data?.eventsIndex?.body && (
                  <TinaMarkdown
                    content={data.eventsIndex.body}
                    components={componentRenderer}
                  />
                )}
              </div>
              {filteredEvents ? (
                <>
                  {events?.map((event, index) => (
                    <Event
                      key={index}
                      visible={!!filteredEvents?.find((e) => e.id === event.id)}
                      title={event.Title}
                      url={event.Url.Url}
                      description={event.EventShortDescription}
                      imageUrl={event.Thumbnail.Url}
                      imageAlt={event.Thumbnail.Description}
                      startDateTime={event.StartDateTime}
                      endDateTime={event.EndDateTime}
                      type={event.CalendarType}
                      presenter={event.Presenter}
                    />
                  ))}
                </>
              ) : (
                <p className="flex flex-row text-xl">
                  <FaSpinner className="m-icon animate-spin" /> Loading
                  Events...
                </p>
              )}
            </div>
          </FilterBlock>
        </Container>
        <Blocks
          prefix="EventsIndexAfterEvents"
          blocks={data.eventsIndex.afterEvents}
        />
      </Layout>
    </>
  );
}

interface EventProps {
  visible?: boolean;
  title: string;
  url: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  startDateTime: Date;
  endDateTime: Date;
  type?: string;
  presenter?: string;
}

const Event = ({
  visible,
  title,
  url,
  description,
  imageUrl,
  imageAlt,
  startDateTime,
  endDateTime,
  type,
  presenter,
}: EventProps) => {
  return (
    <Transition
      show={!!visible}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <div className="mb-20">
        <div className="mb-8 flex flex-row">
          <div className="mr-3 shrink-0">
            <Image
              className="rounded-md"
              height={100}
              width={100}
              alt={imageAlt}
              src={imageUrl}
            />
          </div>
          <div>
            <h2 className="mt-0 font-semibold">
              <a className="!no-underline" href={url}>
                {title}
              </a>
            </h2>
            <EventsRelativeBox
              relativeDate={formatRelativeEventDate(startDateTime, endDateTime)}
              formattedDate={formatEventDate(startDateTime, endDateTime)}
            />
            <div>
              {type && (
                <>
                  <strong>Type:</strong> {type}{" "}
                </>
              )}
              {presenter && (
                <>
                  <strong>Presenter: </strong>
                  {presenter}
                </>
              )}
            </div>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: description,
          }}
          className="prose max-w-full prose-img:mx-1 prose-img:my-0 prose-img:inline"
        />
        <a href={url}>
          <p className="prose pt-3">Find out more...</p>
        </a>
      </div>
    </Transition>
  );
};

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
