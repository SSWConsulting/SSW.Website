"use client";
import classNames from "classnames";
import { useInView } from "framer-motion";

import { UseInViewOptions } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { backgroundOptions } from "../blocks/sharedTinaFields/colourOptions/blockBackgroundOptions";
import { ColorPickerInput } from "../blocks/sharedTinaFields/colourSelector";

type BackgroundData = {
  shouldFadeIn?: boolean;
  background?: number;
};

const V2ComponentWrapper = ({
  data,
  children,
  fadeInMargin,
}: {
  data: BackgroundData;
  children: React.ReactNode;
  fadeInMargin?: UseInViewOptions["margin"];
}) => {
  return (
    <>
      {data.shouldFadeIn ? (
        <ComponentWrapperDynamic fadeInMargin={fadeInMargin} data={data}>
          {children}
        </ComponentWrapperDynamic>
      ) : (
        <ComponentWrapperStatic data={data}>{children}</ComponentWrapperStatic>
      )}
    </>
  );
};

enum MarginOffset {
  small = "-100px",
  medium = "-200px",
  large = "-300px",
}

const ComponentWrapperDynamic = ({
  children,
  fadeInMargin = MarginOffset.small,
  data,
}: {
  children: React.ReactNode;
  data: BackgroundData;
  fadeInMargin?: UseInViewOptions["margin"];
}): React.ReactNode => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: fadeInMargin });

  const [isInInitialViewport, setIsInInitialViewport] = React.useState(null);

  useEffect(() => {
    setIsInInitialViewport(isInView);
  }, []);

  return (
    <ComponentWrapperStatic data={data}>
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
    </ComponentWrapperStatic>
  );
};

const ComponentWrapperStatic = ({
  children,
  data,
  className,
}: {
  className?: string;
  children: React.ReactNode;
  data;
}) => {
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
      {children}
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

export const fadeInSchema = {
  type: "boolean",
  label: "Fade In",
  description:
    "determines whether or not the component will fade in when it enters the viewport",
  name: "shouldFadeIn",
  default: true,
};

export default V2ComponentWrapper;
