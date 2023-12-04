import Image from "next/image";
import { FC } from "react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { Countries, sswCountries } from "../util/constants/country";

export type HistoryTimelineCardProps = {
  year: number;
  title: string;
  location: Countries;
  description: TinaMarkdownContent;
};

const HistoryTimelineCard: FC<HistoryTimelineCardProps> = ({
  year,
  title,
  location,
  description,
}) => {
  const flagUrl = sswCountries.find((f) => f.label === location)?.flagUrl;

  return (
    // &:nth-child(even/odd) selects every even/odd card in the timeline, >*:nth-child(n) then selects the nth child of the card (either the body or the year)
    // eslint-disable-next-line tailwindcss/no-arbitrary-value
    <div className="flex even:flex-row-reverse [&:nth-child(even)>*:nth-child(2)]:rounded-e [&:nth-child(even)>*:nth-child(3)]:rounded-s [&:nth-child(odd)>*:nth-child(2)]:rounded-s [&:nth-child(odd)>*:nth-child(3)]:rounded-e">
      <div className="flex-1 p-6"></div>
      <div className="flex h-full flex-initial flex-col justify-center bg-sswRed px-12 text-3xl text-white">
        <p className="font-bold">{year}</p>
      </div>
      <div className="flex-1 bg-gray-100 p-6">
        <h5 className="mb-1 font-bold">
          {title}
          {location && (
            <span className="mx-2 inline-block">
              <Image
                src={flagUrl}
                alt={"The flag of " + location}
                height={10}
                width={24}
              />
            </span>
          )}
        </h5>
        <TinaMarkdown content={description} />
      </div>
    </div>
  );
};

export default HistoryTimelineCard;
