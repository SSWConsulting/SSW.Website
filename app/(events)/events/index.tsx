"use client";

import { Blocks } from "@/components/blocks-renderer";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { EventsFilter } from "@/components/filter/events";
import { HomeThemeShell } from "@/components/layout/homeTheme";
import { removeExtension } from "@/services/client/utils.service";
import { HydrationBoundary } from "@tanstack/react-query";
import { Breadcrumbs } from "app/components/breadcrumb";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function EventsIndexPage({ props, tinaProps }) {
  const { filterCategories } = props;
  const { data } = tinaProps;

  return (
    <HydrationBoundary state={props.dehydratedState}>
      {/* min-h-screen, not min-h-full: PageLayout's <main> has an unconditional
          bg-white, so any shortfall shows as a white band under the themed
          content. */}
      <HomeThemeShell className="min-h-screen bg-sunken-glow">
        <div className="mx-auto max-w-8xl px-6 pb-16 pt-4 max-md:px-3 max-md:pb-12 max-md:pt-3">
          <div className="min-h-12">
            <Breadcrumbs
              path={removeExtension(props.variables.relativePath)}
              title={data.eventsIndex.seo?.title}
              seoSchema={data.eventsIndex.seo}
            />
          </div>

          {data.eventsIndex.preface && (
            <div className="mb-8 max-w-3xl text-muted-foreground">
              <TinaMarkdown
                content={data.eventsIndex.preface}
                components={componentRenderer}
              />
            </div>
          )}

          {/* The page h1 lives in the sidebar, mirroring /consulting. */}
          <EventsFilter
            filterCategories={filterCategories}
            sidebarBody={data.eventsIndex.sidebarBody}
          />
        </div>

        <Blocks
          prefix="EventsIndexAfterEvents"
          blocks={data.eventsIndex.afterEvents}
        />
      </HomeThemeShell>
    </HydrationBoundary>
  );
}
