import { useEffect, useState } from "react";
import { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { Badge } from "./badge";
import { BadgesLayout } from "./constants";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { BadgeProps } from "./badge";

export interface Layout {
  size: number;
  left: number;
  top: number;
  rotate: number;
}

const FloatingBadges = ({
  random,
  badges,
  layouts,
}: {
  random: boolean;
  badges: BadgeProps[];
  layouts: Layout[];
}) => {
  const [shuffleBadges, setShuffleBadges] = useState([]);

  useEffect(() => {
    const badgesList = random ? badges.sort(() => Math.random() - 0.5) : badges;
    setShuffleBadges(badgesList);
  }, [badges, random]);

  return (
    <div className="absolute -bottom-3 -left-4 h-62 w-full select-none bg-waveBackground bg-contain bg-left bg-no-repeat">
      <div className="flex flex-wrap justify-center">
        {layouts.map((layout, index) => (
          <Badge
            key={`${shuffleBadges[index]?.name}-${index}`}
            layout={layout}
            {...shuffleBadges[index]}
          />
        ))}
      </div>
    </div>
  );
};

export const LatestTech = ({ data }) => {
  return (
    <div className="relative h-70 overflow-hidden bg-gray-50 p-6">
      <span
        className="relative z-10 font-helvetica text-3xl font-medium text-sswRed"
        data-tina-field={tinaField(data, "content")}
      >
        <TinaMarkdown content={data?.content} />
      </span>
      <FloatingBadges
        random={data?.badges?.random ?? false}
        badges={data?.badges?.badgesList ?? []}
        layouts={BadgesLayout}
      />
    </div>
  );
};

export const latestTechSchema: Template = {
  name: "LatestTech",
  label: "Latest Tech",
  fields: [
    {
      type: "rich-text",
      label: "Content",
      name: "content",
    },
    {
      type: "reference",
      description: `Select a config file including a set of badges that indicate the consulting services SSW provided
        (Create new configs in Collection "Technology Badges")`,
      collections: ["technologyBadges"],
      label: "Badges",
      name: "badges",
    },
  ],
};
