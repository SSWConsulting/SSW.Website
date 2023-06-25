import classNames from "classnames";

interface RippleProps {
  className?: string;
  hover?: boolean;
}

export const Ripple = ({ className, hover }: RippleProps) => {
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
