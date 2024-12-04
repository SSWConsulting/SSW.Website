"use client";

import classNames from "classnames";
import { useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ripple?: boolean;
  defaultClass?: string;
  onClick?: () => void;
}

interface RippleProps {
  className?: string;
  hover?: boolean;
}

const Ripple = ({ className, hover }: RippleProps) => {
  return (
    <div
      className={classNames(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 before:relative before:mt-[100%] before:block before:content-[''] after:absolute after:inset-0 after:rounded-[50%] after:content-['']",
        hover && "animate-ripple after:animate-ripple-pseudo",
        className
      )}
    />
  );
};

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
