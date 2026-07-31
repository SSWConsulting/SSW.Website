"use client";

import { cn } from "@/lib/utils";

import classNames from "classnames";
import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";
import { useResizeObserver } from "usehooks-ts";
import { Button } from "../button/templateButton";

const ButtonRow = ({ className, data }) => {
  const buttonContainer = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<HTMLButtonElement[]>([]);
  const [buttonIsFullWidth, setButtonIsFullWidth] = useState(false);
  // Remembers the button that first filled the row, so a later resize can tell
  // when it no longer does (prevents flicker between the full-width and auto
  // states). A ref, not state, so `measure` can stay a stable `[]` callback
  // without stale closures. It's written synchronously right before the
  // `setButtonIsFullWidth` that triggers the re-render, so the className read
  // below sees a value coherent with `buttonIsFullWidth`.
  const fullWidthButtonIndex = useRef<number | null>(null);

  // Read the container and every button in one pass. This runs from the
  // ResizeObserver callback, which fires *after* layout is already computed —
  // so the geometry reads don't force a synchronous reflow the way the old
  // post-render effect did (that read was this component's forced-reflow cost).
  // Button sets are static per render, so the observer's initial + resize fires
  // cover every case the old `data.buttons` dependency did.
  const measure = useCallback(() => {
    const container = buttonContainer.current;
    if (!container) return;
    const containerWidth = container.clientWidth;
    for (let i = 0; i < buttonRefs.current.length; i++) {
      const el = buttonRefs.current[i];
      if (!el) return;
      const width = el.clientWidth;
      if (i === fullWidthButtonIndex.current && width < containerWidth) {
        setButtonIsFullWidth(false);
        return;
      }
      if (width === containerWidth) {
        setButtonIsFullWidth(true);
        if (fullWidthButtonIndex.current === null) {
          fullWidthButtonIndex.current = i;
        }
        return;
      }
    }
    setButtonIsFullWidth(false);
  }, []);

  useResizeObserver({ ref: buttonContainer, onResize: measure });
  return (
    <>
      {data.buttons?.length > 0 && (
        <div
          ref={buttonContainer}
          className={classNames("mt-5 flex flex-wrap gap-3", className)}
        >
          {data.buttons?.map((button, index) => {
            const buttonElement = (
              <Button
                ref={(node) => {
                  buttonRefs.current[index] = node;
                  return () => {
                    if (fullWidthButtonIndex.current === index) {
                      fullWidthButtonIndex.current = null;
                    }
                    delete buttonRefs.current[index];
                  };
                }}
                className={cn(
                  "text-base font-semibold",
                  index !== fullWidthButtonIndex.current &&
                    buttonIsFullWidth &&
                    "w-full sm:w-auto"
                )}
                key={`image-text-button-${index}`}
                data={button}
              />
            );

            const isInPageAnchor = button.buttonLink?.startsWith("#");

            return button.buttonLink && !button.leadCaptureFormOption ? (
              isInPageAnchor ? (
                <a
                  className={cn(buttonIsFullWidth && "w-full sm:w-auto")}
                  href={button.buttonLink}
                  key={`link-wrapper-${index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById(
                      button.buttonLink.slice(1)
                    );
                    target?.scrollIntoView({ behavior: "smooth" });
                    history.replaceState(null, "", button.buttonLink);
                  }}
                >
                  {buttonElement}
                </a>
              ) : (
                <Link
                  className={cn(buttonIsFullWidth && "w-full sm:w-auto")}
                  href={button.buttonLink}
                  key={`link-wrapper-${index}`}
                >
                  {buttonElement}
                </Link>
              )
            ) : (
              <React.Fragment key={`button-fragment-${index}`}>
                {buttonElement}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ButtonRow;
