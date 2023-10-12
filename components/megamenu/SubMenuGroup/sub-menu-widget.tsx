"use client";
import React from "react";
import {
  AvailableIcons,
  AvailableWidget,
} from "../../../models/megamanu/config.consts.ts";
import { SideMenuItem } from "../../../models/megamanu/menuItem.model";
import { MegaIcon } from "../MegaIcon/index.ts";
import FeaturedCard from "./featured-card";

interface Props {
  item: SideMenuItem;
}

const SubMenuWidget: React.FC<Props> = ({ item }) => {
  switch (item.category) {
    case AvailableWidget.featured: {
      return (
        <a href={item.href}>
          <FeaturedCard title={<span>{item.name}</span>}>
            {item.description}
          </FeaturedCard>
        </a>
      );
    }
    case AvailableWidget.bookNow: {
      return (
        <a
          className="relative flex w-full cursor-pointer items-center justify-center rounded-md bg-ssw-red font-semibold text-white hover:bg-ssw-red-light"
          href={item.href}
        >
          <MegaIcon icon={AvailableIcons.phone} className="h-6" />
          <span className="ml-2 py-4">{item.name}</span>
        </a>
      );
    }
    case AvailableWidget.classicMenu:
    default: {
      return (
        <a className="block" href={item.href}>
          {item.name && item.description ? (
            <>
              <span className="font-bold">{item.name}</span>
              <p className="mt-2 text-sm">{item.description}</p>
            </>
          ) : (
            <span className="text-sm font-normal text-ssw-black">
              {item.name}
            </span>
          )}
        </a>
      );
    }
  }
};

export default SubMenuWidget;
