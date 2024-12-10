"use client";
import classNames from "classnames";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { backgroundOptions } from "../../sharedTinaFields/colourOptions/blockBackgroundOptions";

const V2ComponentWrapper = ({ data, children, shouldFadeIn }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <section
      ref={ref}
      className={classNames(
        "transition-opacity duration-300",
        `${
          backgroundOptions.find((value) => {
            return value.reference === data.background;
          })?.classes
        } w-full`,
        isInView || !shouldFadeIn ? "opacity-100" : "opacity-0"
      )}
    >
      {children}
    </section>
  );
};

export default V2ComponentWrapper;
