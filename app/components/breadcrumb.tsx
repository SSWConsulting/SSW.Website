"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { tinaField } from "tinacms/dist/react";

interface BreadcrumbsProps {
  additionalReplacements?: { from: string; to: string }[];
  path: string;
  title: string;
  seoSchema?: {
    title?: string;
  };
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
}) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  const allReplacements = [
    ...defaultReplacements,
    ...additionalReplacements,
    { from: path, to: title },
  ];

  const getDisplayName = (segment: string): string => {
    const replacement = allReplacements.find((r) => r.from === segment);
    return replacement ? replacement.to : segment;
  };

  const getBreadcrumbItems = () => {
    const items: React.ReactNode[] = [];

    // Add Home link
    items.push(
      <BreadcrumbItem key="home">
        <BreadcrumbLink href="/" className="text-xs text-gray-700 no-underline">
          Home
        </BreadcrumbLink>
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

      if (isLast) {
        // Last item - not clickable
        items.push(
          <BreadcrumbItem key={segment}>
            <BreadcrumbPage
              className="text-xs text-gray-700"
              {...(seoSchema
                ? { "data-tina-field": tinaField(seoSchema, "title") }
                : {})}
            >
              {displayName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        );
      } else {
        // Intermediate items - clickable
        items.push(
          <BreadcrumbItem key={segment}>
            <BreadcrumbLink
              href={href}
              className="text-xs text-gray-700 no-underline"
            >
              {displayName}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      }
    });

    return items;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList className="pl-0">{getBreadcrumbItems()}</BreadcrumbList>
    </Breadcrumb>
  );
};
