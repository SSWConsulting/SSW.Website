import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import { NavMenuItem } from "../../../models/megamanu/menuItem.model";
import { SocialIcons, SocialTypes } from "../../util/socialIcons";
import DesktopMenu from "../DesktopMenu/desktop-menu";
import Logo from "../Logo/logo";
import MobileMenu from "../MobileMenu/mobile-menu";
import Search from "../search";

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
    <>
      {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
      <div className="relative z-10 flex h-16 w-full items-center justify-center lg:h-[120px]">
        <nav
          className="flex h-full w-full items-center justify-between gap-x-4 overflow-hidden px-0"
          aria-label="Global"
        >
          <div className="flex items-center">
            <Link
              href="/"
              passHref
              className="unstyled flex items-center gap-1 whitespace-nowrap"
            >
              <div className="flex items-center justify-center min-w-[4rem] max-w-[14rem]">
                <Logo />
                <div className="w-fit whitespace-break-spaces text-sm font-semibold uppercase leading-4 text-gray-700">
                  <span className="hidden xl:block ml-4">{tagline}</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center lg:hidden">
            <SocialIcons
              className="max-sm:hidden"
              excludeMobile={Object.values(SocialTypes).filter(
                (social) => social !== SocialTypes.phone
              )}
              excludeDesktop={Object.values(SocialTypes).filter(
                (social) => social !== SocialTypes.phone
              )}
            />
            <Search />
            <Divider />
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md pl-6 pr-2 text-gray-700"
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

      <SocialIcons
        className="pb-4 sm:hidden"
        excludeMobile={Object.values(SocialTypes).filter(
          (social) => social !== SocialTypes.phone
        )}
        excludeDesktop={Object.values(SocialTypes).filter(
          (social) => social !== SocialTypes.phone
        )}
      />
    </>
  );
};

const Divider: React.FC = () => {
  return <div className="h-4 w-px bg-gray-700/30 sm:block"></div>;
};

export default MegaMenuLayout;
