import { Popover } from "@headlessui/react";
import React, { createContext } from "react";
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

export const ClosePopoverContext = createContext(null);

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
                    return (
                      <ClosePopoverContext.Provider value={close}>
                        <MenuItemWithSubmenu
                          name={item.name}
                          menu={submenu}
                          isOpened={open}
                        />
                      </ClosePopoverContext.Provider>
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
