import { Dialog } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react";
import { NavMenuGroup } from "../../../types/megamenu";
import { CustomLink } from "../../customLink";
import { MegaIcon } from "../MegaIcon";
import SubMenuGroup from "../SubMenuGroup/sub-menu-group";

export interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  menuBarItems: NavMenuGroup[];
  closeMobileMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMobileMenuOpen,
  menuBarItems,
  closeMobileMenu,
}) => {
  const [selectedMenuItem, setSelectedMenuItem] =
    React.useState<NavMenuGroup | null>(null);

  const onCloseMobileMenu = () => {
    setSelectedMenuItem(null);
    closeMobileMenu();
  };

  return (
    <Dialog
      as="div"
      open={isMobileMenuOpen}
      onClose={() => onCloseMobileMenu()}
    >
      <div className="fixed inset-0 z-10" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-ssw-black/10">
        <div className="flex h-16 flex-row-reverse">
          <button
            type="button"
            className="p-4 text-gray-700"
            onClick={() => onCloseMobileMenu()}
          >
            <span className="sr-only">Close menu</span>
            <MegaIcon icon="xMark" className="h-6 w-6" />
          </button>
          {selectedMenuItem && (
            <div className="my-auto flex grow items-center pl-2">
              <button
                className="text-sm font-semibold leading-4 text-ssw-black"
                onClick={() => setSelectedMenuItem(null)}
              >
                <MegaIcon className="mb-1 inline h-5 w-5" icon="chevronLeft" />
                <span className="ml-2">{selectedMenuItem.name}</span>
              </button>
            </div>
          )}
        </div>
        <div className="flow-root">
          {selectedMenuItem &&
          selectedMenuItem.menuColumns &&
          selectedMenuItem.sidebarItems ? (
            <SubMenuGroup
              menuColumns={selectedMenuItem.menuColumns}
              sidebarItems={selectedMenuItem.sidebarItems}
            />
          ) : (
            <MenuBarItems
              menuBarItems={menuBarItems}
              setSelectedMenuItem={setSelectedMenuItem}
            />
          )}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

const MenuBarItems: React.FC<{
  menuBarItems: NavMenuGroup[];
  setSelectedMenuItem: (item: NavMenuGroup) => void;
}> = ({ menuBarItems, setSelectedMenuItem }) => {
  return (
    <div className="-my-6 divide-y divide-gray-500/10 pl-6">
      <div className="space-y-2">
        {menuBarItems.map((item) => {
          return item.url ? (
            <CustomLink
              key={item.name}
              href={item.url}
              className="unstyled -mx-3 flex w-full items-center px-3 py-2 text-left text-lg leading-7 text-ssw-black hover:bg-gray-50"
            >
              {item.name}
            </CustomLink>
          ) : (
            <button
              key={item.name}
              className="-mx-3 flex w-full items-center px-3 py-2 text-left text-lg leading-7 text-ssw-black hover:bg-gray-50"
              onClick={() => setSelectedMenuItem(item)}
            >
              {item.name}
              <ChevronRightIcon
                className="ml-2 inline h-4 w-4 text-ssw-black"
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenu;
