import classNames from "classnames";
import { EventStatus } from "../../helpers/dates";

type EventsRelativeBoxProps = {
  relativeDate: string;
  formattedDate: string;
  dateFontSize: string;
};

export const EventsRelativeBox = ({
  relativeDate,
  formattedDate,
  dateFontSize,
}: EventsRelativeBoxProps) => {
  return (
    <time className="my-1 flex items-center">
      {relativeDate && (
        <span
          className={classNames(
            "inline-flex items-center rounded-sm px-1.5 py-0.5 text-xxs uppercase",
            relativeDate == EventStatus.NOW_RUNNING ||
              relativeDate == EventStatus.TODAY // Now running for the two days events and today is for the single day
              ? "bg-sswRed text-white"
              : "bg-gray-25 text-black"
          )}
        >
          {relativeDate}
        </span>
      )}
      <span
        className={classNames(
          "text-gray-500",
          dateFontSize ? dateFontSize : "text-xxs",
          relativeDate ? "ml-2" : ""
        )}
      >
        {formattedDate}
      </span>
    </time>
  );
};
