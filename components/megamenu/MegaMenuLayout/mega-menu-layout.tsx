import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import { NavMenuItem } from "../../../models/megamanu/menuItem.model";
import DesktopMenu from "../DesktopMenu/desktop-menu";
import Logo from "../Logo/logo";
import MobileMenu from "../MobileMenu/mobile-menu";

export interface MegaMenuWrapperProps extends React.PropsWithChildren {
  tagline?: string;
  menuBarItems: NavMenuItem[];
}

const MegaMenuLayout: React.FC<MegaMenuWrapperProps> = ({
  tagline = "Enterprise Software Development",
  menuBarItems,
}) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="relative z-10 flex h-16 w-full items-center justify-center lg:h-[120px]">
      <nav
        className="flex h-full w-full items-center justify-between gap-x-8 overflow-hidden px-0"
        aria-label="Global"
      >
        <div className="flex items-center">
          <Link
            href="/"
            passHref
            className="flex items-center gap-1 whitespace-nowrap unstyled"
          >
            <div className="flex items-center justify-center">
              <Logo className="h-16 min-w-[100px] lg:h-24" />
              <div className="ml-4 hidden w-24 text-sm font-semibold uppercase leading-4 text-gray-700 md:block whitespace-break-spaces">
                {tagline}
              </div>
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <DesktopMenu tagline={tagline} menuBarItems={menuBarItems} />
      </nav>
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        menuBarItems={menuBarItems}
        closeMobileMenu={() => setMobileMenuOpen(false)}
      />
    </div>
  );
};

export default MegaMenuLayout;
