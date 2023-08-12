import cs from "classnames";
import Image from "next/image";
import { Layout } from ".";

export interface BadgeProps {
  layout: Layout;
  name?: string;
  url?: string;
  imgURL?: string;
  duration?: number;
  bounceDown?: boolean;
}

export const Badge = (props: BadgeProps) => {
  const { imgURL, url, name, duration, bounceDown } = props;
  const { left, top, size, rotate } = props.layout;

  return (
    <div
      aria-label={`Latest Tech ${name}`}
      className={cs(
        "absolute flex cursor-pointer items-center justify-center rounded-full bg-white",
        { "animate-badge-bounce-up": !bounceDown },
        { "animate-badge-bounce-down": bounceDown }
      )}
      style={{
        left: left,
        top: top,
        height: `${size}px`,
        width: `${size}px`,
        animationDuration: `${duration ?? 3000}ms`,
      }}
      onClick={() => window.open(url, "_blank")}
    >
      {imgURL && (
        <Image
          style={{
            rotate: `${rotate ?? 0}deg`,
          }}
          alt={`${name} icon`}
          width={size}
          height={size}
          src={imgURL}
        />
      )}
    </div>
  );
};
