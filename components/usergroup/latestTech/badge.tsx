import cs from "classnames";
import Image from "next/image";
import { Layout } from ".";
import { CustomLink } from "../../customLink";

export interface BadgeType {
  name?: string;
  url?: string;
  imgURL?: string;
  rotate?: number;
  duration?: number;
  bounceDown?: boolean;
}

export interface BadgeProps extends BadgeType {
  layout: Layout;
}

export const Badge = (props: BadgeProps) => {
  const { imgURL, rotate: imgRotate, url, name, duration, bounceDown } = props;
  const { left, top, size, rotate } = props.layout;
  const cssProperties = { "--animate-duration": `${duration ?? 3000}ms` };

  return (
    <CustomLink
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
        rotate: `${rotate ?? 0}deg`,
        ...cssProperties,
      }}
      href={url ?? ""}
    >
      {imgURL && (
        <Image
          style={{
            rotate: `${imgRotate ?? 0}deg`,
          }}
          alt={`${name} icon`}
          width={size}
          height={size}
          src={imgURL}
        />
      )}
    </CustomLink>
  );
};
