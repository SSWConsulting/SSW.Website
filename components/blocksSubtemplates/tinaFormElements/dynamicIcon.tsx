"use client";
import { useEffect, useState } from "react";

// Site-facing replacement for Icon. The full icon map (./icon) statically
// imports the entire react-icons bi/si/vsc sets (~5 MB raw), so it must never
// be in the initial client bundle — only the Tina admin (icon picker) may
// import ./icon directly. This wrapper code-splits the map and loads it after
// hydration, rendering a same-size placeholder in the meantime to avoid layout
// shift.

let cachedIcon = null;

export const Icon = (props: {
  data: { name: string };
  className?: string;
  tinaField?: string;
}) => {
  const [IconComponent, setIconComponent] = useState(() => cachedIcon);

  useEffect(() => {
    if (!IconComponent) {
      import("./icon").then((mod) => {
        cachedIcon = mod.Icon;
        setIconComponent(() => mod.Icon);
      });
    }
  }, [IconComponent]);

  if (!IconComponent) {
    return (
      <span
        className={`${props.className ?? ""} inline-block shrink-0`}
        aria-hidden="true"
      />
    );
  }

  return <IconComponent {...props} />;
};
