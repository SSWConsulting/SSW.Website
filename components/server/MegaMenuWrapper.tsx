"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import { MegaMenuLayout } from "ssw.megamenu";
import { useHeaderAppearance } from "@/app/components/header-appearance";
import { CustomLink } from "../customLink";

export function MegaMenuWrapper(props) {
  const pathName = usePathname();
  const { mobile } = useHeaderAppearance();

  return (
    <MegaMenuLayout
      hidePhone={
        pathName === "/company/contact-us" || Boolean(mobile.hideContactButton)
      }
      isFlagVisible={!mobile.hideFlag}
      menuBarItems={props.menu}
      tagline="Enterprise Software Development"
      linkComponent={(props) => (
        <CustomLink
          {...props}
          className={classNames("unstyled", props.className)}
        />
      )}
    />
  );
}
