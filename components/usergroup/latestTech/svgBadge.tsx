import cs from "classnames";

export const SVGBadge = (props: SVGBadgeProps) => {
  const {
    size,
    cx,
    cy,
    rotate,
    name,
    imgURL,
    largeIcon,
    fill,
    duration,
    bounceDown,
  } = props;
  const edge = Math.ceil(+Math.sqrt(2).toFixed(1) * size);

  return (
    <g
      transform={`rotate(${rotate ?? 0} ${cx} ${cy})`}
      className={cs(
        "cursor-pointer",
        { "animate-badge-bounce-up": !bounceDown },
        { "animate-badge-bounce-down": bounceDown }
      )}
      style={{
        animationDuration: `${duration ?? 3000}ms`,
      }}
    >
      <circle
        id={name}
        aria-label={name}
        cx={cx}
        cy={cy}
        r={size}
        fill={fill ?? "white"}
      ></circle>
      {name && (
        <defs>
          <pattern
            id={`${name}-image`}
            patternContentUnits="objectBoundingBox"
            height="100%"
            width="100%"
          >
            <image
              height={1}
              width={1}
              href={imgURL}
              xlinkHref={imgURL}
            ></image>
          </pattern>
        </defs>
      )}
      {largeIcon ? (
        <rect
          x={cx - size}
          y={cy - size}
          width={size * 2}
          height={size * 2}
          fill={`url(#${name}-image)`}
        />
      ) : (
        <rect
          x={Math.ceil(cx - edge / 2)}
          y={Math.ceil(cy - edge / 2)}
          width={edge}
          height={edge}
          fill={`url(#${name}-image)`}
        />
      )}
    </g>
  );
};
