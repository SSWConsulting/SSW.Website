import { useEffect, useState } from "react";
import type { Template } from "tinacms";
import { Badge } from "./badge";
import { BadgesLayout } from "./constants";

import type { BadgeType } from "./badge";

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
  badges: BadgeType[];
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

type LatestTechProps = {
  data?: {
    badges?: {
      latestTechBadges?: {
        badgesList?: BadgeType[];
        random?: boolean;
      };
    };
  };
};

export const LatestTech = ({ data }: LatestTechProps) => {
  const badges = data?.badges?.latestTechBadges;
  return (
    <div className="relative h-70 overflow-hidden p-6">
      <FloatingBadges
        random={badges?.random ?? false}
        badges={badges?.badgesList ?? []}
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
      type: "reference",
      description: "Select a config file including a set of badges",
      collections: ["userGroupGlobal"],
      label: "Badges",
      name: "badges",
    },
  ],
};
