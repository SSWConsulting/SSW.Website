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
  //Bleed effect setup
  const bleed = useRef(null);
  const [backgroundAspectRatio, setBackgroundAspectRatio] =
    React.useState(null);
  const [elementWidth, setElementWidth] = React.useState(null);
  useEffect(() => {
    const updateWidth = () => {
      if (bleed.current) {
        setElementWidth(bleed.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  //Fade-in effect setup
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
        "w-full relative overflow-visible",
        className
      )}
    >
      {data.background?.bleed && data.background?.backgroundImage ? (
        <Image
          ref={bleed}
          src={data.background?.backgroundImage}
          className="absolute w-full z-0 overflow-visible grid inset-0 place-items-center"
          alt="background image"
          width={
            (elementWidth || bleed.current?.getBoundingClientRect()?.width) ?? 0
          }
          height={
            backgroundAspectRatio
              ? backgroundAspectRatio * elementWidth
              : ((elementWidth ||
                  bleed.current?.getBoundingClientRect()?.height) ??
                0)
          }
          onLoad={(event) => {
            const target = event.target as HTMLImageElement;
            setBackgroundAspectRatio(
              target.naturalHeight / target.naturalWidth
            );
          }}
        />
      ) : (
        <></>
      )}
      <section
        ref={ref}
        className={classNames(
          "relative transition-opacity duration-300 z-30",
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
