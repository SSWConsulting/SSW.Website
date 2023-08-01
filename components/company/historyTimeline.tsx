import { FC } from "react";

import HistoryTimelineCard, {
  HistoryTimelineCardProps,
} from "./historyTimelineCard";

const HistoryTimeline: FC<{
  cardProps: HistoryTimelineCardProps[];
}> = ({ cardProps }) => {
  if (!cardProps) return null;
  const cards = cardProps.map((p, i) => <HistoryTimelineCard key={i} {...p} />);

  return <div className="flex w-full flex-col gap-6">{cards}</div>;
};

export default HistoryTimeline;
