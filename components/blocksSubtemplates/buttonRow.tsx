"use client";

import { cn } from "@/lib/utils";

import classNames from "classnames";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useResizeObserver } from "usehooks-ts";
import { Button } from "../button/templateButton";

const ButtonRow = ({ className, data }) => {
  const buttonContainer = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<HTMLButtonElement[]>([]);
  const [buttonContainerWidth, setButtonContainerWidth] = React.useState(0);
  const [fullWidthButtonIndex, setFullWidthButtonIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    const findFullWidthButton = () => {
      for (let i = 0; i < buttonRefs.current.length; i++) {
        const el = buttonRefs.current[i];
        if (!el) return;
        if (
          i === fullWidthButtonIndex &&
          el.clientWidth < buttonContainerWidth
        ) {
          setButtonIsFullWidth(false);
          return;
        }
        if (buttonRefs.current[i].clientWidth === buttonContainerWidth) {
          setButtonIsFullWidth(true);
          if (fullWidthButtonIndex === null) {
            setFullWidthButtonIndex(i);
          }
          return;
        }
      }
      setButtonIsFullWidth(false);
    };
    findFullWidthButton();
  }, [buttonContainerWidth, fullWidthButtonIndex, data.buttons]);

  const [buttonIsFullWidth, setButtonIsFullWidth] = React.useState(false);
  useResizeObserver({
    ref: buttonContainer,
    onResize: () => {
      const width = buttonContainer?.current?.clientWidth;
      width && setButtonContainerWidth(width);
    },
  });
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
                    index === fullWidthButtonIndex &&
                      setFullWidthButtonIndex(null);
                    delete buttonRefs.current[index];
                  };
                }}
                className={cn(
                  "text-base font-semibold",
                  index !== fullWidthButtonIndex &&
                    buttonIsFullWidth &&
                    "w-full sm:w-auto"
                )}
                key={`image-text-button-${index}`}
                data={button}
              />
            );

            return button.buttonLink && !button.showLeadCaptureForm ? (
              <Link
                className={cn(buttonIsFullWidth && "w-full sm:w-auto")}
                href={button.buttonLink}
                key={`link-wrapper-${index}`}
              >
                {buttonElement}
              </Link>
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
