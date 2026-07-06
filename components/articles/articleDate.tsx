"use client";
import dayjs, { Dayjs } from "dayjs";

type ArticleDateProps = {
  publishedDate?: string;
};

// Format date to human-readable format like "12 March 2024"
const formatDate = (
  dateString?: string
): { date: Dayjs; formatted: string } | null => {
  if (!dateString) return null;
  const date = dayjs(dateString);
  // Validate that the date is valid
  if (!date.isValid()) return null;
  return { date, formatted: date.format("D MMMM YYYY") };
};

const ArticleDate = ({ publishedDate }: ArticleDateProps) => {
  const dateInfo = formatDate(publishedDate);

  if (!dateInfo) return null;

  return (
    <>
      <div className="font-semibold">|</div>
      <time
        dateTime={dateInfo.date.toISOString()}
        className="text-sm text-gray-500"
      >
        {dateInfo.formatted}
      </time>
    </>
  );
};

export default ArticleDate;
