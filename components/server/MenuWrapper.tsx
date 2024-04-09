"use client";

import { MegaMenuLayout } from "ssw.megamenu";

export function MenuWrapper(props) {
  return <MegaMenuLayout menuBarItems={props.menu} />;
}
