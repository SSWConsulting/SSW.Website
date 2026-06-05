"use client";
import classNames from "classnames";
import Image from "next/image";

import React, { useEffect, useRef, useState } from "react";
import { backgroundOptions } from "../blocksSubtemplates/tinaFormElements/colourOptions/blockBackgroundOptions";

// Lightweight replacement for framer-motion's useInView so the animation
// engine isn't pulled into the critical bundle for every v2 block.
function useInViewOnce(
  ref: React.RefObject<Element>,
  { margin = "0px" }: { margin?: string } = {}
) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true); // SSR/old browsers: render visible, no fade
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, margin]);
  return isInView;
}

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
  fadeInMargin?: string;
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
  const isInView = useInViewOnce(ref, { margin: fadeInMargin });
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
        "relative w-full overflow-visible",
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
