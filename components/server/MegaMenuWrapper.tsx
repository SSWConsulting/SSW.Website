"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import { MegaMenuLayout } from "ssw.megamenu";
import { CustomLink } from "../customLink";
import { HomeNavActions } from "../layout/homeNavActions";
import { useHomeTheme } from "../layout/homeTheme";

export function MegaMenuWrapper(props) {
  const pathName = usePathname();
  const { isDark } = useHomeTheme();

  // Only the homepage opts into theming; other routes keep the default menu.
  // The token utilities (bg-background/text-foreground/border-hairline) flip via
  // the CSS variables under the `dark` class on this element.
  const isHome = pathName === "/";

  return (
    <div
      className={classNames(
        isHome &&
          "ssw-home-nav relative isolate text-foreground before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:border-b before:content-['']",
        isHome && !isDark && "before:border-[#f2f2f2] before:bg-white",
        isHome && isDark && "dark before:border-white/30 before:bg-[#090909]"
      )}
    >
      <MegaMenuLayout
        hidePhone={pathName === "/company/contact-us"}
        menuBarItems={props.menu}
        rightSideActionsOverride={isHome ? () => <HomeNavActions /> : undefined}
        tagline="Enterprise Software Development"
        linkComponent={(props) => (
          <CustomLink
            {...props}
            className={classNames("unstyled", props.className)}
          />
        )}
      />
    </div>
  );
}
