"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
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
  const french = false;

  const placeholder = french ? "{{ TITRE DE LA PAGE }}" : "{{ PAGE TITLE }}";
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
        <BreadcrumbPage
          key={"breadcrumb-item-1"}
          data-tina-field={tinaField(data, "finalBreadcrumb")}
        >
          {finalNode || initialTitle || placeholder}
        </BreadcrumbPage>,
      ];
    //may need to seperate out case 2 later
    case 2:
    case 3:
    case 4:
      return [
        <BreadcrumbLink key={"breadcrumb-item-1"} href={"/"}>
          {initialTitle}
        </BreadcrumbLink>,
        ...paths.slice(1, -1).map((path, index) => (
          <BreadcrumbLink
            key={`breadcrumb-item-${index + 1}`}
            href={`/${path}`}
          >
            {displayNames[index + 1]}
          </BreadcrumbLink>
        )),
        <BreadcrumbPage
          key={"breadcrumb-last-item"}
          data-tina-field={tinaField(data, "finalBreadcrumb")}
        >
          {finalNode || placeholder}
        </BreadcrumbPage>,
      ];
    default:
      return [
        <BreadcrumbLink key={"breadcrumb-item-1"} href={"/"}>
          {initialTitle}
        </BreadcrumbLink>,
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
        <BreadcrumbPage key={"breadcrumb-last-item"}>
          {finalNode || placeholder}
        </BreadcrumbPage>,
      ];
  }
}

export function Breadcrumbs({ data }: { data: Consultingv2BlocksBreadcrumbs }) {
  const paths = usePathname().split("/");
  // Index 0 is an empty string if the path starts with a slash
  const links = getLinks(paths, data, data.finalBreadcrumb);

  return (
    <Container size="custom">
      <Breadcrumb>
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
