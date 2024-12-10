"use client";
import classNames from "classnames";
import { useInView } from "framer-motion";

import { UseInViewOptions } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { backgroundOptions } from "../blocksSubtemplates/tinaFormElements/colourOptions/blockBackgroundOptions";
import { ColorPickerInput } from "../blocksSubtemplates/tinaFormElements/colourSelector";

type BackgroundData = {
  background?: number;
};

const V2ComponentWrapper = ({
  data,
  children,
  fadeInMargin = "-100px",
  className,
}: {
  data: BackgroundData;
  children: React.ReactNode;
  fadeInMargin?: UseInViewOptions["margin"];
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: fadeInMargin });
  useEffect(() => {
    setIsInInitialViewport(isInView);
  }, [isInView]);
  const [isInInitialViewport, setIsInInitialViewport] = React.useState(null);
  return (
    <section
      className={classNames(
        backgroundOptions.find((value) => {
          return value.reference === data.background;
        })?.classes,
        "w-full",
        className
      )}
    >
      <section
        ref={ref}
        className={classNames(
          "transition-opacity duration-300",
          isInInitialViewport === false && "opacity-0",
          !isInInitialViewport && isInView && "opacity-100"
        )}
      >
        {children}
      </section>
    </section>
  );
};

export const backgroundSchema = {
  type: "number",
  label: "Background Colour",
  name: "background",
  ui: {
    component: ColorPickerInput(backgroundOptions),
  },
};

export default V2ComponentWrapper;
