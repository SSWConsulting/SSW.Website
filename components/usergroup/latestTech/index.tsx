import { default as cs } from "classnames";
import { sampleSize } from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Template } from "tinacms";
import { svgLayout } from "./constants";
import { SVGBadge } from "./svgBadge";

const FloatingBadges = ({ badges }: { badges: BadgeProps[] }) => {
  const [shuffleBadges, setShuffleBadges] = useState([]);

  useEffect(() => {
    setShuffleBadges(sampleSize(badges, 11));
  }, []);

  return (
    <div className="absolute -bottom-3 -left-4 h-62 w-full select-none bg-waveBackground bg-contain bg-left bg-no-repeat">
      <svg viewBox="0 0 788 248" className={cs("h-62 max-w-3xl")}>
        <g id="badges">
          {svgLayout.map((badgeLayoutProps, index) => (
            <SVGBadge
              key={`${shuffleBadges[index]?.name} -${index} `}
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
