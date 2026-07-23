"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import { MegaMenuLayout } from "ssw.megamenu";
import { CustomLink } from "../customLink";

export function MegaMenuWrapper(props) {
  const pathName = usePathname();

  // Per-page hiding of the mobile flag/Contact button is handled by CSS reading a
  // server-rendered marker (see header-appearance.tsx), so the header always renders
  // both here and stays correct at SSR. Only the contact-us page (known at SSR from the
  // pathname) hides the phone via the package itself.
  return (
    <MegaMenuLayout
      hidePhone={pathName === "/company/contact-us"}
      isFlagVisible={true}
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
