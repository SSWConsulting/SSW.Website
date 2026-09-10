"use client";

import { Blocks } from "@/components/blocks-renderer";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { EventsFilter } from "@/components/filter/events";
import { HomeThemeShell } from "@/components/layout/homeTheme";
import { sidebarPageContainer } from "@/components/layout/stickySidebar";
import { removeExtension } from "@/services/client/utils.service";
import { HydrationBoundary } from "@tanstack/react-query";
import { Breadcrumbs } from "app/components/breadcrumb";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function EventsIndexPage({ props, tinaProps }) {
  const { filterCategories } = props;
  const { data } = tinaProps;

  return (
    <HydrationBoundary state={props.dehydratedState}>
      <HomeThemeShell className="min-h-screen bg-sunken-glow">
        <div className={sidebarPageContainer}>
          <div className="min-h-12">
            <Breadcrumbs
              path={removeExtension(props.variables.relativePath)}
              title={data.eventsIndex.seo?.title}
              seoSchema={data.eventsIndex.seo}
            />
          </div>

          {data.eventsIndex.preface?.children?.length > 0 && (
            <div className="mb-8 max-w-3xl text-muted-foreground">
              <TinaMarkdown
                content={data.eventsIndex.preface}
                components={componentRenderer}
              />
            </div>
          )}

          <EventsFilter filterCategories={filterCategories} />
        </div>

        <Blocks
          prefix="EventsIndexAfterEvents"
          blocks={data.eventsIndex.afterEvents}
        />
      </HomeThemeShell>
    </HydrationBoundary>
  );
}
