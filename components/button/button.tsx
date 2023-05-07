import classNames from "classnames";
import { useState } from "react";

const Button = ({
  children,
  ripple,
  defaultClass = "bg-sswRed text-white rounded",
  ...props
}) => {
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
      className={buttonClassName}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      {ripple && (
        <div
          className={classNames(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 before:relative before:mt-[100%] before:block before:content-[''] after:absolute after:inset-0 after:rounded-[50%] after:content-['']",
            hover && "animate-ripple after:animate-ripple-pseudo"
          )}
        />
      )}
    </button>
  );
};

export default Button;
