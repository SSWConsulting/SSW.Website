"use client";

import { useHomeTheme } from "@/components/layout/homeTheme";
import { BluredBase64Image } from "@/helpers/images";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "app/components/breadcrumb";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import styles from "./index.module.css";

const allServices = "All SSW Services";

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
    <div
      className={cn(styles.shell, isDark && "dark")}
      data-theme={isDark ? "dark" : "light"}
    >
      <main className={styles.page}>
        <div className={styles.breadcrumbRow}>
          <Breadcrumbs path={"/consulting"} title={"Services"} />
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <h1 className={styles.heading}>Consulting Services</h1>
            <nav aria-label="Consulting categories">
              <ul className={styles.navList}>
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
                        className={`${styles.navLink} unstyled`}
                        data-active={isActive ? "true" : "false"}
                      >
                        {section.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <div className={styles.content}>
            {contentSections.map((section) => (
              <section
                id={section.sectionId}
                key={section.sectionId}
                className={styles.section}
              >
                <h2
                  className={styles.sectionTitle}
                  data-tina-field={tinaField(
                    node.sidebar[section.index],
                    "label"
                  )}
                >
                  {section.label}
                </h2>

                <div className={styles.cardGrid}>
                  {section.pages.map((page) => (
                    <a
                      href={page.url}
                      key={`${section.sectionId}-${page.id}`}
                      className={`${styles.card} unstyled`}
                    >
                      <div className={styles.iconWrap}>
                        {page.logo && (
                          <Image
                            src={page.logo}
                            alt={`${page.title} logo`}
                            width={48}
                            height={48}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={BluredBase64Image}
                            className={styles.logo}
                          />
                        )}
                      </div>

                      <div className={styles.cardBody}>
                        <div className={styles.cardTitleRow}>
                          <h3
                            className={styles.cardTitle}
                            data-tina-field={tinaField(page.tinaPage, "title")}
                          >
                            {page.title}
                          </h3>
                          {page.popular && (
                            <span className={styles.popularTag}>Popular</span>
                          )}
                        </div>
                        <p
                          className={styles.cardSubtitle}
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
                        className={styles.chevron}
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
