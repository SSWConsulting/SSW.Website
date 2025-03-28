import classNames from "classnames";
import React from "react";
import { SectionColor, sectionColors } from "./constants/styles";

type SectionProps = {
  children: React.ReactNode;
  color?: SectionColor;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
};

export const Section = ({
  children,
  color = "default",
  className = "",
  style = {},
  id = "",
}: SectionProps) => {
  const sectionColorCss = sectionColors[color] || sectionColors.default;

  return (
    <section
      id={id}
      className={classNames(
        "body-font relative flex flex-1 overflow-hidden transition duration-150 ease-out",
        sectionColorCss,
        className
      )}
      style={style}
    >
      {children}
    </section>
  );
};
