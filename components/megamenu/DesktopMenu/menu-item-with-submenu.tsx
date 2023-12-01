"use client";
import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { NavMenuColumn, Sidebar, ViewAll } from "../../../types/megamenu";
import { MegaIcon } from "../MegaIcon";
import SubMenuGroup from "../SubMenuGroup/sub-menu-group";

interface MenuItemWithSubmenuProps {
  name: string;
  menuColumns: NavMenuColumn[];
  sidebarItems: Sidebar[];
  viewAll?: ViewAll;
  isOpened: boolean;
}

export const MenuItemWithSubmenu: React.FC<MenuItemWithSubmenuProps> = ({
  name,
  menuColumns,
  sidebarItems,
  isOpened,
  viewAll,
}) => {
  return (
    <>
      <Popover.Button
        className={twMerge(
          "flex items-center justify-center gap-x-1 whitespace-nowrap rounded-md px-3 py-1 cursor-pointer focus:outline-none focus-visible:ring-opacity-0",
          isOpened ? "bg-gray-100" : "hover:bg-gray-100"
        )}
      >
        {name}
        <MegaIcon
          icon="chevronDown"
          className="h-5 w-5 flex-none text-ssw-black"
        />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
        <Popover.Panel className="absolute inset-x-0 top-[120px] -z-10 bg-white shadow-md shadow-gray-400">
          <SubMenuGroup
            menuColumns={menuColumns}
            sidebarItems={sidebarItems}
            viewAll={viewAll}
          />
        </Popover.Panel>
      </Transition>
    </>
  );
};
