import React from "react";

export const Section = ({ children, color = "", className = "" }) => {
  const sectionColor = {
    default: "bg-white text-black",
    lightgray: "bg-gray-100 text-black",
    primary: "bg-sswRed text-white",
  };
  const sectionColorCss = sectionColor[color] || sectionColor.default;

  return (
    <section
      className={`flex-1 relative transition duration-150 ease-out body-font overflow-hidden ${sectionColorCss} ${className}`}
    >
      {children}
    </section>
  );
};
