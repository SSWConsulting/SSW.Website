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

  // Every route gets the same v3 menu — including the HomeNavActions cluster
  // (search / region globe / Let's Talk). Only the homepage additionally opts
  // into theming: the dark toggle and the `.dark` scope below, whose token
  // utilities (bg-background/text-foreground/border-hairline) flip via the CSS
  // variables under the `dark` class on this element.
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
        // The HomeNavActions cluster carries its own region globe, so the
        // menu's built-in flag is off on every route (avoids a duplicate).
        isFlagVisible={false}
        menuBarItems={props.menu}
        rightSideActionsOverride={() => <HomeNavActions isHome={isHome} />}
        // The mobile menu is portaled outside this `.ssw-home-nav` scope, so
        // re-apply `dark` on it directly to keep the panel's dark tokens.
        mobileMenuClassName={isHome && isDark ? "dark" : undefined}
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
