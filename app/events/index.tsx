"use client";

import { Blocks } from "@/components/blocks-renderer";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { EventsFilter } from "@/components/filter/events";
import { Container } from "@/components/util/container";
import { getTrimmedEvent } from "@/helpers/getTrimmedEvent";
import { dehydrate, HydrationBoundary, useQuery } from "@tanstack/react-query";
import queryClient from "app/providers/get-query-client";
import { getFutureEvents, getPastEvents } from "hooks/useFetchEvents";
import { useSearchParams } from "next/navigation";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function EventsIndexPage({ props, tinaProps }) {
  const { filterCategories, futureEventsData, pastEventsData } = props;
  const { data: tinaData } = tinaProps;

  const { data: FutureEvents } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getFutureEvents(),
    initialData: futureEventsData,
  });
  const { data: PastEvents } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPastEvents(),
    initialData: pastEventsData,
  });

  const futureEvents = getTrimmedEvent(FutureEvents);
  const pastEvents = getTrimmedEvent(PastEvents);

  const dehydratedState = dehydrate(queryClient());

  const searchParams = useSearchParams();

  const defaultToPastTab = searchParams.get("past") === "1";

  return (
    <HydrationBoundary state={dehydratedState}>
      <Container size="small">
        <div className="md:flex md:flex-row">
          <h1 className="md:mr-12 md:shrink-0 md:basis-64">SSW Events</h1>
          <div className="mt-5 min-w-0 max-w-full shrink grow overflow-auto whitespace-normal break-all pb-1 pt-15 md:mr-12 md:shrink-0 md:basis-64">
            <TinaMarkdown
              content={tinaData.eventsIndex.preface}
              components={componentRenderer}
            />
          </div>
        </div>
        <EventsFilter
          filterCategories={filterCategories}
          sidebarBody={tinaData.eventsIndex.sidebarBody}
          defaultToPastTab={defaultToPastTab}
          futureEvents={futureEvents}
          pastEvents={pastEvents}
        />
      </Container>
      <Blocks
        prefix="EventsIndexAfterEvents"
        blocks={tinaData.eventsIndex.afterEvents}
      />
    </HydrationBoundary>
  );
}
