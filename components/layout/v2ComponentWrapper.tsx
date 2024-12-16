"use client";
import classNames from "classnames";
import { useInView } from "framer-motion";
import Image from "next/image";

import { UseInViewOptions } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { backgroundOptions } from "../blocksSubtemplates/tinaFormElements/colourOptions/blockBackgroundOptions";
import { ColorPickerInput } from "../blocksSubtemplates/tinaFormElements/colourSelector";

type BackgroundData = {
  background?: {
    backgroundColour?: number;
    backgroundImage?: string;
    bleed?: boolean;
  };
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
          return value.reference === data.background?.backgroundColour;
        })?.classes,
        "relative w-full",
        className
      )}
    >
      {data.background?.bleed ? (
        <div>
          <Image
            src={data.background?.backgroundImage}
            className="absolute inset-0 w-full object-cover"
            alt="background image"
            fill={true}
          />
        </div>
      ) : (
        <></>
      )}
      <section
        ref={ref}
        className={classNames(
          "relative transition-opacity duration-300",
          isInInitialViewport === false && "opacity-0",
          !isInInitialViewport && isInView && "opacity-100"
        )}
        style={
          data.background?.bleed
            ? {}
            : {
                backgroundImage: `url(${data.background?.backgroundImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }
        }
      >
        {children}
      </section>
    </section>
  );
};

export const backgroundSchema = {
  type: "object",
  label: "Background",
  name: "background",
  fields: [
    {
      type: "number",
      label: "Background Colour",
      name: "backgroundColour",
      ui: {
        component: ColorPickerInput(backgroundOptions),
      },
    },
    {
      type: "image",
      label: "Background Image",
      name: "backgroundImage",
      ui: {
        validate: (value) => {
          const lastSegment = value?.split("/")?.slice(-1)[0];
          if (!lastSegment) {
            return;
          }
          if (lastSegment?.indexOf(" ") > -1) {
            return "image names cannot have spaces";
          }
        },
      },
      description:
        "An optional background image, overlay on top of the colour. Streched to fit. File names cannot contain spaces.",
    },
    {
      type: "boolean",
      label: "Bleed",
      name: "bleed",
      description: "If true, the background will bleed into lower blocks.",
    },
  ],
};

export default V2ComponentWrapper;
