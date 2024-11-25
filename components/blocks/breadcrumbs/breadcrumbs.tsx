"use client";

import { usePathname } from "next/navigation";
import React from "react";
import characterReplacements from "./characterReplacements.json";

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

function getLinks(paths: string[], finalNode?: string): React.ReactNode[] {
  const initialTitle = "Home";
  // Replace paths with character replacements
  const displayNames = paths.map(
    (path) =>
      characterReplacements.find((value) => value.from === path)?.to || path
  );
  switch (paths.length) {
    case 0:
      return [];
    case 1:
      return [
        <BreadcrumbPage key={"breadcrumb-item-1"}>
          {finalNode || "Home"}
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
        <BreadcrumbPage key={"breadcrumb-last-item"}>
          {finalNode || displayNames.at(-1)}
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
          {finalNode || displayNames.at(-1)}
        </BreadcrumbPage>,
      ];
  }
}

type BreadcrumbsProps = {
  data: {
    finalBreadcrumb: string;
  };
};

export function Breadcrumbs({ data }: BreadcrumbsProps) {
  const paths = usePathname().split("/");
  // Index 0 is an empty string if the path starts with a slash
  const links = getLinks(paths, data.finalBreadcrumb);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, index) => (
          // react fragments don't appear in the dom
          <React.Fragment key={`breadcrumb-${index}`}>
            {index !== 0 ? <BreadcrumbSeparator /> : null}
            <BreadcrumbItem>{link}</BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
