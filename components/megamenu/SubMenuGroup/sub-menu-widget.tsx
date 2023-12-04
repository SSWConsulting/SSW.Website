"use client";
import Link from "next/link";
import React from "react";
import { AvailableIcons, SidebarItem } from "../../../types/megamenu";
import { MegaIcon } from "../MegaIcon";
import FeaturedCard from "./featured-card";

interface SubMenuWidgetProps {
  item: SidebarItem;
}

const SubMenuWidget: React.FC<SubMenuWidgetProps> = ({ item }) => {
  switch (item.widgetType) {
    case "featured": {
      return (
        <Link className="unstyled" href={item.url}>
          <FeaturedCard
            title={<span> {item.name}</span>}
            icon={item.icon as AvailableIcons}
          >
            {item.description}
          </FeaturedCard>
        </Link>
      );
    }
    case "bookNow": {
      return (
        <Link
          className="unstyled relative flex w-full cursor-pointer items-center justify-center rounded-md bg-ssw-red font-semibold text-white hover:bg-ssw-red-light"
          href={item.url}
        >
          <MegaIcon icon="phone" className="h-6" />
          <span className="ml-2 py-4">{item.name}</span>
        </Link>
      );
    }
    case "classicMenu":
    default: {
      return (
        <Link className="unstyled block" href={item.url}>
          {item.name && item.description ? (
            <>
              <span className="font-bold">{item.name}</span>
              <p className="mt-2 text-sm">{item.description}</p>
            </>
          ) : (
            <span className="pl-4 text-sm font-normal text-ssw-black">
              {item.name}
            </span>
          )}
        </Link>
      );
    }
  }
};

export default SubMenuWidget;
