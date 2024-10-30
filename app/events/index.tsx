"use client";

import { Blocks } from "@/components/blocks-renderer";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { EventsFilter } from "@/components/filter/events";
import { Container } from "@/components/util/container";
import { QueryProvider } from "app/providers/query-provider";
import { useSearchParams } from "next/navigation";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function EventsIndexPage({ props, tinaProps }) {
  const { filterCategories, futureEventsData, pastEventsData } = props;
  const { data } = tinaProps;
  // const futureEvents = getTrimmedEvent(futureEventsData);
  // const pastEvents = getTrimmedEvent(pastEventsData);

  const searchParams = useSearchParams();

  const defaultToPastTab = searchParams.get("past") === "1";

  return (
    <QueryProvider>
      <Container size="small">
        <div className="md:flex md:flex-row">
          <h1 className="md:mr-12 md:shrink-0 md:basis-64">SSW Events</h1>
          <div className="mt-5 min-w-0 max-w-full shrink grow overflow-auto whitespace-normal break-all pb-1 pt-15 md:mr-12 md:shrink-0 md:basis-64">
            <TinaMarkdown
              content={data.eventsIndex.preface}
              components={componentRenderer}
            />
          </div>
        </div>
        <EventsFilter
          filterCategories={filterCategories}
          sidebarBody={data.eventsIndex.sidebarBody}
          defaultToPastTab={defaultToPastTab}
          futureEvents={futureEventsData}
          pastEvents={pastEventsData}
        />
      </Container>
      <Blocks
        prefix="EventsIndexAfterEvents"
        blocks={data.eventsIndex.afterEvents}
      />
    </QueryProvider>
  );
}
