import { FC } from "react";
import Image from "next/image";
import { sswCountries } from "../util/constants/country";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

export type HistoryTimelineCardProps = {
  year: number;
  title: string;
  location: "australia" | "france" | "china";
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
    <div className="flex gap-3 even:flex-row-reverse">
      <div className="flex-1 p-6"></div>
      <div className="inline-flex h-full flex-initial flex-col rounded-2xl bg-sswRed px-12 text-3xl text-white shadow">
        <div className="flex-1"></div>
        <p className="font-bold">{year}</p>
        <div className="flex-1"></div>
      </div>
      <div className="flex-1 rounded-2xl bg-gray-100 p-6 shadow">
        <h5 className="mb-1 font-bold">
          {title}
          {location ? (
            <span className="mx-2 inline-block">
              <Image
                src={flagUrl}
                alt={"The flag of " + location}
                height={10}
                width={24}
              />
            </span>
          ) : (
            <></>
          )}
        </h5>
        <TinaMarkdown content={description} />
      </div>
    </div>
  );
};

export default HistoryTimelineCard;
