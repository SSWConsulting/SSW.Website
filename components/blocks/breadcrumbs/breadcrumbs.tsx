"use client";

import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Container } from "@/components/util/container";
import global from "@/content/global/index.json";
import { renderBreadcrumbItem } from "@/helpers/breadcrumbs";
import { cn } from "@/lib/utils";
import { Consultingv2BlocksBreadcrumbs } from "@/tina/types";
import { usePathname } from "next/navigation";
import React from "react";
import { tinaField } from "tinacms/dist/react";

function getLinks(
  paths: string[],
  data: Consultingv2BlocksBreadcrumbs,
  finalNode?: string
): React.ReactNode[] {
  const placeholder = "Lorem Ipsum";
  const initialTitle = global.breadcrumbHomeRoute;

  // Replace paths with character replacements
  const displayNames = paths.map(
    (path) =>
      global.breadcrumbReplacements.find((value) => value.from === path)?.to ||
      path
  );
  switch (paths.length) {
    case 0:
      return [];
    case 1:
      return [
        renderBreadcrumbItem(
          true,
          finalNode || initialTitle || placeholder,
          "/",
          undefined,
          { "data-tina-field": tinaField(data, "finalBreadcrumb") },
          "breadcrumb-item-1"
        ),
      ];
    //may need to seperate out case 2 later
    case 2:
    case 3:
    case 4:
      return [
        renderBreadcrumbItem(false, initialTitle, "/", undefined, undefined, "breadcrumb-item-1"),
        ...paths.slice(1, -1).map((path, index) =>
          renderBreadcrumbItem(
            false,
            displayNames[index + 1],
            `/${path}`,
            undefined,
            undefined,
            `breadcrumb-item-${index + 1}`
          )
        ),
        renderBreadcrumbItem(
          true,
          finalNode || placeholder,
          "/",
          undefined,
          { "data-tina-field": tinaField(data, "finalBreadcrumb") },
          "breadcrumb-last-item"
        ),
      ];
    default:
      return [
        renderBreadcrumbItem(false, initialTitle, "/", undefined, undefined, "breadcrumb-item-1"),
        <DropdownMenu key={"breadcrumb-dropdown"}>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <BreadcrumbEllipsis className="size-4" />
            <span className="sr-only">Toggle menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {paths.slice(1, -1).map((path, index) => (
              <DropdownMenuItem key={`breadcrumb-dropdown-${index}`}>
                {displayNames[index + 1]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>,
        renderBreadcrumbItem(
          true,
          finalNode || placeholder,
          "/",
          undefined,
          undefined,
          "breadcrumb-last-item"
        ),
      ];
  }
}

export function Breadcrumbs({ data }: { data: Consultingv2BlocksBreadcrumbs }) {
  const paths = usePathname().split("/");
  // Index 0 is an empty string if the path starts with a slash
  const links = getLinks(paths, data, data.finalBreadcrumb);

  return (
    <V2ComponentWrapper data={data}>
      <Container size="custom" padding="px-4 sm:px-8" className="pt-8 sm:pt-12">
        <Breadcrumb className="text-gray-300">
          <BreadcrumbList>
            {links.map((link, index) => (
              // react fragments don't appear in the dom
              <React.Fragment key={`breadcrumb-${index}`}>
                {index !== 0 ? (
                  <BreadcrumbSeparator>
                    <Separator />
                  </BreadcrumbSeparator>
                ) : null}
                <BreadcrumbItem>{link}</BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </Container>
    </V2ComponentWrapper>
  );
}

const Separator = () => {
  return (
    <svg
      className={cn("h-4 w-4", "dark:stroke-gray-300")}
      strokeWidth={1}
      width="10"
      height="10"
      viewBox="0 0 20 20"
      sharp-rendering="auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 2L6.2384 18.5754" strokeLinecap="round" />
    </svg>
  );
};
