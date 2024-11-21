"use client";

import { usePathname } from "next/navigation";
import React from "react";

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

function getLinks(paths: string[]): React.ReactNode[] {
  switch (paths.length) {
    case 0:
      return [];
    case 1:
      return [
        <BreadcrumbPage key={"breadcrumb-item-1"}>{paths[0]}</BreadcrumbPage>,
      ];
    //may need to seperate out case 2 later
    case 2:
    case 3:
    case 4:
      return [
        <BreadcrumbLink key={"breadcrumb-item-1"} href={"/"}>
          {paths[0]}
        </BreadcrumbLink>,
        ...paths.slice(1, -1).map((path, index) => (
          <BreadcrumbLink
            key={`breadcrumb-item-${index + 1}`}
            href={`/${path}`}
          >
            {path}
          </BreadcrumbLink>
        )),
        <BreadcrumbPage key={"breadcrumb-last-item"}>
          {paths[-1]}
        </BreadcrumbPage>,
      ];
    default:
      return [
        <BreadcrumbLink key={"breadcrumb-item-1"} href={"/"}>
          {paths[0]}
        </BreadcrumbLink>,
        <DropdownMenu key={"breadcrumb-dropdown"}>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <BreadcrumbEllipsis className="size-4" />
            <span className="sr-only">Toggle menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {paths.slice(1, -1).map((path, index) => (
              <DropdownMenuItem key={`breadcrumb-dropdown-${index}`}>
                {path}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>,
        <BreadcrumbPage key={"breadcrumb-last-item"}>
          {paths[-1]}
        </BreadcrumbPage>,
      ];
  }
}

export function Breadcrumbs() {
  const paths = usePathname().split("/");
  // Index 0 is an empty string if the path starts with a slash
  const links = getLinks(paths.slice(1));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, index) => (
          // react fragments don't appear in the dom
          <React.Fragment key={`breadcrumb-${index}`}>
            {index && <BreadcrumbSeparator />}
            <BreadcrumbItem>{link}</BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
