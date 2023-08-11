import cs from "classnames";
import Image from "next/image";

export const DIVBadge = (props: DivBadgeProps) => {
  const {
    left,
    top,
    size,
    imgURL,
    largeIcon,
    name,
    fill,
    rotate,
    duration,
    bounceDown,
  } = props;
  const inscribedSize = Math.ceil(0.7 * size);

  return (
    <div
      id={name}
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
        backgroundColor: fill ?? "white",
        animationDuration: `${duration ?? 3000}ms`,
      }}
    >
      <Image
        style={{
          rotate: `${rotate ?? 0}deg`,
        }}
        alt={`${name}`}
        width={largeIcon ? size : inscribedSize}
        height={largeIcon ? size : inscribedSize}
        src={imgURL}
      />
    </div>
  );
};
