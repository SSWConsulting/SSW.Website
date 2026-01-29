"use client";
import dayjs from "dayjs";

type ArticleDateProps = {
  publishedDate?: string;
};

const ArticleDate = ({ publishedDate }: ArticleDateProps) => {
  // Format date to human-readable format like "12 March 2024"
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = dayjs(dateString);
    // Validate that the date is valid
    if (!date.isValid()) return null;
    return date.format("D MMMM YYYY");
  };

  const formattedDate = formatDate(publishedDate);

  if (!formattedDate) return null;

  return (
    <>
      <div className="font-semibold">|</div>
      <time
        dateTime={dayjs(publishedDate!).toISOString()}
        className="text-sm text-gray-500"
      >
        {formattedDate}
      </time>
    </>
  );
};

export default ArticleDate;
