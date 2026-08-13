"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { FC, useMemo } from "react";
import { tinaField } from "tinacms/dist/react";

interface BreadcrumbsProps {
  additionalReplacements?: { from: string; to: string }[];
  /**
   * URL segments to leave out of the trail, for parts of a path that aren't
   * pages in their own right (e.g. the year in /events/2026/my-event). Links
   * for the remaining crumbs still point at the real URL.
   */
  excludeSegments?: string[];
  path: string;
  title: string;
  seoSchema?: {
    title?: string;
  };
}

// Module-level so the default prop keeps a stable identity between renders.
const NO_SEGMENTS: string[] = [];

const defaultReplacements = [
  { from: "consulting", to: "Services" },
  { from: "products", to: "Products" },
  { from: "offices", to: "Offices" },
  { from: "training", to: "Training" },
  { from: "employment", to: "Employment" },
  { from: "video-production", to: "Video Production" },
  { from: "Training-videos", to: "Training Videos" },
  { from: "industry", to: "Industry" },
  { from: "company", to: "Company" },
  { from: "events", to: "Events" },
  { from: "partners", to: "Partners" },
  { from: "netug", to: ".NET User Group" },
  { from: "clients", to: "Clients" },
  { from: "live", to: "Live" },
  { from: "logo", to: "Logo" },
  { from: "articles", to: "Articles" },
];

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  additionalReplacements = [],
  excludeSegments = NO_SEGMENTS,
  path,
  title,
  seoSchema,
}) => {
  const pathname = usePathname();

  const { breadcrumbItems, mobileParent } = useMemo(() => {
    // Resolve each href against the full path first, so hiding a segment
    // doesn't change where the remaining crumbs point.
    const allSegments = pathname.split("/").filter((segment) => segment !== "");
    const pathSegments = allSegments
      .map((segment, index) => ({
        segment,
        href: "/" + allSegments.slice(0, index + 1).join("/"),
      }))
      .filter(({ segment }) => !excludeSegments.includes(segment));

    const allReplacements = [
      ...defaultReplacements,
      ...additionalReplacements,
      ...(path && title ? [{ from: path, to: title }] : []),
    ];

    const getDisplayName = (segment: string): string => {
      const replacement = allReplacements.find((r) => r.from === segment);
      return replacement ? replacement.to : segment;
    };

    const items: React.ReactNode[] = [];

    items.push(
      <BreadcrumbItem key="home">
        <BreadcrumbLink
          href="/"
          className={
            "text-sm text-muted-foreground underline-offset-1 hover:text-sswRed"
          }
        >
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
    );

    // Add intermediate segments as links
    pathSegments.forEach(({ segment, href }, index) => {
      const isLast = index === pathSegments.length - 1;
      const displayName = getDisplayName(segment);

      items.push(
        <BreadcrumbSeparator
          key={`separator-${index}`}
          className="text-sm text-muted-foreground"
        >
          {"/"}
        </BreadcrumbSeparator>
      );

      items.push(
        <BreadcrumbItem key={`item-${index}`}>
          {isLast ? (
            <BreadcrumbPage
              className={"text-sm text-muted-foreground no-underline"}
              {...(seoSchema
                ? { "data-tina-field": tinaField(seoSchema, "title") }
                : {})}
            >
              {displayName}
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              href={href}
              className={
                "text-sm text-muted-foreground underline-offset-1 hover:text-sswRed"
              }
            >
              {displayName}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      );
    });

    let mobileParent: { label: string; href: string };
    if (pathSegments.length >= 2) {
      const parent = pathSegments[pathSegments.length - 2];
      mobileParent = {
        label: getDisplayName(parent.segment),
        href: parent.href,
      };
    } else {
      mobileParent = { label: "Home", href: "/" };
    }

    return { breadcrumbItems: items, mobileParent };
  }, [
    pathname,
    path,
    title,
    seoSchema,
    additionalReplacements,
    excludeSegments,
  ]);

  return (
    <>
      <Breadcrumb className="hidden sm:block">
        <BreadcrumbList className="gap-2 font-normal">
          {breadcrumbItems}
        </BreadcrumbList>
      </Breadcrumb>
      <nav className="sm:hidden" aria-label={`Back to ${mobileParent.label}`}>
        <a
          href={mobileParent.href}
          className="unstyled inline-flex items-center gap-1 text-sm text-muted-foreground no-underline hover:text-sswRed hover:no-underline"
          aria-label={`Back to ${mobileParent.label}`}
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          {mobileParent.label}
        </a>
      </nav>
    </>
  );
};
