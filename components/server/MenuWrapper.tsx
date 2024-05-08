"use client";

import classNames from "classnames";
import { MegaMenuLayout } from "ssw.megamenu";
import { CustomLink } from "../customLink";

export function MenuWrapper(props) {
  return (
    <MegaMenuLayout
      menuBarItems={props.menu}
      linkComponent={(props) => (
        <CustomLink
          {...props}
          className={classNames("unstyled", props.className)}
        />
      )}
    />
  );
}
