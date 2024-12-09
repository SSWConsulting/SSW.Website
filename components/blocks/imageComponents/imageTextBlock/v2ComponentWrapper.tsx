"use client";
import classNames from "classnames";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { backgroundOptions } from "../../sharedTinaFields/colourOptions/blockBackgroundOptions";
import { ColorPickerInput } from "../../sharedTinaFields/colourSelector";

const V2ComponentWrapper = ({ data, children, shouldFadeIn }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <section
      ref={ref}
      className={classNames(
        `${
          backgroundOptions.find((value) => {
            return value.reference === data.background;
          })?.classes
        } w-full`
      )}
    >
      <section
        className={classNames(
          "transition-opacity duration-300",
          isInView || !shouldFadeIn ? "opacity-100" : "opacity-0"
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
