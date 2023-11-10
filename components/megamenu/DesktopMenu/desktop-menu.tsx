import { Popover } from "@headlessui/react";
import React from "react";
import { NavMenuItem } from "../../../models/megamanu/menuItem.model";
import { SocialIcons, SocialTypes } from "../../util/socialIcons";
import { CountryDropdown } from "../CountryDropdown";
import Divider from "../divider";
import Search from "../search";
import { MenuItemLink } from "./menu-item-link";
import { MenuItemWithSubmenu } from "./menu-item-with-submenu";

export interface DesktopMenuProps {
  tagline?: string;
  menuBarItems: NavMenuItem[];
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ menuBarItems }) => {
  return (
    <>
      <div className="hidden flex-1 lg:block">
        <Popover.Group className="flex items-center justify-center text-sm font-semibold text-ssw-black outline-none">
          {menuBarItems.map((item) => {
            const submenu = item.menuGroup;
            if (submenu) {
              return (
                <Popover key={item.name}>
                  {({ open, close }) => {
                    open;
                    console.log(
                      "🚀 ~ file: desktop-menu.tsx:29 ~ menuBarItems.map ~ open:",
                      open
                    );
                    return (
                      <MenuItemWithSubmenu
                        name={item.name}
                        menu={submenu}
                        isOpened={open}
                        close={close}
                      />
                    );
                  }}
                </Popover>
              );
            } else {
              return <MenuItemLink item={item} key={item.name} />;
            }
          })}
        </Popover.Group>
      </div>

      <div className="hidden shrink items-center justify-end lg:flex">
        <SocialIcons
          excludeDesktop={Object.values(SocialTypes).filter(
            (social) => social !== SocialTypes.phone
          )}
          excludeMobile={Object.values(SocialTypes)}
        />
        <Search />
        <Divider />
        <CountryDropdown />
      </div>
    </>
  );
};

export default DesktopMenu;
