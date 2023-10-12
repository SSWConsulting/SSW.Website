"use client";
import Link from "next/link";
import React from "react";
import { AvailableWidget } from "../../../models/megamanu/config.consts";
import { SideMenuItem } from "../../../models/megamanu/menuItem.model";
import { BookingButton } from "../../blocks";
import FeaturedCard from "./featured-card";

interface Props {
  item: SideMenuItem;
}

const SubMenuWidget: React.FC<Props> = ({ item }) => {
  switch (item.category) {
    case AvailableWidget.featured: {
      return (
        <Link className="unstyled" href={item.href}>
          <FeaturedCard title={<span>{item.name}</span>}>
            {item.description}
          </FeaturedCard>
        </Link>
      );
    }
    case AvailableWidget.bookNow: {
      return (
        // <Link
        //   className="unstyled relative flex w-full cursor-pointer items-center justify-center rounded-md bg-ssw-red font-semibold text-white hover:bg-ssw-red-light"
        //   href={item.href}
        // >
        //   <MegaIcon icon={AvailableIcons.phone} className="h-6" />
        //   <span className="ml-2 py-4">{item.name}</span>
        // </Link>
        <BookingButton
          data={{
            buttonText: item.name,
            buttonClass: "w-full",
            hideCallUs: true,
          }}
        />
      );
    }
    case AvailableWidget.classicMenu:
    default: {
      return (
        <Link className="unstyled block" href={item.href}>
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
