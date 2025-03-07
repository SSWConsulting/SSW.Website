"use client";

import classNames from "classnames";
import { MegaMenuLayout } from "ssw.megamenu";
import { CustomLink } from "../customLink";

export function MegaMenuWrapper(props) {
  return (
    <MegaMenuLayout
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
