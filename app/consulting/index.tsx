"use client";

import { useHomeTheme } from "@/components/layout/homeTheme";
import { BluredBase64Image } from "@/helpers/images";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "app/components/breadcrumb";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { tinaField } from "tinacms/dist/react";

const allServices = "All SSW Services";

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
  const { isDark } = useHomeTheme();
  const node = tinaProps.data.consultingIndex;
  const [activeSectionId, setActiveSectionId] = useState<string>("");

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
          tags: page.tags
            ? [allServices, ...page.tags.map((t) => t.tag?.name)]
            : [allServices],
          tinaPage: node.categories[categoryIndex].pages[pageIndex],
        });
      });
    });

    const unique = new Map();
    pages.forEach((page) => {
      if (!unique.has(page.url)) {
        unique.set(page.url, page);
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

  useEffect(() => {
    if (!contentSections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-24% 0px -60% 0px",
        threshold: [0.2, 0.45, 0.7],
      }
    );

    contentSections.forEach((section) => {
      const element = document.getElementById(section.sectionId);
      if (element) observer.observe(element);
    });

    const hash = window.location.hash.replace("#", "");
    const fromHash = contentSections.find(
      (section) => section.sectionId === hash
    );
    if (fromHash) {
      setActiveSectionId(fromHash.sectionId);
      window.requestAnimationFrame(() => {
        document.getElementById(fromHash.sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } else {
      setActiveSectionId(contentSections[0].sectionId);
    }

    return () => observer.disconnect();
  }, [contentSections]);

  const onNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();
    setActiveSectionId(id);
    window.history.replaceState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={cn("min-h-full bg-sunken-glow", isDark && "dark")}>
      <main className="mx-auto min-h-full max-w-8xl px-6 pb-16 pt-4 max-md:px-3 max-md:pb-12 max-md:pt-3">
        <div className="min-h-12">
          <Breadcrumbs path={"/consulting"} title={"Services"} />
        </div>

        <div className="grid grid-cols-sidebar items-start gap-8 max-xl:grid-cols-sidebar-narrow max-md:grid-cols-1 max-md:gap-4">
          <aside
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
                {contentSections.map((section) => {
                  const isActive = section.sectionId === activeSectionId;

                  return (
                    <li
                      key={section.sectionId}
                      data-tina-field={tinaField(
                        node.sidebar[section.index],
                        "label"
                      )}
                    >
                      <a
                        href={`#${section.sectionId}`}
                        onClick={(event) =>
                          onNavClick(event, section.sectionId)
                        }
                        aria-current={isActive ? "true" : undefined}
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
          </aside>

          <div className="min-w-0">
            {contentSections.map((section) => (
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
                    <a
                      href={page.url}
                      key={`${section.sectionId}-${page.id}`}
                      className={cn(
                        // border-0.75, not `border`: borderWidth.DEFAULT is 3px
                        // in this repo, which is far too heavy for a card hairline.
                        "unstyled group flex min-h-20 items-center gap-3 rounded-xl border-0.75 p-3 text-inherit no-underline transition-colors duration-300 motion-reduce:transition-none",
                        "border-stroke-weak bg-gray-50 hover:bg-white dark:border-hairline dark:bg-card dark:hover:bg-card-hover",
                        "max-md:min-h-16 max-md:p-2.5"
                      )}
                    >
                      <div className="flex size-12 flex-none items-center justify-center rounded-lg bg-white max-md:size-10">
                        {page.logo && (
                          <Image
                            src={page.logo}
                            alt={`${page.title} logo`}
                            width={48}
                            height={48}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={BluredBase64Image}
                            className="size-8 object-contain max-md:size-6"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3
                            className="m-0 p-0 text-base font-medium leading-tight text-foreground"
                            data-tina-field={tinaField(page.tinaPage, "title")}
                          >
                            {page.title}
                          </h3>
                          {page.popular && (
                            // Plain string, not cn(): tailwind-merge doesn't know
                            // `xxs` is a custom font size and would drop it as a
                            // text-colour conflict with `text-brand`.
                            <span className="flex-none self-center rounded-full bg-brand-subtle px-1.5 py-0.5 text-xxs font-bold uppercase leading-tight tracking-wider text-brand">
                              Popular
                            </span>
                          )}
                        </div>
                        <p
                          className="mt-1 line-clamp-2 text-xs leading-tight text-muted-foreground"
                          title={page.description}
                          data-tina-field={tinaField(
                            page.tinaPage,
                            "description"
                          )}
                        >
                          {page.description}
                        </p>
                      </div>

                      <ChevronRight
                        className="size-4 flex-none text-stroke-strong transition duration-150 group-hover:translate-x-0.5 group-hover:text-brand motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
