import { Popover } from "@headlessui/react";
import React from "react";
import { NavMenuItem } from "../../../models/megamanu/menuItem.model";
import { CountryDropdown } from "../CountryDropdown";
import Divider from "./divider";
import { MenuItemLink } from "./menu-item-link";
import { MenuItemWithSubmenu } from "./menu-item-with-submenu";
import Search from "./search";

export interface DesktopMenuProps {
  tagline?: string;
  menuBarItems: NavMenuItem[];
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ menuBarItems }) => {
  return (
    <>
      <div className="hidden flex-1 lg:block">
        <Popover.Group className="flex items-center justify-center gap-2">
          {menuBarItems.map((item) => {
            const submenu = item.menuGroup;
            if (submenu) {
              return (
                <Popover key={item.name}>
                  {({ open }) => (
                    <MenuItemWithSubmenu
                      name={item.name}
                      menu={submenu}
                      isOpened={open}
                    />
                  )}
                </Popover>
              );
            } else {
              return <MenuItemLink item={item} key={item.name} />;
            }
          })}
        </Popover.Group>
      </div>

      <div className="hidden shrink items-center justify-end lg:flex">
        <Search />
        <Divider />
        <CountryDropdown />
      </div>
    </>
  );
};

export default DesktopMenu;
