import { default as cs } from "classnames";
import { sampleSize } from "lodash";
import Link from "next/link";
import { SVGAttributes, useEffect, useState } from "react";
import { Template } from "tinacms";

interface SVGBadgeProps
  extends Omit<SVGAttributes<SVGCircleElement>, "name">,
    BadgeProps {
  size?: number;
  cx: number;
  cy: number;
  rotate?: number;
}

interface BadgeProps {
  name?: string;
  imgURL?: string;
  largeIcon?: boolean;
  fill?: string;
  duration?: number;
  bounceDown?: boolean;
}

const Badge = (props: SVGBadgeProps) => {
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
  const edge = +Math.sqrt(2).toFixed(1) * size;

  return (
    <g
      transform={`rotate(${rotate ?? 0} ${cx} ${cy})`}
      className={cs(
        "cursor-pointer",
        { "animate-badge-bounce-up": !bounceDown },
        { "animate-badge-bounce-down": bounceDown },
        `duration-[${duration ?? 3000}ms]`
      )}
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
          x={cx - edge / 2}
          y={cy - edge / 2}
          width={edge}
          height={edge}
          fill={`url(#${name}-image)`}
        />
      )}
    </g>
  );
};

const svgBadgesLayout = [
  {
    size: 35,
    cx: 35,
    cy: 140,
    rotate: -11,
  },
  {
    size: 25,
    cx: 114,
    cy: 207,
    rotate: -8.5,
  },
  {
    size: 43,
    cx: 190,
    cy: 135,
    rotate: -5,
  },
  {
    size: 30,
    cx: 291,
    cy: 215,
    rotate: 0,
  },
  {
    size: 34,
    cx: 320,
    cy: 80,
    rotate: 0,
  },
  {
    size: 31,
    cx: 406,
    cy: 183,
    rotate: 19.5,
  },
  {
    size: 41,
    cx: 478,
    cy: 60,
    rotate: 0,
  },
  {
    size: 38,
    cx: 547,
    cy: 208,
    rotate: 0,
  },
  {
    size: 29,
    cx: 625,
    cy: 119,
    rotate: 0,
  },
  {
    size: 29,
    cx: 689,
    cy: 46,
    rotate: 0,
  },
  {
    size: 29,
    cx: 737,
    cy: 163,
    rotate: -12,
  },
];

const FloatingBadges = ({ badges }: { badges: BadgeProps[] }) => {
  const [shuffleBadges, setShuffleBadges] = useState([]);

  useEffect(() => {
    setShuffleBadges(sampleSize(badges, 11));
  }, []);

  return (
    <div className="absolute -bottom-3 -left-4 h-62 w-full select-none bg-waveBackground bg-contain bg-left bg-no-repeat">
      <svg viewBox="0 0 788 248" className={cs("h-62 max-w-3xl")}>
        <g id="badges">
          {svgBadgesLayout.map((badgeLayoutProps, index) => (
            <Badge
              key={`${shuffleBadges[index]?.name}-${index}`}
              {...badgeLayoutProps}
              {...(Array.isArray(shuffleBadges) ? shuffleBadges[index] : {})}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export const LatestTech = ({ data }) => {
  return (
    <div className="relative h-70 overflow-hidden bg-gray-50 p-6">
      <span className="relative z-10 font-helvetica text-3xl font-medium text-sswRed">
        We talk about{" "}
        <Link
          className="text-sswRed decoration-sswRed"
          href={data?.link ?? ""}
          target="_blank"
        >
          latest tech
        </Link>
      </span>
      <FloatingBadges badges={data?.badges.badgesList ?? []} />
    </div>
  );
};

export const latestTechSchema: Template = {
  name: "LatestTech",
  label: "Latest Tech",
  fields: [
    {
      type: "string",
      label: "Latest Tech Link",
      name: "link",
    },
    {
      type: "reference",
      collections: ["technologyBadges"],
      label: "Badges",
      name: "badges",
    },
  ],
};
