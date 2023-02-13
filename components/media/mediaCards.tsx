import { FC } from "react";
import MediaCard, { MediaCardProps } from "./mediaCard";

const MediaCards: FC<{ header: string; cardProps: MediaCardProps[] }> = ({
  header,
  cardProps,
}) => {
  const cards = cardProps.map((p, i) => <MediaCard key={i} {...p} />);

  return (
    <>
      <h1 className="mb-12">{header}</h1>
      <div className="flex flex-wrap gap-8">{cards}</div>
    </>
  );
};

export default MediaCards;
