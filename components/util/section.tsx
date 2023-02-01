import React from "react";
import classNames from "classnames";

export const Section = ({ children, color = "", className = "" }) => {
  const sectionColor = {
    default: "bg-white text-black",
    lightgray: "bg-gray-100 text-black",
    red: "bg-sswRed text-white",
    black: "bg-black text-white",
  };
  const sectionColorCss = sectionColor[color] || sectionColor.default;

  return (
    <section
      className={classNames(
        "flex flex-1 relative transition duration-150 ease-out body-font overflow-hidden",
        sectionColorCss,
        className
      )}
    >
      {children}
    </section>
  );
};
