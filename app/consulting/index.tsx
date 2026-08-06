"use client";

import ConsultingCard from "@/components/consulting/consultingCard/consultingCard";
import { HomeThemeShell } from "@/components/layout/homeTheme";
import {
  ALL_SERVICES,
  buildConsultingSections,
} from "@/helpers/consultingSections";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "app/components/breadcrumb";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { tinaField } from "tinacms/dist/react";

// Shared by the sidebar <h1> and the category <h2>s so the two stay in lockstep.
const headingClass =
  "text-xl font-semibold leading-tight max-md:text-lg xl:text-2xl";

// scroll-behavior: smooth is set globally on html (styles.css), and "auto"
// defers to it — only "instant" actually skips the animation.
const scrollBehaviour = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant"
    : "smooth";

export default function ConsultingIndex({ tinaProps }) {
  const node = tinaProps.data.consultingIndex;
  // Defaults to All so a fresh visit (or an unrecognised hash) shows everything
  // rather than an empty filtered view. Also what SSR renders, so crawlers see
  // every section.
  const [selectedTag, setSelectedTag] = useState<string>(ALL_SERVICES);
  const contentRef = useRef<HTMLDivElement>(null);

  const { sections, contentSections, allViewSections } = useMemo(
    () => buildConsultingSections(node),
    [node]
  );

  const visibleSections = useMemo(
    () =>
      selectedTag === ALL_SERVICES
        ? allViewSections
        : contentSections.filter((section) => section.name === selectedTag),
    [contentSections, allViewSections, selectedTag]
  );

  // Deep links (e.g. the mega menu's #consulting-platform-development) select
  // that filter on load, rather than scrolling to it among everything else.
  const applyUrlFilter = useCallback(() => {
    if (!contentSections.length) return;

    const hash = window.location.hash.replace("#", "");
    // ?tag= was the pre-redesign filter URL and is still live in bookmarks and
    // search results, so keep honouring it.
    const legacyTag = new URLSearchParams(window.location.search)
      .get("tag")
      ?.replace(/-/g, " ");

    const match = contentSections.find(
      (section) =>
        section.sectionId === hash ||
        (!!legacyTag && section.name?.toLowerCase() === legacyTag.toLowerCase())
    );
    if (!match) return;

    setSelectedTag(match.name);
    // Native anchor-scroll already ran against the unfiltered SSR page.
    // Filtering shrinks the page afterwards and the old offset gets clamped
    // against the shorter one, landing near the bottom. Re-align once the
    // filtered content has committed.
    window.requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    });
  }, [contentSections]);

  useEffect(() => {
    applyUrlFilter();
    // Same-route hash navigation (the mega menu links here) does not remount
    // this component, so without these listeners a second click is a no-op.
    window.addEventListener("hashchange", applyUrlFilter);
    window.addEventListener("popstate", applyUrlFilter);
    return () => {
      window.removeEventListener("hashchange", applyUrlFilter);
      window.removeEventListener("popstate", applyUrlFilter);
    };
  }, [applyUrlFilter]);

  const onNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    tag: { name: string; sectionId: string }
  ) => {
    // Let the browser handle modified clicks so the href still opens in a new
    // tab or window.
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }
    event.preventDefault();
    setSelectedTag(tag.name);
    window.history.replaceState(
      null,
      "",
      tag.name === ALL_SERVICES ? window.location.pathname : `#${tag.sectionId}`
    );
    // Scroll only AFTER the filtered content has committed — same
    // shrink-then-clamp trap as applyUrlFilter above.
    window.requestAnimationFrame(() => {
      const content = contentRef.current;
      if (!content) return;
      // Read scroll-margin-top off the element so this stays in step with
      // whichever scroll-mt-* is active at the current breakpoint.
      const offset =
        parseFloat(window.getComputedStyle(content).scrollMarginTop) || 0;
      const target = Math.max(
        0,
        window.scrollY + content.getBoundingClientRect().top - offset
      );
      // Only ever scroll up. If the section top is already on screen, pinning
      // it would just hide the breadcrumbs for no reason.
      if (window.scrollY > target) {
        window.scrollTo({ top: target, behavior: scrollBehaviour() });
      }
    });
  };

  return (
    // min-h-screen, not min-h-full: PageLayout's <main> has an unconditional
    // bg-white, so any shortfall shows as a white band under the themed
    // content. 100vh needs no cooperation from the ancestor's height.
    <HomeThemeShell className="min-h-screen bg-sunken-glow">
      <div className="mx-auto max-w-8xl px-6 pb-16 pt-4 max-md:px-3 max-md:pb-12 max-md:pt-3">
        <div className="min-h-12">
          <Breadcrumbs path={"/consulting"} title={"Services"} />
        </div>

        <div className="grid grid-cols-sidebar items-start gap-8 max-xl:grid-cols-sidebar-narrow max-md:grid-cols-1 max-md:gap-4">
          {/* A plain div, not <aside>: <nav> below is already its own landmark,
              and wrapping it only filed the <h1> under "complementary". */}
          <div
            className={cn(
              "sticky top-headerOffset self-start",
              "max-md:top-headerOffsetMobile max-md:z-15 max-md:-mx-3 max-md:border-b-0.75 max-md:border-hairline max-md:bg-sunken-scrim max-md:px-3 max-md:pb-2.5 max-md:pt-2 max-md:backdrop-blur"
            )}
          >
            <h1
              className={cn(
                headingClass,
                "m-0 whitespace-nowrap p-0 text-foreground max-md:mb-2"
              )}
            >
              SSW Services
            </h1>
            <nav aria-label="Consulting categories">
              <ul className="m-0 mt-5 flex list-none flex-col gap-1.5 p-0 max-md:mt-0 max-md:flex-row max-md:gap-2 max-md:overflow-x-auto max-md:whitespace-nowrap max-md:pb-0.5">
                {sections.map((section) => {
                  const isActive = section.name === selectedTag;

                  return (
                    <li
                      key={section.sectionId}
                      data-tina-field={tinaField(
                        node.sidebar[section.index],
                        "label"
                      )}
                    >
                      <a
                        href={
                          section.name === ALL_SERVICES
                            ? "/consulting"
                            : `#${section.sectionId}`
                        }
                        onClick={(event) => onNavClick(event, section)}
                        // "location" is the ARIA value for current position
                        // within a flow, which is what this expresses.
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "unstyled block min-h-11 rounded-lg px-2.5 py-2 text-base leading-tight no-underline transition-colors duration-150 motion-reduce:transition-none",
                          // Label colour only on hover, no background.
                          "text-gray-600 hover:text-foreground dark:text-muted-foreground",
                          // A ring, not `outline`: tailwind-merge drops the
                          // bare `outline` class, leaving outline-style: none.
                          "focus-visible:ring-2 focus-visible:ring-brand",
                          "max-md:rounded-full max-md:border-0.75 max-md:border-hairline max-md:bg-gray-100 max-md:px-3 max-md:py-2.5 dark:max-md:bg-card",
                          isActive && "text-brand"
                        )}
                      >
                        {section.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div
            ref={contentRef}
            className="min-w-0 scroll-mt-28 max-md:scroll-mt-32"
          >
            {visibleSections.map((section) => (
              <section
                id={section.sectionId}
                key={section.sectionId}
                className="scroll-mt-28 not-first:mt-16 max-md:scroll-mt-32"
              >
                <h2
                  className={cn(
                    headingClass,
                    "m-0 mb-4 p-0 text-brand max-md:mb-3"
                  )}
                  data-tina-field={tinaField(
                    node.sidebar[section.index],
                    "label"
                  )}
                >
                  {section.label}
                </h2>

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  {section.pages.map((page) => (
                    <ConsultingCard
                      key={`${section.sectionId}-${page.id}`}
                      url={page.url}
                      title={page.title}
                      description={page.description}
                      logo={page.logo}
                      popular={page.popular}
                      tinaPage={page.tinaPage}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </HomeThemeShell>
  );
}
