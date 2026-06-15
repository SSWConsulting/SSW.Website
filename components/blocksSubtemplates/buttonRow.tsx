"use client";

import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { Button } from "../button/templateButton";

const ButtonRow = ({ className, data }) => {
  if (!(data.buttons?.length > 0)) return null;

  return (
    <div className={classNames("mt-5 flex flex-wrap gap-3", className)}>
      {data.buttons.map((button, index) => {
        // CTAs span the full width on mobile and shrink to content width from
        // the sm breakpoint up.
        const buttonElement = (
          <Button
            className="w-full text-base font-semibold sm:w-auto"
            key={`image-text-button-${index}`}
            data={button}
          />
        );

        return button.buttonLink && !button.showLeadCaptureForm ? (
          <Link
            className="w-full sm:w-auto"
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
  );
};

export default ButtonRow;
