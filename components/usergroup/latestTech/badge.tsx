import cs from "classnames";
import Image from "next/image";
import { Layout } from ".";

export interface BadgeProps {
  layout: Layout;
  name?: string;
  imgURL?: string;
  largeIcon?: boolean;
  fill?: string;
  duration?: number;
  bounceDown?: boolean;
}

export const Badge = (props: BadgeProps) => {
  const { imgURL, largeIcon, name, duration, bounceDown } = props;
  const { left, top, size, rotate } = props.layout;
  const inscribedSize = Math.ceil(0.7 * size);

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
    >
      {imgURL && (
        <Image
          style={{
            rotate: `${rotate ?? 0}deg`,
          }}
          alt={`${name} icon`}
          width={largeIcon ? size : inscribedSize}
          height={largeIcon ? size : inscribedSize}
          src={imgURL}
        />
      )}
    </div>
  );
};
