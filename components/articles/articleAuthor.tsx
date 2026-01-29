"use client";
import Image from "next/image";
import Link from "next/link";

type ArticleAuthorProps = {
  name?: string;
  position: string;
  image?: string;
  url?: string;
  publishedDate?: string;
};

const ArticleAuthor = ({
  name,
  position,
  image,
  url,
  publishedDate,
}: ArticleAuthorProps) => {
  // Format date to human-readable format like "12 March 2024"
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    // Validate that the date is valid
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formattedDate = formatDate(publishedDate);

  return (
    <div className="flex flex-row items-center gap-2 py-1">
      {image && (
        <Image
          src={image}
          alt="User Photo"
          width={40}
          height={40}
          className="size-10 rounded-full object-cover"
        />
      )}
      <div className="font-semibold uppercase">
        {url ? (
          <Link className="no-underline" href={url}>
            {name}
          </Link>
        ) : (
          <>{name}</>
        )}
      </div>

      {position && (
        <>
          <div className="font-semibold">|</div>
          <div className="text-sm uppercase text-gray-500">{position}</div>
        </>
      )}

      {formattedDate && (
        <>
          <div className="font-semibold">|</div>
          <time
            dateTime={publishedDate}
            className="text-sm text-gray-500"
          >
            {formattedDate}
          </time>
        </>
      )}
    </div>
  );
};

export default ArticleAuthor;
