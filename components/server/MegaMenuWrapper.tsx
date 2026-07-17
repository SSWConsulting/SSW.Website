"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import { MegaMenuLayout } from "ssw.megamenu";
import { useHeaderAppearance } from "@/app/components/header-appearance";
import { CustomLink } from "../customLink";
import { HomeNavActions } from "../layout/homeNavActions";
import { HomeThemePrePaint, useHomeTheme } from "../layout/homeTheme";

export function MegaMenuWrapper(props) {
  const pathName = usePathname();
  const { isDark } = useHomeTheme();
  const { mobile } = useHeaderAppearance();

  // Only the homepage opts into theming; other routes keep the default menu.
  // The token utilities (bg-background/text-foreground/border-hairline) flip via
  // the CSS variables under the `dark` class on this element.
  const isHome = pathName === "/";

  return (
    <div
      suppressHydrationWarning
      className={classNames(
        isHome &&
          "ssw-home-nav relative isolate text-foreground before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:border-b-1 before:border-[var(--home-nav-border)] before:bg-[var(--home-nav-bg)] before:content-['']",
        // Between xl (1280) and 1360 the desktop nav's designed gutters leave the
        // "Let's Talk" pill ~40px too wide; reclaim the side padding in just that
        // band so the ≥1360 (incl. the 1440 Figma) spacing stays untouched.
        isHome && "xl:-mx-6 min-[1360px]:mx-0",
        // `.dark` is applied by React (seeded) and, before hydration, by the
        // co-located pre-paint script; the nav bar colours flip via CSS vars.
        isHome && isDark && "dark"
      )}
    >
      {isHome && <HomeThemePrePaint />}
      <MegaMenuLayout
        hidePhone={
          pathName === "/company/contact-us" ||
          Boolean(mobile.hideContactButton)
        }
        isFlagVisible={isHome ? false : !mobile.hideFlag}
        menuBarItems={props.menu}
        rightSideActionsOverride={isHome ? () => <HomeNavActions /> : undefined}
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
