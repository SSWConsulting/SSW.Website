"use client";
import classNames from "classnames";
import { useInView } from "framer-motion";
import Image from "next/image";

import { UseInViewOptions } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { backgroundOptions } from "../blocksSubtemplates/tinaFormElements/colourOptions/blockBackgroundOptions";

type BackgroundData = {
  anchorId?: string;
  background?: {
    backgroundColour?: number;
    backgroundImage?: string;
    bleed?: boolean;
    gridOverlay?: boolean;
    redGlow?: boolean;
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
      id={data.anchorId || undefined}
      className={classNames(
        backgroundOptions.find((value) => {
          return value.reference === data.background?.backgroundColour;
        })?.classes,
        "relative w-full overflow-visible",
        // Offset in-page anchor scrolling so the target clears the sticky header
        data.anchorId && "scroll-mt-24",
        className
      )}
    >
      {data.background?.bleed && data.background?.backgroundImage && (
        <Image
          ref={bleed}
          src={data.background?.backgroundImage}
          className="absolute inset-0 z-20 grid w-full place-items-center overflow-visible"
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
      )}
      {data.background?.redGlow && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-red-glow-tl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-red-glow-r"
          />
        </>
      )}
      {data.background?.gridOverlay && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-25 bg-dot-grid bg-dots"
        />
      )}
      <section
        ref={ref}
        className={classNames(
          "relative z-30 transition-opacity duration-300",
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

export default V2ComponentWrapper;
