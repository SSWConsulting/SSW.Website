"use client";

import ConsultingCard from "@/components/consulting/consultingCard/consultingCard";
import { HomeThemeShell } from "@/components/layout/homeTheme";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "app/components/breadcrumb";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { tinaField } from "tinacms/dist/react";

const allServices = "All SSW Services";
// The tag content/consulting/tag/consulting.json ("Other SSW Services") is
// already the established catch-all for anything that doesn't fit a specific
// category — every other page in that bucket is tagged this explicitly. Pages
// with no tags at all get defaulted here too, so they render under Other SSW
// Services instead of silently matching zero sections.
const otherServices = "Other SSW Services";

// Styling is Tailwind-only (no CSS module). Every colour resolves to a global
// design token from styles.css via the utilities mapped in tailwind.config.js
// (`sunken-glow`, `brand`, `hairline`, `card`, `foreground`, …), switched
// with `dark:` — this page defines no CSS variables of its own. `max-md:` /
// `max-xl:` mirror the old max-width 767px / 1279px media queries, so the
// cascade order is unchanged.

// Shared by the sidebar <h1> and the category <h2>s so the two stay in lockstep.
const headingType =
  "text-xl font-semibold leading-tight max-md:text-lg xl:text-2xl";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const mapPageUrl = (page) =>
  page.externalUrl ||
  page.page.id
    .replace("content/consultingv2", "/consulting")
    .replace("content", "")
    .replace(".mdx", "")
    .replace(".json", "");

export default function ConsultingIndex({ tinaProps }) {
  const node = tinaProps.data.consultingIndex;
  // "All SSW Services" shows every section; picking any other tag hides the
  // rest. Defaults to All so a fresh visit (or an unrecognised/missing hash)
  // shows everything rather than an empty filtered view.
  const [selectedTag, setSelectedTag] = useState<string>(allServices);
  const contentRef = useRef<HTMLDivElement>(null);

  const tags = useMemo(() => {
    return (
      node.sidebar?.map((item, index) => ({
        label: item.label,
        name: item.tag?.name,
        index,
        sectionId: `consulting-${slugify(item.tag?.name || item.label || String(index))}`,
      })) || []
    );
  }, [node]);

  const allMappedPages = useMemo(() => {
    const pages = [];

    node.categories.forEach((category, categoryIndex) => {
      category.pages.forEach((page, pageIndex) => {
        if (!page.externalUrl && !page.page?.id) {
          return;
        }

        pages.push({
          id: `${categoryIndex}-${pageIndex}-${page.title}`,
          url: mapPageUrl(page),
          title: page.title,
          description: page.description,
          logo: page.logo,
          popular: page.popular,
          tags: page.tags?.length
            ? [allServices, ...page.tags.map((t) => t.tag?.name)]
            : [allServices, otherServices],
          tinaPage: node.categories[categoryIndex].pages[pageIndex],
        });
      });
    });

    // Dedup on (url, title), not url alone: two categories can legitimately
    // point different, differently-titled cards (e.g. "Azure AI" and
    // "Microsoft Azure") at the same destination page, and keying on url
    // alone silently drops whichever one isn't first. Keying on the pair
    // still catches an actual copy-paste duplicate — same title, same
    // destination, entered twice by content mistake.
    const unique = new Map();
    pages.forEach((page) => {
      const key = `${page.url}|${page.title}`;
      if (!unique.has(key)) {
        unique.set(key, page);
      }
    });
    return Array.from(unique.values());
  }, [node]);

  const sections = useMemo(() => {
    return tags.map((tag) => {
      const pages = allMappedPages.filter((page) =>
        page.tags.includes(tag.name)
      );
      return {
        ...tag,
        pages,
      };
    });
  }, [allMappedPages, tags]);

  const contentSections = useMemo(
    () => sections.filter((section) => section.name !== allServices),
    [sections]
  );

  // For the "All SSW Services" view only: a page tagged under several
  // sections (e.g. "Microsoft Azure" is both Cloud and Infrastructure and
  // Platform Development) should still appear once per section when that
  // section is filtered to directly, but shouldn't repeat when everything is
  // shown at once. Claim each shared page into its smallest matching
  // section, not sidebar order — every Content Management Systems page is
  // also tagged Website Development, so claiming in sidebar order (Website
  // Development comes first) hands all 8 of them to the broader bucket and
  // CMS's heading vanishes entirely. Smallest-first means the more specific
  // category keeps its cards and the broader one only loses the overlap.
  const allViewSections = useMemo(() => {
    const bySize = [...contentSections].sort(
      (a, b) => a.pages.length - b.pages.length
    );
    const claimedBy = new Map();
    bySize.forEach((section) => {
      section.pages.forEach((page) => {
        const key = `${page.url}|${page.title}`;
        if (!claimedBy.has(key)) claimedBy.set(key, section.name);
      });
    });
    return contentSections
      .map((section) => ({
        ...section,
        pages: section.pages.filter(
          (page) => claimedBy.get(`${page.url}|${page.title}`) === section.name
        ),
      }))
      .filter((section) => section.pages.length > 0);
  }, [contentSections]);

  // A specific tag filters the grid down to that one section (every matching
  // page, tags intact); "All SSW Services" shows every section with each
  // page deduped to its first category.
  const visibleSections = useMemo(
    () =>
      selectedTag === allServices
        ? allViewSections
        : contentSections.filter((section) => section.name === selectedTag),
    [contentSections, allViewSections, selectedTag]
  );

  // Deep links (e.g. the mega menu's #consulting-platform-development) select
  // that filter on load, rather than scrolling to it among everything else.
  useEffect(() => {
    if (!contentSections.length) return;

    const hash = window.location.hash.replace("#", "");
    const fromHash = contentSections.find(
      (section) => section.sectionId === hash
    );
    if (fromHash) {
      setSelectedTag(fromHash.name);
    }
  }, [contentSections]);

  const onNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    tag: { name: string; sectionId: string }
  ) => {
    event.preventDefault();
    setSelectedTag(tag.name);
    window.history.replaceState(
      null,
      "",
      tag.name === allServices ? window.location.pathname : `#${tag.sectionId}`
    );
    // On mobile the sidebar collapses into a sticky chip row above the grid;
    // if the page was scrolled past it, bring the (now-filtered) grid back
    // into view instead of leaving the user looking at whatever used to be
    // at their old scroll position.
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    // PageLayout (app/components/page-layout.tsx) already wraps every route's
    // children in a <main> — this is a div, not a nested <main>.
    //
    // min-h-screen, not min-h-full: PageLayout's <main> is grow inside a flex
    // column, so its height is only "definite" (for our min-h-full% to
    // resolve against) via the flexbox used-main-size rule — real, but easy
    // to break in a future PageLayout refactor with no visible error, just a
    // silent gap. <main>'s bg-white is unconditional, so any such gap (or a
    // short filtered view — e.g. the Video category has 2 cards) would show
    // as a white band beneath the themed content, jarring in dark mode.
    // min-h-screen sidesteps that entirely: 100vh needs no ancestor
    // cooperation, and it's always >= <main>'s own grown height (<=100vh,
    // since <main> only fills the space the header and footer leave inside
    // the outer min-h-screen column) — the tradeoff is a few extra px of
    // scroll past a very short page, never a gap.
    <HomeThemeShell className="min-h-screen bg-sunken-glow">
      {/* No min-height here: full-height background coverage is the outer
          HomeThemeShell wrapper's job (min-h-screen, above) — this div only
          centers and width-constrains the content, and its parent has no
          definite `height` for a min-h-full% to resolve against anyway. */}
      <div className="mx-auto max-w-8xl px-6 pb-16 pt-4 max-md:px-3 max-md:pb-12 max-md:pt-3">
        <div className="min-h-12">
          <Breadcrumbs path={"/consulting"} title={"Services"} />
        </div>

        <div className="grid grid-cols-sidebar items-start gap-8 max-xl:grid-cols-sidebar-narrow max-md:grid-cols-1 max-md:gap-4">
          {/* A plain div, not <aside>: the only other child is <nav
              aria-label="Consulting categories">, which is already its own
              landmark — wrapping it in a complementary region added nothing
              but filed the page's <h1> under "complementary" instead of
              "main" for landmark navigation. */}
          <div
            className={cn(
              "sticky top-headerOffset self-start",
              "max-md:top-headerOffsetMobile max-md:z-15 max-md:-mx-3 max-md:border-b-0.75 max-md:border-hairline max-md:bg-sunken-scrim max-md:px-3 max-md:pb-2.5 max-md:pt-2 max-md:backdrop-blur"
            )}
          >
            <h1
              className={cn(
                headingType,
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
                          section.name === allServices
                            ? "/consulting"
                            : `#${section.sectionId}`
                        }
                        onClick={(event) => onNavClick(event, section)}
                        // "location", not "true": this expresses which
                        // section is the current position in an in-page flow,
                        // which is the exact case ARIA defines the value for.
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "unstyled block min-h-11 rounded-lg px-2.5 py-2 text-base leading-tight no-underline transition-colors duration-150 motion-reduce:transition-none",
                          // Hover changes the label colour only — no background.
                          "text-ssw-gray-light hover:text-foreground",
                          // A ring rather than an outline: tailwind-merge folds
                          // bare `outline` into the outline-width group and drops
                          // it, which would leave outline-style: none.
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
                    headingType,
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
