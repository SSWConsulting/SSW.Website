"use client";

import { Blocks } from "@/components/blocks-renderer";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { EventsFilter } from "@/components/filter/events";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { removeExtension } from "@/services/client/utils.service";
import { HydrationBoundary } from "@tanstack/react-query";
import { Breadcrumbs } from "app/components/breadcrumb";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function EventsIndexPage({ props, tinaProps }) {
  const { filterCategories } = props;
  const { data } = tinaProps;
  return (
    <HydrationBoundary state={props.dehydratedState}>
      <Section className="mx-auto min-h-24 w-full max-w-9xl px-8 py-5 md:min-h-16">
        <Breadcrumbs
          path={removeExtension(props.variables.relativePath)}
          title={data.eventsIndex.seo?.title}
          seoSchema={data.eventsIndex.seo}
        />
      </Section>
      <Container size="small" className="!pb-8 !pt-0">
        <div className="md:flex md:flex-row">
          <h1 className="pt-0 md:mr-12 md:shrink-0 md:basis-64">SSW Events</h1>
          <div className="mt-5 min-w-0 max-w-full shrink grow overflow-auto whitespace-normal break-all pb-1 pt-5 md:mr-12 md:shrink-0 md:basis-64">
            <TinaMarkdown
              content={data.eventsIndex.preface}
              components={componentRenderer}
            />
          </div>
        </div>
        <EventsFilter
          filterCategories={filterCategories}
          sidebarBody={data.eventsIndex.sidebarBody}
        />
      </Container>
      <Blocks
        prefix="EventsIndexAfterEvents"
        blocks={data.eventsIndex.afterEvents}
      />
    </HydrationBoundary>
  );
}
