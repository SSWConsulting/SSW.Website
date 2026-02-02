"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { renderBreadcrumbItem, renderBreadcrumbItems } from "@/helpers/breadcrumbs";
import { usePathname } from "next/navigation";
import React, { FC, useMemo } from "react";
import { tinaField } from "tinacms/dist/react";

interface BreadcrumbsProps {
  additionalReplacements?: { from: string; to: string }[];
  path: string;
  title: string;
  seoSchema?: {
    title?: string;
  };
  /** Custom className for breadcrumb links (for hover effects, etc.) */
  linkClassName?: string;
}

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
  path,
  title,
  seoSchema,
  linkClassName,
}) => {
  const pathname = usePathname();

  const breadcrumbItems = useMemo(() => {
    const pathSegments = pathname
      .split("/")
      .filter((segment) => segment !== "");

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

    // Add Home link
    items.push(
      <BreadcrumbItem key="home">
        {renderBreadcrumbItem({
          isLast: false,
          displayName: "Home",
          href: "/",
          className: linkClassName || "text-xs text-gray-700 no-underline",
        })}
      </BreadcrumbItem>
    );

    // Add intermediate segments as links
    pathSegments.forEach((segment, index) => {
      const isLast = index === pathSegments.length - 1;
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const displayName = getDisplayName(segment);

      items.push(
        <BreadcrumbSeparator key={`separator-${index}`} className="px-2">
          {">"}
        </BreadcrumbSeparator>
      );

      items.push(
        <BreadcrumbItem key={`item-${index}`}>
          {renderBreadcrumbItem({
            isLast,
            displayName,
            href,
            className: linkClassName || "text-xs text-gray-700 no-underline",
            ...(seoSchema && isLast
              ? { additionalProps: { "data-tina-field": tinaField(seoSchema, "title") } }
              : {}),
          })}
        </BreadcrumbItem>
      );
    });

    return items;
  }, [pathname, path, title, seoSchema, additionalReplacements, linkClassName]);

  return (
    <Breadcrumb>
      <BreadcrumbList className="pl-0">{breadcrumbItems}</BreadcrumbList>
    </Breadcrumb>
  );
};
