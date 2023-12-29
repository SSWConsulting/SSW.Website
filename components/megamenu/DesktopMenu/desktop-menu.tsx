import { Popover } from "@headlessui/react";
import React, { createContext } from "react";
import { NavMenuGroup } from "../../../types/megamenu";
import { SocialIcons, SocialTypes, socialStyles } from "../../util/socialIcons";
import { CountryDropdown } from "../CountryDropdown";
import Divider from "../divider";
import Search from "../search";
import { MenuItemLink } from "./menu-item-link";
import { MenuItemWithSubmenu } from "./menu-item-with-submenu";

export interface DesktopMenuProps {
  menuGroups: NavMenuGroup[];
}

export const ClosePopoverContext = createContext<((...args) => void) | null>(
  null
);

const DesktopMenu: React.FC<DesktopMenuProps> = ({ menuGroups }) => {
  return (
    <>
      <div className="hidden flex-1 xl:block">
        <Popover.Group className="flex items-center justify-center text-sm font-semibold text-ssw-black outline-none">
          {menuGroups.map((group) => {
            if (group.menuColumns && group.menuColumns.length > 0) {
              return (
                <Popover key={group.name}>
                  {({ open, close }) => {
                    return (
                      <ClosePopoverContext.Provider value={close}>
                        <MenuItemWithSubmenu
                          name={group.name}
                          menuColumns={group.menuColumns}
                          sidebarItems={group.sidebarItems}
                          isOpened={open}
                          viewAll={group.viewAll}
                        />
                      </ClosePopoverContext.Provider>
                    );
                  }}
                </Popover>
              );
            } else if (group.url) {
              return (
                <MenuItemLink
                  name={group.name}
                  href={group.url}
                  key={group.name}
                />
              );
            } else {
              return <></>;
            }
          })}
        </Popover.Group>
      </div>

      <div className="hidden shrink items-center justify-end xl:flex">
        <SocialIcons
          excludeDesktop={(Object.keys(socialStyles) as SocialTypes[]).filter(
            (icon) => icon !== "phone"
          )}
          excludeMobile={Object.keys(socialStyles) as SocialTypes[]}
        />
        <Search />
        <Divider />
        <CountryDropdown />
      </div>
    </>
  );
};

export default DesktopMenu;
