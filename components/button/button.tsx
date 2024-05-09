"use client";

import classNames from "classnames";
import { useState } from "react";
import { Ripple } from "./ripple";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ripple?: boolean;
  defaultClass?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  ripple,
  defaultClass = "bg-sswRed text-white rounded",
  onClick,
  ...props
}: ButtonProps) => {
  const [hover, setHover] = useState(false);

  const buttonClassName = classNames(
    ripple && "relative h-[90px] overflow-hidden border-none text-[1.6rem]",
    props["className"],
    defaultClass
  );

  return (
    <button
      type="button"
      {...props}
      onClick={onClick}
      className={buttonClassName}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      {ripple && <Ripple hover={hover} />}
    </button>
  );
};

export default Button;
