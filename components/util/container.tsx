import React from "react";
import { classNames } from "tinacms";

export const Container = ({
  children,
  size = "medium",
  width = "large",
  padding = "px-8",
  className = "",
  ...props
}) => {
  const verticalPadding = {
    custom: "",
    xsmall: "py-4",
    small: "py-8",
    medium: "py-12",
    large: "py-24",
    default: "py-12",
  };
  const widthClass = {
    small: "max-w-4xl",
    medium: "max-w-5xl",
    large: "max-w-7xl",
    custom: "",
  };

  return (
    <div
      className={
        classNames(
          "mx-auto",
          padding,
          widthClass[width],
          verticalPadding[size],
          className
        )
      }
      {...props}
    >
      {children}
    </div>
  );
};
