import { cn } from "@/lib/utils";
import classNames from "classnames";
import { Link } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useResizeObserver } from "usehooks-ts";
import { Button } from "../button/templateButton";

const ButtonRow = ({ className, data }) => {
  const buttonContainer = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<HTMLButtonElement[]>([]);
  const [buttonContainerWidth, setButtonContainerWidth] = React.useState(0);
  const [firstOffenderIndex, setFirstOffenderIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    setFirstOffenderIndex(null);
  }, [data.buttons]);
  useEffect(() => {
    const checkForButtonWidth = () => {
      if (!buttonRefs.current) return;
      for (let i = 0; i < buttonRefs.current.length; i++) {
        const el = buttonRefs.current[i];
        if (i === firstOffenderIndex && el.clientWidth < buttonContainerWidth) {
          childIsContainerWidth(false);
          return;
        }
        if (buttonRefs.current[i].clientWidth === buttonContainerWidth) {
          childIsContainerWidth(true);
          if (firstOffenderIndex === null) {
            setFirstOffenderIndex(i);
          }
          return;
        }
      }
      childIsContainerWidth(false);
    };
    checkForButtonWidth();
  }, [buttonContainerWidth, firstOffenderIndex, data?.buttons?.length]);

  const [buttonIsContainerWidth, childIsContainerWidth] = React.useState(false);
  useResizeObserver({
    ref: buttonContainer,
    onResize: () => {
      setButtonContainerWidth(buttonContainer.current.clientWidth);
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
                }}
                className={cn(
                  "text-base font-semibold",
                  index !== firstOffenderIndex &&
                    buttonIsContainerWidth &&
                    "w-full sm:w-auto"
                )}
                key={`image-text-button-${index}`}
                data={button}
              />
            );

            return button.buttonLink && !button.showLeadCaptureForm ? (
              <Link href={button.buttonLink} key={`link-wrapper-${index}`}>
                {buttonElement}
              </Link>
            ) : (
              <>{buttonElement}</>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ButtonRow;
