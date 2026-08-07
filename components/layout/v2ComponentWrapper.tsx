"use client";
import classNames from "classnames";
import Image from "next/image";

import React, { useEffect, useRef, useState } from "react";
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

// "pending" until the observer's first report, so a block never goes
// visible→hidden after paint — hiding painted content disqualifies it as an
// LCP candidate.
const useFadeIn = (rootMargin: string) => {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"pending" | "hidden" | "visible">(
    "pending"
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          observer.disconnect();
        } else {
          setState((current) => (current === "pending" ? "hidden" : current));
        }
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, state] as const;
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

  const [ref, fadeState] = useFadeIn(fadeInMargin);

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
          fadeState === "hidden" && "opacity-0",
          fadeState === "visible" && "opacity-100"
        )}
        // Only emit a background-image when there actually is one. Interpolating a
        // missing value produced `url(null)` / `url()`, and the browser resolved
        // those against the current path — on /events/* that fetched /events/null,
        // which the catch-all route answered with 200 and ~631 KiB of HTML, at high
        // priority, on every page load.
        style={
          !data.background?.bleed && data.background?.backgroundImage
            ? {
                backgroundImage: `url(${data.background.backgroundImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {children}
      </section>
    </section>
  );
};

export default V2ComponentWrapper;
