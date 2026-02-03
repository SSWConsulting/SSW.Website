"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import { MegaMenuLayout } from "ssw.megamenu";
import { CustomLink } from "../customLink";

export function MegaMenuWrapper(props) {
  const pathName = usePathname();

  return (
    <MegaMenuLayout
      hidePhone={pathName === "/company/contact-us"}
      menuBarItems={props.menu}
      isFlagVisible={true}
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
